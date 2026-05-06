using Application.DTOs.Notification;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace Application.Services.Implementations
{
    
    public class NotificationService(IUnitOfWork uow, IMapper mapper) : INotificationService
    {
        public async Task<List<NotificationDto>> GetMyNotificationsAsync(int userId)
        {
            var items = await uow.Repository<Notification>()
                                 .GetAllQueryable()
                                 .Where(n => n.UserId == userId)
                                 .OrderByDescending(n => n.CreatedAt)
                                 .ToListAsync();

            return mapper.Map<List<NotificationDto>>(items);
        }

        public async Task<int> GetUnreadCountAsync(int userId)
        {
            return await uow.Repository<Notification>()
                            .GetAllQueryable()
                            .CountAsync(n => n.UserId == userId && !n.IsRead);
        }

        public async Task MarkAsReadAsync(int notificationId, int userId)
        {
            var notification = await uow.Repository<Notification>()
                                        .GetAllQueryable()
                                        .FirstOrDefaultAsync(n =>
                                            n.Id == notificationId &&
                                            n.UserId == userId)
                              ?? throw new KeyNotFoundException(
                                     $"Notification {notificationId} not found");

            if (notification.IsRead) return;

            notification.IsRead = true;
            uow.Repository<Notification>().Update(notification);
            await uow.SaveChangesAsync();
        }

        public async Task MarkAllAsReadAsync(int userId)
        {
            var unread = await uow.Repository<Notification>()
                                  .GetAllQueryable()
                                  .Where(n => n.UserId == userId && !n.IsRead)
                                  .ToListAsync();

            if (!unread.Any()) return;

            foreach (var n in unread)
            {
                n.IsRead = true;
                uow.Repository<Notification>().Update(n);
            }

            await uow.SaveChangesAsync();
        }

        public async Task DeleteAsync(int notificationId, int userId)
        {
            var notification = await uow.Repository<Notification>()
                                        .GetAllQueryable()
                                        .FirstOrDefaultAsync(n =>
                                            n.Id == notificationId &&
                                            n.UserId == userId)
                              ?? throw new KeyNotFoundException(
                                     $"Notification {notificationId} not found");

            uow.Repository<Notification>().Delete(notification);
            await uow.SaveChangesAsync();
        }

        // ✅ Internal Method — تُحقن بالـ Services الثانية
        public async Task CreateAsync(
            int userId, string title, string message, NotificationType type)
        {
            var notification = new Notification
            {
                UserId = userId,
                Title = title,
                Message = message,
                Type = type,
                CreatedAt = DateTime.UtcNow
            };

            await uow.Repository<Notification>().AddAsync(notification);
            await uow.SaveChangesAsync();
        }
    }
}
