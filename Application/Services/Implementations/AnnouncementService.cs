using System;
using System.Linq;
using System.Threading.Tasks;
using Application.Common;
using Application.DTOs.Announcement;
using Application.Services.Interfaces;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.Implementations
{
    public class AnnouncementService : IAnnouncementService
    {
        private readonly IUnitOfWork _uow;
        private readonly INotificationService _notificationService;
        private readonly IEmailService _emailService;

        public AnnouncementService(IUnitOfWork uow, INotificationService notificationService, IEmailService emailService)
        {
            _uow = uow;
            _notificationService = notificationService;
            _emailService = emailService;
        }

        public async Task<PagedResult<AnnouncementDto>> GetAllAsync(int pageNumber, int pageSize, int? currentEmployeeId = null, bool isAdminOrHR = false)
        {
            var query = _uow.Repository<Announcement>().GetAllQueryable()
                .Include(a => a.Author)
                .Where(a => a.ExpiryDate == null || a.ExpiryDate > DateTime.UtcNow)
                .OrderByDescending(a => a.CreatedAt);

            // Regular employees only see general announcements or ones targeted to them
            if (!isAdminOrHR && currentEmployeeId.HasValue)
            {
                var empId = currentEmployeeId.Value;
                query = (IOrderedQueryable<Announcement>)query.Where(a => a.IsGeneral || (a.TargetEmployeeIds != null && a.TargetEmployeeIds.Contains(empId)));
            }

            var totalCount = await query.CountAsync();
            var items = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

            var dtos = items.Select(a => new AnnouncementDto
            {
                Id = a.Id,
                Title = a.Title,
                Content = a.Content,
                CreatedAt = a.CreatedAt,
                Priority = a.Priority,
                AuthorId = a.AuthorId,
                AuthorName = a.Author != null ? $"{a.Author.FirstName} {a.Author.LastName}" : "HR Department"
            }).ToList();

            return PagedResult<AnnouncementDto>.Create(dtos, totalCount, pageNumber, pageSize);
        }

        public async Task<AnnouncementDto> CreateAsync(CreateAnnouncementDto dto, int? authorId)
        {
            var announcement = new Announcement
            {
                Title = dto.Title,
                Content = dto.Content,
                Priority = dto.Priority,
                IsGeneral = dto.IsGeneral,
                TargetEmployeeIds = dto.TargetEmployeeIds,
                ExpiryDate = dto.ExpiryDate,
                CreatedAt = DateTime.UtcNow,
                AuthorId = authorId  // nullable - OK for pure admins without employee records
            };

            await _uow.Repository<Announcement>().AddAsync(announcement);
            await _uow.SaveChangesAsync();

            // Notify employees
            try
            {
                var employees = await _uow.Repository<Employee>().GetAllAsync();
                
                if (!announcement.IsGeneral && announcement.TargetEmployeeIds != null)
                {
                    employees = employees.Where(e => announcement.TargetEmployeeIds.Contains(e.Id));
                }

                foreach (var emp in employees)
                {
                    if (emp.UserId != 0) // Ensuring the employee has a user account linked
                    {
                        await _notificationService.CreateAsync(
                            emp.UserId,
                            "New Company Announcement",
                            $"A new announcement has been posted: {announcement.Title}",
                            NotificationType.General
                        );
                    }
                    
                    if (!string.IsNullOrEmpty(emp.Email))
                    {
                        await _emailService.SendAnnouncementAsync(
                            emp.Email,
                            $"{emp.FirstName} {emp.LastName}",
                            announcement.Title,
                            announcement.Priority
                        );
                    }
                }
            }
            catch
            {
                // Proceed even if notification fails
            }

            return new AnnouncementDto
            {
                Id = announcement.Id,
                Title = announcement.Title,
                Content = announcement.Content,
                CreatedAt = announcement.CreatedAt,
                Priority = announcement.Priority,
                AuthorId = announcement.AuthorId
            };
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var announcement = await _uow.Repository<Announcement>().GetByIdAsync(id);
            if (announcement == null) return false;

            _uow.Repository<Announcement>().Delete(announcement);
            await _uow.SaveChangesAsync();
            return true;
        }
    }
}
