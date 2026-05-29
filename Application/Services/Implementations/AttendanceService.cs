using Application.Common;
using Application.DTOs.Attendance;
using Application.Services.Interfaces;
using Application.Settings;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;


namespace Application.Services.Implementations
{
    public class AttendanceService(
        IUnitOfWork uow,
        IMapper mapper,
        INotificationService notificationService,
        IEmailService emailService,
        IOptions<AttendanceSettings> attendanceOptions) : IAttendanceService
    {
        private readonly AttendanceSettings _attendanceSettings = attendanceOptions.Value;

        public async Task<PagedResult<AttendanceDto>> GetAllAsync(
            int pageNumber, int pageSize, DateTime? date = null)
        {
            var query = uow.Repository<Attendance>()
                           .GetAllQueryable()
                           .Include(a => a.Employee).ThenInclude(e => e.User)
                           .AsQueryable();

            if (date.HasValue) query = query.Where(a => a.Date.Date == date.Value.Date);

            query = query.OrderByDescending(a => a.Date);

            var total = await query.CountAsync();
            var items = await query
                            .Skip((pageNumber - 1) * pageSize)
                            .Take(pageSize)
                            .ToListAsync();

            return PagedResult<AttendanceDto>.Create(
                mapper.Map<List<AttendanceDto>>(items), total, pageNumber, pageSize);
        }

        public async Task<PagedResult<AttendanceDto>> GetMyAttendanceAsync(
            int employeeId, int pageNumber, int pageSize, DateTime? date = null)
        {
            var query = uow.Repository<Attendance>()
                           .GetAllQueryable()
                           .Include(a => a.Employee).ThenInclude(e => e.User)
                           .Where(a => a.EmployeeId == employeeId);

            if (date.HasValue) query = query.Where(a => a.Date.Date == date.Value.Date);

            query = query.OrderByDescending(a => a.Date);

            var total = await query.CountAsync();
            var items = await query
                            .Skip((pageNumber - 1) * pageSize)
                            .Take(pageSize)
                            .ToListAsync();

            return PagedResult<AttendanceDto>.Create(
                mapper.Map<List<AttendanceDto>>(items), total, pageNumber, pageSize);
        }

        public async Task<AttendanceDto?> GetByIdAsync(int id)
        {
            var attendance = await uow.Repository<Attendance>()
                                      .GetAllQueryable()
                                      .Include(a => a.Employee).ThenInclude(e => e.User)
                                      .FirstOrDefaultAsync(a => a.Id == id);

            return attendance is null ? null : mapper.Map<AttendanceDto>(attendance);
        }

        public async Task<AttendanceDto> ClockInAsync(int employeeId, ClockInDto dto)
        {
            var date = DateTime.SpecifyKind(dto.Date.Date, DateTimeKind.Utc);

            var openSession = await uow.Repository<Attendance>()
                                        .GetAllQueryable()
                                        .FirstOrDefaultAsync(a =>
                                            a.EmployeeId == employeeId &&
                                            a.ClockOut == null);

            if (openSession != null)
            {
                if (openSession.Date.Date == date.Date)
                    throw new InvalidOperationException(
                        "You have already clocked in today. Please clock out first.");

                // ✅ Bug #5 Fix: Use configurable end time instead of hardcoded 23:59
                openSession.ClockOut = _attendanceSettings.WorkDayEndTime;

                var staleDuration = openSession.ClockOut.Value.ToTimeSpan()
                                    - openSession.ClockIn.ToTimeSpan();
                openSession.TotalHours = staleDuration.TotalHours > 0
                    ? (int)Math.Round(staleDuration.TotalHours)
                    : 0;

                uow.Repository<Attendance>().Update(openSession);
                await uow.SaveChangesAsync();
            }

            var alreadyClockedInToday = await uow.Repository<Attendance>()
                                                  .GetAllQueryable()
                                                  .AnyAsync(a =>
                                                      a.EmployeeId == employeeId &&
                                                      a.Date == date);

            if (alreadyClockedInToday)
                throw new InvalidOperationException(
                    "You have already clocked in today. Please clock out first.");

            var attendance = new Attendance
            {
                EmployeeId = employeeId,
                Date = date,
                ClockIn = dto.ClockIn
            };

            await uow.Repository<Attendance>().AddAsync(attendance);
            await uow.SaveChangesAsync();

            var user = await uow.Repository<User>()
                                .GetAllQueryable()
                                .Include(u => u.Employee)
                                .FirstOrDefaultAsync(u => u.EmployeeId == employeeId);

            if (user is not null)
            {
                var employeeName = user.Employee is not null
                    ? $"{user.Employee.FirstName} {user.Employee.LastName}"
                    : user.Username;

                await notificationService.CreateAsync(
                    userId: user.Id,
                    title: "Clock In Recorded",
                    message: $"Your attendance was recorded at {dto.ClockIn:HH:mm}",
                    type: NotificationType.ClockIn);

                try { await emailService.SendClockInAsync(user.Email, employeeName, dto.ClockIn); }
                catch { /* Log if needed */ }
            }

            return (await GetByIdAsync(attendance.Id))!;
        }

        public async Task<AttendanceDto> ClockOutAsync(int employeeId, ClockOutDto dto)
        {
            var attendance = await uow.Repository<Attendance>()
                                      .GetAllQueryable()
                                      .Include(a => a.Employee).ThenInclude(e => e.User)
                                      .Where(a => a.EmployeeId == employeeId && a.ClockOut == null)
                                      .OrderByDescending(a => a.Date)
                                      .FirstOrDefaultAsync()
                            ?? throw new KeyNotFoundException(
                                   "No open clock-in record found. You are not currently clocked in.");

            if (attendance.Date.Date == DateTime.UtcNow.Date)
            {
                if (dto.ClockOut <= attendance.ClockIn)
                    throw new ArgumentException(
                        "Clock-out time must be after clock-in time.");
            }

            attendance.ClockOut = dto.ClockOut;

            var duration = dto.ClockOut.ToTimeSpan() - attendance.ClockIn.ToTimeSpan();
            attendance.TotalHours = duration.TotalHours > 0 ? (int)Math.Round(duration.TotalHours) : 0;

            uow.Repository<Attendance>().Update(attendance);
            await uow.SaveChangesAsync();

            var user = await uow.Repository<User>()
                                .GetAllQueryable()
                                .Include(u => u.Employee)
                                .FirstOrDefaultAsync(u => u.EmployeeId == employeeId);

            if (user is not null)
            {
                var employeeName = user.Employee is not null
                    ? $"{user.Employee.FirstName} {user.Employee.LastName}"
                    : user.Username;

                var total = dto.ClockOut.ToTimeSpan() - attendance.ClockIn.ToTimeSpan();

                await notificationService.CreateAsync(
                    userId: user.Id,
                    title: "Clock Out Recorded",
                    message: $"You clocked out at {dto.ClockOut:HH:mm}. " +
                             $"Total: {(int)total.TotalHours}h {total.Minutes}m",
                    type: NotificationType.ClockOut);

                try
                {
                    await emailService.SendClockOutAsync(
                        user.Email, employeeName,
                        attendance.ClockIn, dto.ClockOut);
                }
                catch { /* Log if needed */ }
            }

            return mapper.Map<AttendanceDto>(attendance);
        }
    }
}