using Application.Common;
using Application.DTOs.Attendance;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace Application.Services.Implementations
{

    // Application/Services/Implementations/AttendanceService.cs
    public class AttendanceService(
        IUnitOfWork uow,
        IMapper mapper,
        INotificationService notificationService,
        IEmailService emailService) : IAttendanceService
    {
        public async Task<PagedResult<AttendanceDto>> GetAllAsync(
            int pageNumber, int pageSize)
        {
            var query = uow.Repository<Attendance>()
                           .GetAllQueryable()
                           .Include(a => a.Employee)
                           .OrderByDescending(a => a.Date);

            var total = await query.CountAsync();
            var items = await query
                            .Skip((pageNumber - 1) * pageSize)
                            .Take(pageSize)
                            .ToListAsync();

            return PagedResult<AttendanceDto>.Create(
                mapper.Map<List<AttendanceDto>>(items), total, pageNumber, pageSize);
        }

        public async Task<PagedResult<AttendanceDto>> GetMyAttendanceAsync(
            int employeeId, int pageNumber, int pageSize)
        {
            var query = uow.Repository<Attendance>()
                           .GetAllQueryable()
                           .Include(a => a.Employee)
                           .Where(a => a.EmployeeId == employeeId)
                           .OrderByDescending(a => a.Date);

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
                                      .Include(a => a.Employee)
                                      .FirstOrDefaultAsync(a => a.Id == id);

            return attendance is null ? null : mapper.Map<AttendanceDto>(attendance);
        }

        public async Task<AttendanceDto> ClockInAsync(int employeeId, ClockInDto dto)
        {
            // ✅ Fix DateTime Kind
            var date = DateTime.SpecifyKind(dto.Date.Date, DateTimeKind.Utc);

            // ── 1. تحقق من وجود session مفتوحة (Working) من أي يوم سابق
            var openSession = await uow.Repository<Attendance>()
                                        .GetAllQueryable()
                                        .FirstOrDefaultAsync(a =>
                                            a.EmployeeId == employeeId &&
                                            a.ClockOut == null);

            if (openSession != null)
            {
                // ── Auto Clock-out تلقائي: نغلق الـ session القديمة بـ 23:59 من نفس يومها
                var autoClockOut = new TimeOnly(23, 59, 0);

                // إذا الـ session هي من نفس اليوم المطلوب، ارفض وقل له يعمل Clock Out أولاً
                if (openSession.Date.Date == date.Date)
                    throw new InvalidOperationException(
                        "You have already clocked in today. Please clock out first.");

                // إذا من يوم سابق → Auto Clock-out
                openSession.ClockOut = autoClockOut;
                uow.Repository<Attendance>().Update(openSession);
                await uow.SaveChangesAsync();
            }

            // ── 2. تحقق ألا يكون Clock-in لنفس اليوم موجوداً (مكتمل أو لا)
            var alreadyClockedInToday = await uow.Repository<Attendance>()
                                                  .GetAllQueryable()
                                                  .AnyAsync(a =>
                                                      a.EmployeeId == employeeId &&
                                                      a.Date == date);

            if (alreadyClockedInToday)
                throw new InvalidOperationException(
                    "You have already clocked in today. Please clock out first.");

            // ── 3. إنشاء سجل جديد
            var attendance = new Attendance
            {
                EmployeeId = employeeId,
                Date = date,
                ClockIn = dto.ClockIn
            };

            await uow.Repository<Attendance>().AddAsync(attendance);
            await uow.SaveChangesAsync();

            // ── إرسال الإشعار والإيميل
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
            // ── البحث عن أي session مفتوحة (ClockOut == null) لهذا الموظف
            // (ليس فقط اليوم، لأن بعض الموظفين نسوا الـ Clock Out من أيام سابقة)
            var attendance = await uow.Repository<Attendance>()
                                      .GetAllQueryable()
                                      .Include(a => a.Employee)
                                      .Where(a => a.EmployeeId == employeeId && a.ClockOut == null)
                                      .OrderByDescending(a => a.Date)  // الأحدث أولاً
                                      .FirstOrDefaultAsync()
                            ?? throw new KeyNotFoundException(
                                   "No open clock-in record found. You are not currently clocked in.");

            // تحقق من أن وقت Clock-out منطقي (بعد Clock-in)
            // إذا كانت الـ session من يوم سابق، نقبل أي وقت
            if (attendance.Date.Date == DateTime.UtcNow.Date)
            {
                if (dto.ClockOut <= attendance.ClockIn)
                    throw new ArgumentException(
                        "Clock-out time must be after clock-in time.");
            }

            attendance.ClockOut = dto.ClockOut;
            uow.Repository<Attendance>().Update(attendance);
            await uow.SaveChangesAsync();

            // ── إرسال الإشعار والإيميل
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
