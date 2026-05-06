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

    public class AttendanceService(IUnitOfWork uow,IMapper mapper,INotificationService notificationService) : IAttendanceService
    {
        public async Task<PagedResult<AttendanceDto>> GetAllAsync(int pageNumber, int pageSize)
        {
            var query = uow.Repository<Attendance>()
                           .GetAllQueryable()
                           .Include(a => a.Employee)
                           .OrderByDescending(a => a.Date);

            var total = await query.CountAsync();
            var items = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

            return PagedResult<AttendanceDto>.Create(
                mapper.Map<List<AttendanceDto>>(items), total, pageNumber, pageSize);
        }

        public async Task<PagedResult<AttendanceDto>> GetMyAttendanceAsync(int employeeId, int pageNumber, int pageSize)
        {
            var query = uow.Repository<Attendance>()
                           .GetAllQueryable()
                           .Include(a => a.Employee)
                           .Where(a => a.EmployeeId == employeeId)
                           .OrderByDescending(a => a.Date);

            var total = await query.CountAsync();
            var items = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

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
            
            var date = DateTime.SpecifyKind(dto.Date.Date, DateTimeKind.Utc);
            var today = DateTime.SpecifyKind(DateTime.UtcNow.Date, DateTimeKind.Utc);

            var alreadyClockedIn = await uow.Repository<Attendance>()
                                            .GetAllQueryable()
                                            .AnyAsync(a =>
                                                a.EmployeeId == employeeId &&
                                                a.Date == date);

            if (alreadyClockedIn)
                throw new InvalidOperationException("You have already clocked in today");

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
                           .FirstOrDefaultAsync(u => u.EmployeeId == employeeId);

            if (user is not null)
            {
                await notificationService.CreateAsync(
                    userId: user.Id,
                    title: "Clock In Recorded ",
                    message: $"Your attendance was recorded at {dto.ClockIn}",
                    type: NotificationType.ClockIn
                );
            }

            return (await GetByIdAsync(attendance.Id))!;
        }

        public async Task<AttendanceDto> ClockOutAsync(int employeeId, ClockOutDto dto)
        {
            
            var today = DateTime.SpecifyKind(DateTime.UtcNow.Date, DateTimeKind.Utc);

            var attendance = await uow.Repository<Attendance>()
                                      .GetAllQueryable()
                                      .Include(a => a.Employee)
                                      .FirstOrDefaultAsync(a =>
                                          a.EmployeeId == employeeId &&
                                          a.Date == today)
                            ?? throw new KeyNotFoundException(
                                   "No clock-in record found for today");

            if (attendance.ClockOut.HasValue)
                throw new InvalidOperationException("You have already clocked out today");

            if (dto.ClockOut <= attendance.ClockIn)
                throw new ArgumentException(
                    "Clock-out time must be after clock-in time");

            attendance.ClockOut = dto.ClockOut;

            uow.Repository<Attendance>().Update(attendance);
            await uow.SaveChangesAsync();

            var user = await uow.Repository<User>()
                           .GetAllQueryable()
                           .FirstOrDefaultAsync(u => u.EmployeeId == employeeId);

            if (user is not null)
            {
                await notificationService.CreateAsync(
                    userId: user.Id,
                    title: "Clock Out Recorded ",
                    message: $"You clocked out at {dto.ClockOut}. " +
                             $"Total: {attendance.ClockOut!.Value.ToTimeSpan() - attendance.ClockIn.ToTimeSpan():hh\\:mm}",
                    type: NotificationType.ClockOut
                );
            }

            return mapper.Map<AttendanceDto>(attendance);
        }
    }
}
