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
    public class LeaveService(
        IUnitOfWork uow,
        IMapper mapper,
        INotificationService notificationService,
        IEmailService emailService,
        IImageService imageService,
        ILogger<LeaveService> logger) : ILeaveService
    {
        public async Task<PagedResult<LeaveDto>> GetAllAsync(int pageNumber, int pageSize, int? month = null, int? year = null, string? searchQuery = null, int? status = null, int? leaveType = null)
        {
            pageSize = Math.Min(pageSize, 100);
            var query = uow.Repository<Leave>()
                           .GetAllQueryable()
                           .Include(l => l.Employee).ThenInclude(e => e.User)
                           .AsQueryable();

            if (month.HasValue && year.HasValue)
            {
                query = query.Where(l => l.StartDate.Month <= month.Value && l.EndDate.Month >= month.Value &&
                                         l.StartDate.Year <= year.Value && l.EndDate.Year >= year.Value);
            }

            if (status.HasValue)
            {
                query = query.Where(l => (int)l.Status == status.Value);
            }

            if (leaveType.HasValue)
            {
                query = query.Where(l => (int)l.LeaveType == leaveType.Value);
            }

            if (!string.IsNullOrWhiteSpace(searchQuery))
            {
                query = query.Where(l => 
                    (l.Employee != null && (l.Employee.FirstName.Contains(searchQuery) || l.Employee.LastName.Contains(searchQuery))) ||
                    l.EmployeeId.ToString().Contains(searchQuery));
            }

            query = query.OrderByDescending(l => l.Status == LeaveStatus.Pending).ThenByDescending(l => l.StartDate);

            var total = await query.CountAsync();
            var items = await query
                            .Skip((pageNumber - 1) * pageSize)
                            .Take(pageSize)
                            .ToListAsync();

            return PagedResult<LeaveDto>.Create(
                mapper.Map<List<LeaveDto>>(items), total, pageNumber, pageSize);
        }

        public async Task<PagedResult<LeaveDto>> GetMyLeavesAsync(
            int employeeId, int pageNumber, int pageSize, int? month = null, int? year = null, string? searchQuery = null, int? status = null, int? leaveType = null)
        {
            pageSize = Math.Min(pageSize, 100);
            var query = uow.Repository<Leave>()
                           .GetAllQueryable()
                           .Include(l => l.Employee).ThenInclude(e => e.User)
                           .Where(l => l.EmployeeId == employeeId);

            if (month.HasValue && month.Value > 0) query = query.Where(l => l.StartDate.Month == month.Value);
            if (year.HasValue && year.Value > 0) query = query.Where(l => l.StartDate.Year == year.Value);

            if (status.HasValue)
            {
                query = query.Where(l => (int)l.Status == status.Value);
            }

            if (leaveType.HasValue)
            {
                query = query.Where(l => (int)l.LeaveType == leaveType.Value);
            }

            if (!string.IsNullOrWhiteSpace(searchQuery))
            {
                query = query.Where(l => 
                    l.Status.ToString().Contains(searchQuery) ||
                    l.LeaveType.ToString().Contains(searchQuery));
            }

            query = query.OrderByDescending(l => l.Status == LeaveStatus.Pending).ThenByDescending(l => l.StartDate);

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
                                 .Include(l => l.Employee).ThenInclude(e => e.User)
                                 .FirstOrDefaultAsync(l => l.Id == id);

            return leave is null ? null : mapper.Map<LeaveDto>(leave);
        }

        // FIX #1: method خاصة للموظف تتحقق أن الطلب يخصه
        public async Task<LeaveDto?> GetMyByIdAsync(int leaveId, int employeeId)
        {
            var leave = await uow.Repository<Leave>()
                                 .GetAllQueryable()
                                 .Include(l => l.Employee).ThenInclude(e => e.User)
                                 .FirstOrDefaultAsync(l =>
                                     l.Id == leaveId &&
                                     l.EmployeeId == employeeId);

            return leave is null ? null : mapper.Map<LeaveDto>(leave);
        }

        public async Task<LeaveDto> CreateAsync(int employeeId, CreateLeaveDto dto, Stream? fileStream = null, string? fileName = null)
        {
            var startDate = DateTime.SpecifyKind(dto.StartDate.Date, DateTimeKind.Utc);
            var endDate = DateTime.SpecifyKind(dto.EndDate.Date, DateTimeKind.Utc);
            var today = DateTime.SpecifyKind(DateTime.UtcNow.Date, DateTimeKind.Utc);

            if (startDate < today)
                throw new ArgumentException("Start date cannot be in the past");

            if (endDate < startDate)
                throw new ArgumentException("End date cannot be before start date");

            var totalDays = (int)(endDate - startDate).TotalDays + 1;

            // ── Balance validation per leave type ──────────────────────────
            var employee = await uow.Repository<Employee>().GetByIdAsync(employeeId)
                           ?? throw new KeyNotFoundException("Employee not found");

            switch (dto.LeaveType)
            {
                case LeaveType.Annual when employee.AnnualLeaveBalance < totalDays:
                    throw new InvalidOperationException(
                        $"Insufficient annual leave balance. You have {employee.AnnualLeaveBalance} day(s) remaining, but requested {totalDays}.");

                case LeaveType.Sick when employee.SickLeaveBalance < totalDays:
                    throw new InvalidOperationException(
                        $"Insufficient sick leave balance. You have {employee.SickLeaveBalance} day(s) remaining, but requested {totalDays}.");

                case LeaveType.Emergency when employee.EmergencyLeaveBalance < totalDays:
                    throw new InvalidOperationException(
                        $"Insufficient emergency leave balance. You have {employee.EmergencyLeaveBalance} day(s) remaining, but requested {totalDays}.");

                // LeaveType.Unpaid: no balance restriction
            }
            // ──────────────────────────────────────────────────────────────

            var hasOverlap = await uow.Repository<Leave>()
                              .GetAllQueryable()
                              .AnyAsync(l =>
                                  l.EmployeeId == employeeId &&
                                  l.Status != LeaveStatus.Rejected &&
                                  l.StartDate <= endDate &&
                                  l.EndDate >= startDate);

            if (hasOverlap)
                throw new InvalidOperationException(
                    "You already have an active (Pending or Approved) leave request overlapping these dates.");

            // ── Handle File Upload ─────────────────────────────────────────
            string? attachmentUrl = null;
            if (fileStream != null && !string.IsNullOrWhiteSpace(fileName))
            {
                attachmentUrl = await imageService.UploadImageAsync(fileStream, fileName);
            }

            var leave = new Leave
            {
                EmployeeId = employeeId,
                LeaveType = dto.LeaveType,
                StartDate = startDate,
                EndDate = endDate,
                TotalDays = totalDays,
                Reason = dto.Reason,
                Status = LeaveStatus.Pending,
                RequestedAt = DateTime.UtcNow,
                AttachmentUrl = attachmentUrl
            };

            await uow.Repository<Leave>().AddAsync(leave);
            await uow.SaveChangesAsync();

            // employee is already defined at the beginning of the method

            var employeeName = employee is not null
                ? $"{employee.FirstName} {employee.LastName}"
                : "Unknown";

            var hrAdmins = await uow.Repository<User>()
                            .GetAllQueryable()
                            .Where(u => u.Role == UserRole.HR.ToString() ||
                                        u.Role == UserRole.Admin.ToString())
                            .ToListAsync();

            // FIX #2: Notification و Email في try-catch منفصلين
            foreach (var user in hrAdmins)
            {
                try
                {
                    await notificationService.CreateAsync(
                        userId: user.Id,
                        title: "New Leave Request",
                        message: $"{employeeName} submitted a {dto.LeaveType} leave request " +
                                 $"from {startDate:yyyy-MM-dd} to {endDate:yyyy-MM-dd}",
                        type: NotificationType.LeaveRequested);
                }
                catch (Exception ex)
                {
                    logger.LogError(ex,
                        "Failed to send leave notification to user {UserId}", user.Id);
                }

                try
                {
                    await emailService.SendLeaveRequestedAsync(
                        user.Email, employeeName,
                        dto.LeaveType.ToString(),
                        startDate, endDate);
                }
                catch (Exception ex)
                {
                    logger.LogError(ex,
                        "Failed to send leave email to user {UserId}", user.Id);
                }
            }

            return (await GetByIdAsync(leave.Id))!;
        }

        public async Task<LeaveDto> UpdateStatusAsync(
            int leaveId, int reviewerUserId, UpdateLeaveStatusDto dto)
        {
            var leave = await uow.Repository<Leave>()
                                 .GetAllQueryable()
                                 .Include(l => l.Employee).ThenInclude(e => e.User)
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
            leave.ReviewedById = reviewerUserId;
            leave.ReviewedAt = DateTime.UtcNow;

            leave.RejectionReason = dto.Status == LeaveStatus.Rejected
                ? dto.RejectionReason
                : null;

            uow.Repository<Leave>().Update(leave);

            var employee = await uow.Repository<Employee>()
                            .GetAllQueryable()
                            .Include(e => e.User)
                            .FirstOrDefaultAsync(e => e.Id == leave.EmployeeId);

            // ── Deduct from the correct balance when approved ───────────
            if (dto.Status == LeaveStatus.Approved && employee != null)
            {
                switch (leave.LeaveType)
                {
                    case LeaveType.Annual:
                        employee.AnnualLeaveBalance = Math.Max(0, employee.AnnualLeaveBalance - leave.TotalDays);
                        break;
                    case LeaveType.Sick:
                        employee.SickLeaveBalance = Math.Max(0, employee.SickLeaveBalance - leave.TotalDays);
                        break;
                    case LeaveType.Emergency:
                        employee.EmergencyLeaveBalance = Math.Max(0, employee.EmergencyLeaveBalance - leave.TotalDays);
                        break;
                    // Unpaid: no balance to deduct
                }
                uow.Repository<Employee>().Update(employee);
            }
            // ──────────────────────────────────────────────────────────────

            await uow.SaveChangesAsync();


            if (employee?.User is not null)
            {
                var employeeUser = employee.User;
                var isApproved = dto.Status == LeaveStatus.Approved;
                var employeeName = $"{employee.FirstName} {employee.LastName}";

                // FIX #2: Notification و Email في try-catch منفصلين
                try
                {
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
                }
                catch (Exception ex)
                {
                    logger.LogError(ex,
                        "Failed to send leave status notification to employee {EmployeeId}",
                        leave.EmployeeId);
                }

                try
                {
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
                        "Failed to send leave status email to employee {EmployeeId}",
                        leave.EmployeeId);
                }
            }

            // FIX #1: GetByIdAsync لضمان رجوع بيانات كاملة مع EmployeeName
            return (await GetByIdAsync(leaveId))!;
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

            // احفظ بيانات الـ leave قبل الحذف
            var leaveType = leave.LeaveType;

            uow.Repository<Leave>().Delete(leave);
            await uow.SaveChangesAsync();

            var employee = await uow.Repository<Employee>()
                                    .GetByIdAsync(employeeId);

            var employeeName = employee is not null
                ? $"{employee.FirstName} {employee.LastName}"
                : "Unknown";

            var hrAdmins = await uow.Repository<User>()
                                    .GetAllQueryable()
                                    .Where(u => u.Role == UserRole.HR.ToString() ||
                                                u.Role == UserRole.Admin.ToString())
                                    .ToListAsync();

            // FIX #2: Notification و Email في try-catch منفصلين
            foreach (var user in hrAdmins)
            {
                try
                {
                    await notificationService.CreateAsync(
                        userId: user.Id,
                        title: "Leave Request Cancelled",
                        message: $"{employeeName} cancelled their {leaveType} leave request",
                        type: NotificationType.LeaveCancelled);
                }
                catch (Exception ex)
                {
                    logger.LogError(ex,
                        "Failed to send leave cancellation notification to user {UserId}",
                        user.Id);
                }

                try
                {
                    await emailService.SendLeaveCancelledAsync(
                        user.Email, employeeName, leaveType.ToString());
                }
                catch (Exception ex)
                {
                    logger.LogError(ex,
                        "Failed to send leave cancellation email to user {UserId}",
                        user.Id);
                }
            }
        }
    }
}