using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Common;
using Application.DTOs.Meeting;
using Application.Services.Interfaces;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Application.Services.Implementations
{
    public class MeetingService : IMeetingService
    {
        private readonly IUnitOfWork _uow;
        private readonly INotificationService _notificationService;
        private readonly ILogger<MeetingService> _logger;
        private readonly IEmailService _emailService;

        public MeetingService(IUnitOfWork uow, INotificationService notificationService, ILogger<MeetingService> logger, IEmailService emailService)
        {
            _uow = uow;
            _notificationService = notificationService;
            _logger = logger;
            _emailService = emailService;
        }

        public async Task<PagedResult<MeetingDto>> GetAllAsync(int pageNumber, int pageSize)
        {
            var query = _uow.Repository<Meeting>()
                .GetAllQueryable()
                .Include(m => m.Employee)
                .Include(m => m.Organizer)
                .OrderByDescending(m => m.MeetingDate);

            var totalCount = await query.CountAsync();

            var items = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(m => new MeetingDto
                {
                    Id = m.Id,
                    Title = m.Title,
                    Description = m.Description,
                    MeetingDate = m.MeetingDate,
                    EmployeeId = m.EmployeeId,
                    EmployeeName = m.Employee.FirstName + " " + m.Employee.LastName,
                    OrganizerId = m.OrganizerId,
                    OrganizerName = m.Organizer.FirstName + " " + m.Organizer.LastName,
                    Status = m.Status,
                    CreatedAt = m.CreatedAt
                })
                .ToListAsync();

            return PagedResult<MeetingDto>.Create(items, totalCount, pageNumber, pageSize);
        }

        public async Task<PagedResult<MeetingDto>> GetByEmployeeIdAsync(int employeeId, int pageNumber, int pageSize)
        {
            var query = _uow.Repository<Meeting>()
                .GetAllQueryable()
                .Include(m => m.Employee)
                .Include(m => m.Organizer)
                .Where(m => m.EmployeeId == employeeId || m.OrganizerId == employeeId)
                .OrderByDescending(m => m.MeetingDate);

            var totalCount = await query.CountAsync();

            var items = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(m => new MeetingDto
                {
                    Id = m.Id,
                    Title = m.Title,
                    Description = m.Description,
                    MeetingDate = m.MeetingDate,
                    EmployeeId = m.EmployeeId,
                    EmployeeName = m.Employee.FirstName + " " + m.Employee.LastName,
                    OrganizerId = m.OrganizerId,
                    OrganizerName = m.Organizer.FirstName + " " + m.Organizer.LastName,
                    Status = m.Status,
                    CreatedAt = m.CreatedAt
                })
                .ToListAsync();

            return PagedResult<MeetingDto>.Create(items, totalCount, pageNumber, pageSize);
        }

        public async Task<MeetingDto> GetByIdAsync(int id)
        {
            var meeting = await _uow.Repository<Meeting>()
                .GetAllQueryable()
                .Include(m => m.Employee)
                .Include(m => m.Organizer)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (meeting == null)
                throw new KeyNotFoundException("Meeting not found");

            return new MeetingDto
            {
                Id = meeting.Id,
                Title = meeting.Title,
                Description = meeting.Description,
                MeetingDate = meeting.MeetingDate,
                EmployeeId = meeting.EmployeeId,
                EmployeeName = meeting.Employee.FirstName + " " + meeting.Employee.LastName,
                OrganizerId = meeting.OrganizerId,
                OrganizerName = meeting.Organizer.FirstName + " " + meeting.Organizer.LastName,
                Status = meeting.Status,
                CreatedAt = meeting.CreatedAt
            };
        }

        public async Task<MeetingDto> CreateAsync(CreateMeetingDto dto, int organizerId)
        {
            var meeting = new Meeting
            {
                Title = dto.Title,
                Description = dto.Description,
                MeetingDate = dto.MeetingDate.ToUniversalTime(),
                EmployeeId = dto.EmployeeId,
                OrganizerId = organizerId,
                Status = Domain.Enums.MeetingStatus.Pending,
                CreatedAt = DateTime.UtcNow
            };

            await _uow.Repository<Meeting>().AddAsync(meeting);
            await _uow.SaveChangesAsync();

            try
            {
                var employee = await _uow.Repository<Employee>().GetByIdAsync(dto.EmployeeId);
                var organizer = await _uow.Repository<Employee>().GetByIdAsync(organizerId);
                
                if (employee != null && employee.UserId != 0)
                {
                    await _notificationService.CreateAsync(
                        userId: employee.UserId,
                        title: "New Meeting Scheduled",
                        message: $"A new meeting '{dto.Title}' has been scheduled with you on {meeting.MeetingDate:yyyy-MM-dd HH:mm}.",
                        type: Domain.Enums.NotificationType.General
                    );
                }
                
                if (employee != null && !string.IsNullOrEmpty(employee.Email))
                {
                    string orgName = organizer != null ? $"{organizer.FirstName} {organizer.LastName}" : "HR/Admin";
                    await _emailService.SendMeetingInvitationAsync(
                        employee.Email,
                        $"{employee.FirstName} {employee.LastName}",
                        dto.Title,
                        meeting.MeetingDate,
                        orgName
                    );
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to send meeting notification");
            }

            return await GetByIdAsync(meeting.Id);
        }

        public async Task UpdateStatusAsync(int id, Domain.Enums.MeetingStatus newStatus)
        {
            var meeting = await _uow.Repository<Meeting>().GetByIdAsync(id);
            if (meeting == null)
                throw new KeyNotFoundException("Meeting not found");

            meeting.Status = newStatus;
            _uow.Repository<Meeting>().Update(meeting);
            await _uow.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var meeting = await _uow.Repository<Meeting>().GetByIdAsync(id);
            if (meeting != null)
            {
                _uow.Repository<Meeting>().Delete(meeting);
                await _uow.SaveChangesAsync();
            }
        }
    }
}
