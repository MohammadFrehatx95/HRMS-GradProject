using Application.Common;
using Application.DTOs.Meeting;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Services;

public class MeetingService(
    IUnitOfWork uow,
    IMapper mapper,
    INotificationService notificationService,
    IEmailService emailService,
    ILogger<MeetingService> logger) : IMeetingService
{

    // ── توليد Google Meet Link واقعي الشكل ──────────────────
    private static string GenerateMeetLink()
    {
        const string chars = "abcdefghijklmnopqrstuvwxyz";
        var rng = Random.Shared;

        string Segment(int len) => new(
            Enumerable.Range(0, len)
                      .Select(_ => chars[rng.Next(chars.Length)])
                      .ToArray());

        // الشكل: https://meet.google.com/xxx-xxxx-xxx
        return $"https://meet.google.com/{Segment(3)}-{Segment(4)}-{Segment(3)}";
    }


    public async Task<PagedResult<MeetingDto>> GetAllAsync(
        int pageNumber, int pageSize)
    {
        var query = uow.Repository<Meeting>()
            .GetAllQueryable()
            .Include(m => m.Employee)
            .Include(m => m.Organizer)
            .OrderByDescending(m => m.ScheduledAt);

        var total = await query.CountAsync();
        var items = await query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return PagedResult<MeetingDto>.Create(
            mapper.Map<List<MeetingDto>>(items), total, pageNumber, pageSize);
    }


    public async Task<PagedResult<MeetingDto>> GetMyMeetingsAsync(
        int employeeId, int pageNumber, int pageSize)
    {
        var query = uow.Repository<Meeting>()
            .GetAllQueryable()
            .Include(m => m.Employee)
            .Include(m => m.Organizer)
            .Where(m => m.EmployeeId == employeeId)
            .OrderByDescending(m => m.ScheduledAt);

        var total = await query.CountAsync();
        var items = await query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return PagedResult<MeetingDto>.Create(
            mapper.Map<List<MeetingDto>>(items), total, pageNumber, pageSize);
    }


    public async Task<MeetingDto?> GetByIdAsync(int id)
    {
        var meeting = await uow.Repository<Meeting>()
            .GetAllQueryable()
            .Include(m => m.Employee)
            .Include(m => m.Organizer)
            .FirstOrDefaultAsync(m => m.Id == id);

        return meeting is null ? null : mapper.Map<MeetingDto>(meeting);
    }


    public async Task<MeetingDto> CreateAsync(
        int organizerUserId, CreateMeetingDto dto)
    {
        // تحقق الموظف موجود
        var employee = await uow.Repository<Employee>()
            .GetAllQueryable()
            .Include(e => e.User)
            .FirstOrDefaultAsync(e => e.Id == dto.EmployeeId)
            ?? throw new KeyNotFoundException(
                   $"Employee {dto.EmployeeId} not found");

        // تحقق الوقت في المستقبل
        var scheduledUtc = DateTime.SpecifyKind(dto.ScheduledAt, DateTimeKind.Utc);
        if (scheduledUtc <= DateTime.UtcNow)
            throw new ArgumentException(
                "Meeting must be scheduled in the future");

        // تحقق ما في ميتنج متعارض لنفس الموظف
        var hasConflict = await uow.Repository<Meeting>()
            .GetAllQueryable()
            .AnyAsync(m =>
                m.EmployeeId == dto.EmployeeId &&
                m.Status == MeetingStatus.Scheduled &&
                m.ScheduledAt >= scheduledUtc.AddMinutes(-dto.DurationMinutes) &&
                m.ScheduledAt <= scheduledUtc.AddMinutes(dto.DurationMinutes));

        if (hasConflict)
            throw new InvalidOperationException(
                "Employee already has a scheduled meeting within this time slot");

        var meeting = new Meeting
        {
            Title = dto.Title,
            Reason = dto.Reason,
            ScheduledAt = scheduledUtc,
            DurationMinutes = dto.DurationMinutes,
            MeetLink = GenerateMeetLink(),
            Notes = dto.Notes,
            OrganizerId = organizerUserId,
            EmployeeId = dto.EmployeeId,
            Status = MeetingStatus.Scheduled,
            CreatedAt = DateTime.UtcNow
        };

        await uow.Repository<Meeting>().AddAsync(meeting);
        await uow.SaveChangesAsync();

        // ── الإشعار ────────────────────────────────────────────
        var employeeUser = employee.User;
        if (employeeUser is not null)
        {
            var employeeName = $"{employee.FirstName} {employee.LastName}";
            var organizer = await uow.Repository<User>()
                                          .GetByIdAsync(organizerUserId);
            var organizerName = organizer?.Username ?? "HR Team";

            try
            {
                await notificationService.CreateAsync(
                    userId: employeeUser.Id,
                    title: " Meeting Scheduled",
                    message: $"You have a meeting '{dto.Title}' on " +
                              $"{scheduledUtc:dddd, MMMM dd} at {scheduledUtc:HH:mm} UTC. " +
                              $"Duration: {dto.DurationMinutes} min.",
                    type: Domain.Enums.NotificationType.General);

                await emailService.SendMeetingScheduledAsync(
                    toEmail: employeeUser.Email,
                    employeeName: employeeName,
                    organizerName: organizerName,
                    title: dto.Title,
                    reason: dto.Reason,
                    scheduledAt: scheduledUtc,
                    durationMinutes: dto.DurationMinutes,
                    meetLink: meeting.MeetLink,
                    notes: dto.Notes);
            }
            catch (Exception ex)
            {
                logger.LogError(ex,
                    "Failed to send meeting notification to employee {Id}",
                    dto.EmployeeId);
            }
        }

        return (await GetByIdAsync(meeting.Id))!;
    }


    public async Task<MeetingDto> UpdateAsync(int id, UpdateMeetingDto dto)
    {
        var meeting = await uow.Repository<Meeting>()
            .GetAllQueryable()
            .Include(m => m.Employee).ThenInclude(e => e.User)
            .FirstOrDefaultAsync(m => m.Id == id)
            ?? throw new KeyNotFoundException($"Meeting {id} not found");

        if (meeting.Status != MeetingStatus.Scheduled)
            throw new InvalidOperationException(
                "Only Scheduled meetings can be updated");

        if (dto.Title is not null) meeting.Title = dto.Title;
        if (dto.Reason is not null) meeting.Reason = dto.Reason;
        if (dto.Notes is not null) meeting.Notes = dto.Notes;
        if (dto.DurationMinutes is not null) meeting.DurationMinutes = dto.DurationMinutes.Value;

        if (dto.ScheduledAt is not null)
        {
            var newTime = DateTime.SpecifyKind(dto.ScheduledAt.Value, DateTimeKind.Utc);
            if (newTime <= DateTime.UtcNow)
                throw new ArgumentException("New scheduled time must be in the future");
            meeting.ScheduledAt = newTime;
        }

        uow.Repository<Meeting>().Update(meeting);
        await uow.SaveChangesAsync();

        // إشعار الموظف بالتغيير
        var employeeUser = meeting.Employee.User;
        if (employeeUser is not null)
        {
            try
            {
                await notificationService.CreateAsync(
                    userId: employeeUser.Id,
                    title: " Meeting Updated",
                    message: $"Your meeting '{meeting.Title}' has been updated. " +
                              $"New time: {meeting.ScheduledAt:MMM dd, HH:mm} UTC.",
                    type: Domain.Enums.NotificationType.General);

                await emailService.SendMeetingUpdatedAsync(
                    toEmail: employeeUser.Email,
                    employeeName: $"{meeting.Employee.FirstName} {meeting.Employee.LastName}",
                    title: meeting.Title,
                    scheduledAt: meeting.ScheduledAt,
                    meetLink: meeting.MeetLink);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Failed to send meeting update notification");
            }
        }

        return (await GetByIdAsync(id))!;
    }


    public async Task<MeetingDto> CancelAsync(int id)
    {
        var meeting = await uow.Repository<Meeting>()
            .GetAllQueryable()
            .Include(m => m.Employee).ThenInclude(e => e.User)
            .FirstOrDefaultAsync(m => m.Id == id)
            ?? throw new KeyNotFoundException($"Meeting {id} not found");

        if (meeting.Status != MeetingStatus.Scheduled)
            throw new InvalidOperationException(
                "Only Scheduled meetings can be cancelled");

        meeting.Status = MeetingStatus.Cancelled;
        uow.Repository<Meeting>().Update(meeting);
        await uow.SaveChangesAsync();

        var employeeUser = meeting.Employee.User;
        if (employeeUser is not null)
        {
            try
            {
                await notificationService.CreateAsync(
                    userId: employeeUser.Id,
                    title: "  Meeting Cancelled",
                    message: $"Your meeting '{meeting.Title}' scheduled for " +
                              $"{meeting.ScheduledAt:MMM dd, HH:mm} UTC has been cancelled.",
                    type: Domain.Enums.NotificationType.General);

                await emailService.SendMeetingCancelledAsync(
                    toEmail: employeeUser.Email,
                    employeeName: $"{meeting.Employee.FirstName} {meeting.Employee.LastName}",
                    title: meeting.Title,
                    scheduledAt: meeting.ScheduledAt);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Failed to send meeting cancellation notification");
            }
        }

        return mapper.Map<MeetingDto>(meeting);
    }


    public async Task<MeetingDto> CompleteAsync(int id)
    {
        var meeting = await uow.Repository<Meeting>()
            .GetAllQueryable()
            .Include(m => m.Employee)
            .Include(m => m.Organizer)
            .FirstOrDefaultAsync(m => m.Id == id)
            ?? throw new KeyNotFoundException($"Meeting {id} not found");

        if (meeting.Status != MeetingStatus.Scheduled)
            throw new InvalidOperationException(
                "Only Scheduled meetings can be marked as completed");

        meeting.Status = MeetingStatus.Completed;
        uow.Repository<Meeting>().Update(meeting);
        await uow.SaveChangesAsync();

        return mapper.Map<MeetingDto>(meeting);
    }
}