using Application.Common;
using Application.DTOs.Auth;
using Application.DTOs.User;
using Application.Interfaces;
using Application.Services;
using Application.Services.Interfaces;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using HRMS_API.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace HRMS_API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController(IAuthService authService, IUserService userService, IUnitOfWork uow) : ControllerBase
{
    // POST api/auth/login
    [HttpPost("login")]
    [ValidateModel]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var result = await authService.LoginAsync(dto);

        return result is null
            ? Unauthorized(ApiResponse.Fail("Invalid email or password"))
            : Ok(ApiResponse<AuthResponseDto>.Ok(result, "Login successful"));
    }

    // POST api/auth/register — Admin only
    [HttpPost("register")]
    [Authorize(Roles = "Admin")]
    [ValidateModel]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        var success = await authService.RegisterAsync(dto);

        return success
            ? Ok(ApiResponse.Ok("User registered successfully"))
            : BadRequest(ApiResponse.Fail("Email already exists"));
    }

    // POST api/auth/change-password
    [HttpPost("change-password")]
    [Authorize]
    [ValidateModel]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var success = await authService.ChangePasswordAsync(userId, dto);

        return success
            ? Ok(ApiResponse.Ok("Password changed successfully"))
            : BadRequest(ApiResponse.Fail("Current password is incorrect"));
    }

    // GET api/auth/me
    [HttpGet("me")]
    [Authorize]
    public async Task<IActionResult> Me()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var user = await uow.Repository<User>().GetByIdAsync(userId);

        var result = new MeDto
        {
            Id = userId,
            Email = User.FindFirstValue(ClaimTypes.Email)!,
            Role = User.FindFirstValue(ClaimTypes.Role)!,
            EmployeeId = User.FindFirstValue("employeeId"),
            ProfilePictureUrl = user?.ProfilePictureUrl,
            PendingProfilePictureUrl = user?.PendingProfilePictureUrl
        };

        return Ok(ApiResponse<MeDto>.Ok(result));
    }

    // POST api/auth/upload-profile-picture — stores as PENDING, notifies HR/Admin
    [HttpPost("upload-profile-picture")]
    [Authorize]
    public async Task<IActionResult> UploadProfilePicture(IFormFile file,
        [FromServices] IImageService imageService,
        [FromServices] INotificationService notificationService)
    {
        if (file == null || file.Length == 0)
            return BadRequest(ApiResponse.Fail("No file uploaded."));

        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var user = await uow.Repository<User>().GetByIdAsync(userId);
        if (user == null) return NotFound(ApiResponse.Fail("User not found."));

        try
        {
            using var stream = file.OpenReadStream();
            var url = await imageService.UploadImageAsync(stream, file.FileName);
            if (url == null) return BadRequest(ApiResponse.Fail("Upload failed."));

            // Store as PENDING — not applied yet
            user.PendingProfilePictureUrl = url;
            uow.Repository<User>().Update(user);
            await uow.SaveChangesAsync();

            // Notify all HR and Admin users
            var hrAdmins = await uow.Repository<User>()
                .GetAllQueryable()
                .Where(u => (u.Role == "Admin" || u.Role == "HR") && u.Id != userId)
                .ToListAsync();

            var employeeName = user.Username;
            foreach (var hr in hrAdmins)
            {
                await notificationService.CreateAsync(
                    hr.Id,
                    "Profile Picture Approval Required",
                    $"{employeeName} has submitted a new profile picture. Please review and approve or reject it.",
                    NotificationType.ProfilePictureRequested);
            }

            return Ok(ApiResponse<string>.Ok(url, "Profile picture submitted for approval."));
        }
        catch (System.Exception ex)
        {
            return BadRequest(ApiResponse.Fail(ex.Message));
        }
    }

    // GET api/auth/pending-profile-pictures — HR/Admin only
    [HttpGet("pending-profile-pictures")]
    [Authorize(Roles = "Admin,HR")]
    public async Task<IActionResult> GetPendingProfilePictures()
    {
        var users = await uow.Repository<User>()
            .GetAllQueryable()
            .Where(u => u.PendingProfilePictureUrl != null)
            .Select(u => new PendingProfilePictureDto
            {
                UserId = u.Id,
                Username = u.Username,
                Email = u.Email,
                CurrentProfilePictureUrl = u.ProfilePictureUrl,
                PendingProfilePictureUrl = u.PendingProfilePictureUrl!
            })
            .ToListAsync();

        return Ok(ApiResponse<List<PendingProfilePictureDto>>.Ok(users, "Pending pictures retrieved."));
    }

    // POST api/auth/approve-profile-picture/{userId} — HR/Admin only
    [HttpPost("approve-profile-picture/{targetUserId:int}")]
    [Authorize(Roles = "Admin,HR")]
    public async Task<IActionResult> ApproveProfilePicture(int targetUserId,
        [FromServices] INotificationService notificationService)
    {
        var user = await uow.Repository<User>().GetByIdAsync(targetUserId);
        if (user == null) return NotFound(ApiResponse.Fail("User not found."));
        if (user.PendingProfilePictureUrl == null)
            return BadRequest(ApiResponse.Fail("No pending picture found."));

        user.ProfilePictureUrl = user.PendingProfilePictureUrl;
        user.PendingProfilePictureUrl = null;
        uow.Repository<User>().Update(user);
        await uow.SaveChangesAsync();

        await notificationService.CreateAsync(
            targetUserId,
            "Profile Picture Approved",
            "Your profile picture has been approved and is now live!",
            NotificationType.ProfilePictureApproved);

        return Ok(ApiResponse.Ok("Profile picture approved successfully."));
    }

    // POST api/auth/reject-profile-picture/{userId} — HR/Admin only
    [HttpPost("reject-profile-picture/{targetUserId:int}")]
    [Authorize(Roles = "Admin,HR")]
    public async Task<IActionResult> RejectProfilePicture(int targetUserId,
        [FromServices] INotificationService notificationService)
    {
        var user = await uow.Repository<User>().GetByIdAsync(targetUserId);
        if (user == null) return NotFound(ApiResponse.Fail("User not found."));
        if (user.PendingProfilePictureUrl == null)
            return BadRequest(ApiResponse.Fail("No pending picture found."));

        user.PendingProfilePictureUrl = null;
        uow.Repository<User>().Update(user);
        await uow.SaveChangesAsync();

        await notificationService.CreateAsync(
            targetUserId,
            "Profile Picture Rejected",
            "Your profile picture was rejected. Please upload a different photo that complies with company policy.",
            NotificationType.ProfilePictureRejected);

        return Ok(ApiResponse.Ok("Profile picture request rejected."));
    }

    [HttpPost("admin-update-profile-picture/{userId}")]
    [Authorize(Roles = "Admin,HR")]
    public async Task<IActionResult> AdminUpdateProfilePicture(int userId, IFormFile file,
        [FromServices] IImageService imageService)
    {
        if (file == null || file.Length == 0)
            return BadRequest(ApiResponse.Fail("No file uploaded."));

        var user = await uow.Repository<User>().GetByIdAsync(userId);
        if (user == null) return NotFound(ApiResponse.Fail("User not found."));

        try
        {
            using var stream = file.OpenReadStream();
            var url = await imageService.UploadImageAsync(stream, file.FileName);
            if (url == null) return BadRequest(ApiResponse.Fail("Upload failed."));

            // Apply directly
            user.ProfilePictureUrl = url;
            user.PendingProfilePictureUrl = null; // Clear pending if any
            uow.Repository<User>().Update(user);
            await uow.SaveChangesAsync();

            return Ok(ApiResponse<string>.Ok(url, "Profile picture updated successfully by admin."));
        }
        catch (System.Exception ex)
        {
            return StatusCode(500, ApiResponse.Fail($"Error: {ex.Message}"));
        }
    }

    [HttpGet("users")]
    [Authorize(Roles = "Admin,HR")]
    public async Task<IActionResult> GetAllUsers([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
    {
        var result = await userService.GetAllEmployeesAsync(pageNumber, pageSize);
        return Ok(ApiResponse<PagedResult<UserDto>>.Ok(result, "Users retrieved successfully"));
    }

    [HttpGet("unassigned-employees")]
    [Authorize(Roles = "Admin,HR")]
    public async Task<IActionResult> GetUnassignedEmployeeUsers([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
    {
        var result = await userService.GetUnassignedEmployeeUsersAsync(pageNumber, pageSize);
        return Ok(ApiResponse<PagedResult<UserDto>>.Ok(result, "Unassigned Employee Users retrieved successfully"));
    }

    // GET api/auth/get-user-id-by-email/{email}
    [HttpGet("get-user-id-by-email/{email}")]
    [Authorize(Roles = "Admin,HR")]
    public async Task<IActionResult> GetUserIdByEmail(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
            return BadRequest(ApiResponse.Fail("Email is required"));

        var user = await uow.Repository<User>()
                            .GetAllQueryable()
                            .FirstOrDefaultAsync(u => u.Email == email);

        if (user is null)
            return NotFound(ApiResponse.Fail("User not found"));

        return Ok(ApiResponse<int>.Ok(user.Id, "User ID retrieved successfully"));
    }
}