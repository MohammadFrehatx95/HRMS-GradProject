using Application.Common;
using Application.DTOs.Leave;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;


namespace Application.Services.Implementations
{

    // Application/Services/Implementations/LeaveService.cs
    public class LeaveService(
        IUnitOfWork uow,
        IMapper mapper,
        INotificationService notificationService,
        IEmailService emailService,
        ILogger<LeaveService> logger) : ILeaveService
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
            // ✅ معالجة التواريخ بشكل صحيح مع UTC
            var startDate = DateTime.SpecifyKind(dto.StartDate.Date, DateTimeKind.Utc);
            var endDate = DateTime.SpecifyKind(dto.EndDate.Date, DateTimeKind.Utc);
            var today = DateTime.SpecifyKind(DateTime.UtcNow.Date, DateTimeKind.Utc);

            // ✅ التحقق من الصحة
            if (startDate < today)
                throw new ArgumentException("Start date cannot be in the past");

            if (endDate < startDate)
                throw new ArgumentException("End date cannot be before start date");

            // ✅ التحقق من التداخل
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

            // ✅ إنشاء طلب الإجازة
            var leave = new Leave
            {
                EmployeeId = employeeId,
                LeaveType = dto.LeaveType,
                StartDate = startDate,
                EndDate = endDate,
                TotalDays = (int)(endDate - startDate).TotalDays + 1,
                Reason = dto.Reason,
                Status = LeaveStatus.Pending,
                RequestedAt = DateTime.UtcNow
            };

            await uow.Repository<Leave>().AddAsync(leave);
            await uow.SaveChangesAsync();

            // ✅ جلب بيانات الموظف
            var employee = await uow.Repository<Employee>()
                            .GetByIdAsync(employeeId);

            var employeeName = employee is not null
                ? $"{employee.FirstName} {employee.LastName}"
                : "Unknown";

            // ✅ جلب HR و Admin - بدون مشاكل Role
            var hrAdmins = await uow.Repository<User>()
                            .GetAllQueryable()
                            .Where(u => u.Role == UserRole.HR.ToString() || 
                                        u.Role == UserRole.Admin.ToString())
                            .ToListAsync();

            // ✅ إرسال الإشعارات والبريد بشكل آمن
            foreach (var user in hrAdmins)
            {
                try
                {
                    // Notification
                    await notificationService.CreateAsync(
                        userId: user.Id,
                        title: "New Leave Request",
                        message: $"{employeeName} submitted a {dto.LeaveType} leave request " +
                                 $"from {startDate:yyyy-MM-dd} to {endDate:yyyy-MM-dd}",
                        type: NotificationType.LeaveRequested);

                    // Email
                    await emailService.SendLeaveRequestedAsync(
                        user.Email, employeeName,
                        dto.LeaveType.ToString(),
                        startDate, endDate);
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, 
                        "Error sending leave notification to user {UserId}", user.Id);
                }
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

            // ✅ تحديث الحالة
            leave.Status = dto.Status;
            leave.ReviewedByUserId = reviewerUserId;
            leave.RejectionReason = dto.Status == LeaveStatus.Rejected
                ? dto.RejectionReason
                : string.Empty;  // بدل null
            leave.ReviewedAt = DateTime.UtcNow;

            uow.Repository<Leave>().Update(leave);
            await uow.SaveChangesAsync();

            // ✅ جلب الموظف مع بياناته
            var employee = await uow.Repository<Employee>()
                            .GetAllQueryable()
                            .Include(e => e.User)
                            .FirstOrDefaultAsync(e => e.Id == leave.EmployeeId);

            if (employee?.User is not null)
            {
                var employeeUser = employee.User;
                var isApproved = dto.Status == LeaveStatus.Approved;
                var employeeName = $"{employee.FirstName} {employee.LastName}";

                try
                {
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

                    // Email
                    await emailService.SendLeaveStatusAsync(
                        employeeUser.Email,
                        employeeName,
                        leave.LeaveType.ToString(),
                        isApproved,
                        dto.RejectionReason);
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, 
                        "Error sending leave status notification to employee {EmployeeId}", 
                        leave.EmployeeId);
                }
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

            // ✅ جلب بيانات الموظف
            var employee = await uow.Repository<Employee>()
                                    .GetByIdAsync(employeeId);

            var employeeName = employee is not null
                ? $"{employee.FirstName} {employee.LastName}"
                : "Unknown";

            // ✅ جلب HR و Admin
            var hrAdmins = await uow.Repository<User>()
                                    .GetAllQueryable()
                                    .Where(u => u.Role == UserRole.HR.ToString() || 
                                                u.Role == UserRole.Admin.ToString())
                                    .ToListAsync();

            // ✅ إرسال الإشعارات والبريد بشكل آمن
            foreach (var user in hrAdmins)
            {
                try
                {
                    // Notification
                    await notificationService.CreateAsync(
                        userId: user.Id,
                        title: "Leave Request Cancelled",
                        message: $"{employeeName} cancelled their {leave.LeaveType} leave request",
                        type: NotificationType.LeaveCancelled);

                    // Email
                    await emailService.SendLeaveCancelledAsync(
                        user.Email, employeeName, leave.LeaveType.ToString());
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, 
                        "Error sending leave cancellation notification to user {UserId}", 
                        user.Id);
                }
            }
        }
    }
}
