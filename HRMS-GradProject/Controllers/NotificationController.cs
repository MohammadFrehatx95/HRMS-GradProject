using Application.Common;
using Application.DTOs.Notification;
using Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HRMS_GradProject.Controllers
{
    // HRMS_API/Controllers/NotificationController.cs
    [ApiController]
    [Route("api/notifications")]
    [Authorize]
    public class NotificationController(
        INotificationService notificationService) : ControllerBase
    {
        private int GetUserId() =>
            int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        // GET /api/notifications
        [HttpGet]
        public async Task<IActionResult> GetMy()
        {
            var result = await notificationService
                             .GetMyNotificationsAsync(GetUserId());
            return Ok(ApiResponse<List<NotificationDto>>.Ok(result));
        }

        // GET /api/notifications/unread-count
        [HttpGet("unread-count")]
        public async Task<IActionResult> GetUnreadCount()
        {
            var count = await notificationService.GetUnreadCountAsync(GetUserId());
            return Ok(ApiResponse<int>.Ok(count));
        }

        // PUT /api/notifications/{id}/read
        [HttpPut("{id}/read")]
        public async Task<IActionResult> MarkAsRead(int id)
        {
            await notificationService.MarkAsReadAsync(id, GetUserId());
            return Ok(ApiResponse.Ok("Notification marked as read"));
        }

        // PUT /api/notifications/read-all
        [HttpPut("read-all")]
        public async Task<IActionResult> MarkAllAsRead()
        {
            await notificationService.MarkAllAsReadAsync(GetUserId());
            return Ok(ApiResponse.Ok("All notifications marked as read"));
        }

        // DELETE /api/notifications/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await notificationService.DeleteAsync(id, GetUserId());
            return Ok(ApiResponse.Ok("Notification deleted"));
        }
    }
}
