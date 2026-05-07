using Application.Common;
using Application.DTOs.Leave;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace Application.Services.Implementations
{

    // Application/Services/Implementations/LeaveService.cs
    public class LeaveService(
        IUnitOfWork uow,
        IMapper mapper,
        INotificationService notificationService,
        IEmailService emailService) : ILeaveService
    {
        public async Task<PagedResult<LeaveDto>> GetAllAsync(int pageNumber, int pageSize)
        {
            var query = uow.Repository<Leave>()
                           .GetAllQueryable()
                           .Include(l => l.Employee)
                           .OrderByDescending(l => l.StartDate);

            var total = await query.CountAsync();
            var items = await query
                            .Skip((pageNumber - 1) * pageSize)
                            .Take(pageSize)
                            .ToListAsync();

            return PagedResult<LeaveDto>.Create(
                mapper.Map<List<LeaveDto>>(items), total, pageNumber, pageSize);
        }

        public async Task<PagedResult<LeaveDto>> GetMyLeavesAsync(
            int employeeId, int pageNumber, int pageSize)
        {
            var query = uow.Repository<Leave>()
                           .GetAllQueryable()
                           .Include(l => l.Employee)
                           .Where(l => l.EmployeeId == employeeId)
                           .OrderByDescending(l => l.StartDate);

            var total = await query.CountAsync();
            var items = await query
                            .Skip((pageNumber - 1) * pageSize)
                            .Take(pageSize)
                            .ToListAsync();

            return PagedResult<LeaveDto>.Create(
                mapper.Map<List<LeaveDto>>(items), total, pageNumber, pageSize);
        }

        public async Task<LeaveDto?> GetByIdAsync(int id)
        {
            var leave = await uow.Repository<Leave>()
                                 .GetAllQueryable()
                                 .Include(l => l.Employee)
                                 .FirstOrDefaultAsync(l => l.Id == id);

            return leave is null ? null : mapper.Map<LeaveDto>(leave);
        }

        public async Task<LeaveDto> CreateAsync(int employeeId, CreateLeaveDto dto)
        {
            // ✅ Fix DateTime Kind — PostgreSQL requires UTC
            var startDate = DateTime.SpecifyKind(dto.StartDate.Date, DateTimeKind.Utc);
            var endDate = DateTime.SpecifyKind(dto.EndDate.Date, DateTimeKind.Utc);
            var today = DateTime.SpecifyKind(DateTime.UtcNow.Date, DateTimeKind.Utc);

            if (startDate < today)
                throw new ArgumentException("Start date cannot be in the past");

            if (endDate < startDate)
                throw new ArgumentException("End date cannot be before start date");

            var hasOverlap = await uow.Repository<Leave>()
                                      .GetAllQueryable()
                                      .AnyAsync(l =>
                                          l.EmployeeId == employeeId &&
                                          l.Status != LeaveStatus.Rejected &&
                                          l.StartDate <= endDate &&
                                          l.EndDate >= startDate);

            if (hasOverlap)
                throw new InvalidOperationException(
                    "You already have a leave request overlapping these dates");

            var leave = new Leave
            {
                EmployeeId = employeeId,
                LeaveType = dto.LeaveType,
                StartDate = startDate,
                EndDate = endDate,
                Status = LeaveStatus.Pending
            };

            await uow.Repository<Leave>().AddAsync(leave);
            await uow.SaveChangesAsync();

            // جيب بيانات الموظف
            var employee = await uow.Repository<Employee>()
                                    .GetByIdAsync(employeeId);

            var employeeName = employee is not null
                ? $"{employee.FirstName} {employee.LastName}"
                : "Unknown";

            // ✅ Fix UserRole — قارن enum بـ enum مش string
            var hrAdmins = await uow.Repository<User>()
                                    .GetAllQueryable()
                                    .Where(u => u.Role == "HR" || u.Role == "Admin")
                                    .ToListAsync();

            foreach (var user in hrAdmins)
            {
                // Notification
                await notificationService.CreateAsync(
                    userId: user.Id,
                    title: "New Leave Request",
                    message: $"{employeeName} submitted a {dto.LeaveType} leave request " +
                             $"from {startDate:yyyy-MM-dd} to {endDate:yyyy-MM-dd}",
                    type: NotificationType.LeaveRequested);

                // ✅ Email — try/catch عشان ما يوقف الـ Request
                try
                {
                    await emailService.SendLeaveRequestedAsync(
                        user.Email, employeeName,
                        dto.LeaveType.ToString(),
                        startDate, endDate);
                }
                catch { /* Log if needed */ }
            }

            return (await GetByIdAsync(leave.Id))!;
        }

        public async Task<LeaveDto> UpdateStatusAsync(
            int leaveId, int reviewerUserId, UpdateLeaveStatusDto dto)
        {
            var leave = await uow.Repository<Leave>()
                                 .GetAllQueryable()
                                 .Include(l => l.Employee)
                                 .FirstOrDefaultAsync(l => l.Id == leaveId)
                        ?? throw new KeyNotFoundException($"Leave {leaveId} not found");

            if (leave.Status != LeaveStatus.Pending)
                throw new InvalidOperationException(
                    "Only Pending leave requests can be reviewed");

            if (dto.Status == LeaveStatus.Rejected &&
                string.IsNullOrWhiteSpace(dto.RejectionReason))
                throw new ArgumentException(
                    "Rejection reason is required when rejecting a leave");

            leave.Status = dto.Status;
            leave.ReviewedByUserId = reviewerUserId;
            leave.RejectionReason = dto.Status == LeaveStatus.Rejected
                ? dto.RejectionReason
                : null;

            uow.Repository<Leave>().Update(leave);
            await uow.SaveChangesAsync();

            // جيب الـ User المرتبط بالموظف
            var employeeUser = await uow.Repository<User>()
                                        .GetAllQueryable()
                                        .Include(u => u.Employee)
                                        .FirstOrDefaultAsync(u =>
                                            u.EmployeeId == leave.EmployeeId);

            if (employeeUser is not null)
            {
                var isApproved = dto.Status == LeaveStatus.Approved;
                var employeeName = employeeUser.Employee is not null
                    ? $"{employeeUser.Employee.FirstName} {employeeUser.Employee.LastName}"
                    : employeeUser.Username;

                // Notification
                await notificationService.CreateAsync(
                    userId: employeeUser.Id,
                    title: isApproved ? "Leave Approved" : "Leave Rejected",
                    message: isApproved
                        ? $"Your {leave.LeaveType} leave request has been approved"
                        : $"Your {leave.LeaveType} leave request was rejected. " +
                          $"Reason: {dto.RejectionReason}",
                    type: isApproved
                        ? NotificationType.LeaveApproved
                        : NotificationType.LeaveRejected);

                // ✅ Email
                try
                {
                    await emailService.SendLeaveStatusAsync(
                        employeeUser.Email,
                        employeeName,
                        leave.LeaveType.ToString(),
                        isApproved,
                        dto.RejectionReason);
                }
                catch { /* Log if needed */ }
            }

            return mapper.Map<LeaveDto>(leave);
        }

        public async Task DeleteAsync(int leaveId, int employeeId)
        {
            var leave = await uow.Repository<Leave>()
                                 .GetAllQueryable()
                                 .FirstOrDefaultAsync(l => l.Id == leaveId)
                        ?? throw new KeyNotFoundException($"Leave {leaveId} not found");

            if (leave.EmployeeId != employeeId)
                throw new UnauthorizedAccessException(
                    "You can only delete your own leave requests");

            if (leave.Status != LeaveStatus.Pending)
                throw new InvalidOperationException(
                    "Only Pending leave requests can be deleted");

            uow.Repository<Leave>().Delete(leave);
            await uow.SaveChangesAsync();

            // جيب بيانات الموظف
            var employee = await uow.Repository<Employee>()
                                    .GetByIdAsync(employeeId);

            var employeeName = employee is not null
                ? $"{employee.FirstName} {employee.LastName}"
                : "Unknown";

            // ✅ Fix UserRole
            var hrAdmins = await uow.Repository<User>()
                                    .GetAllQueryable()
                                   .Where(u => u.Role == "HR" || u.Role == "Admin")
                                    .ToListAsync();

            foreach (var user in hrAdmins)
            {
                // Notification
                await notificationService.CreateAsync(
                    userId: user.Id,
                    title: "Leave Request Cancelled",
                    message: $"{employeeName} cancelled their {leave.LeaveType} leave request",
                    type: NotificationType.LeaveCancelled);

                // ✅ Email
                try
                {
                    await emailService.SendLeaveCancelledAsync(
                        user.Email, employeeName, leave.LeaveType.ToString());
                }
                catch { /* Log if needed */ }
            }
        }
    }
}
