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
        private int? GetUserId() =>
            int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var id) ? id : null;

        [HttpGet]
        public async Task<IActionResult> GetMy()
        {
            var uid = GetUserId(); if (uid is null) return Unauthorized();
            var result = await notificationService.GetMyNotificationsAsync(uid.Value);
            return Ok(ApiResponse<List<NotificationDto>>.Ok(result));
        }

        [HttpGet("unread-count")]
        public async Task<IActionResult> GetUnreadCount()
        {
            var uid = GetUserId(); if (uid is null) return Unauthorized();
            var count = await notificationService.GetUnreadCountAsync(uid.Value);
            return Ok(ApiResponse<int>.Ok(count));
        }

        [HttpPut("{id}/read")]
        public async Task<IActionResult> MarkAsRead(int id)
        {
            var uid = GetUserId(); if (uid is null) return Unauthorized();
            await notificationService.MarkAsReadAsync(id, uid.Value);
            return Ok(ApiResponse.Ok("Notification marked as read"));
        }

        [HttpPut("read-all")]
        public async Task<IActionResult> MarkAllAsRead()
        {
            var uid = GetUserId(); if (uid is null) return Unauthorized();
            await notificationService.MarkAllAsReadAsync(uid.Value);
            return Ok(ApiResponse.Ok("All notifications marked as read"));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var uid = GetUserId(); if (uid is null) return Unauthorized();
            await notificationService.DeleteAsync(id, uid.Value);
            return Ok(ApiResponse.Ok("Notification deleted"));
        }

        [HttpDelete("delete-all")]
        public async Task<IActionResult> DeleteAll()
        {
            var uid = GetUserId(); if (uid is null) return Unauthorized();
            await notificationService.DeleteAllAsync(uid.Value);
            return Ok(ApiResponse.Ok("All notifications deleted"));
        }
    }
}
