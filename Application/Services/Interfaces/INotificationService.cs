using Application.DTOs.Notification;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.Interfaces
{
   
    public interface INotificationService
    {
        Task<List<NotificationDto>> GetMyNotificationsAsync(int userId);
        Task<int> GetUnreadCountAsync(int userId);
        Task MarkAsReadAsync(int notificationId, int userId);
        Task MarkAllAsReadAsync(int userId);
        Task DeleteAsync(int notificationId, int userId);

        // Internal — تُستخدم جوا الـ Services
        Task CreateAsync(int userId, string title, string message, NotificationType type);
    }
}
