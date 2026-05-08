using Application.Common;
using Application.DTOs.Auth;
using Application.DTOs.User;
using Application.Interfaces;
using Application.Services;
using Application.Services.Interfaces;
using Domain.Entities;
using Domain.Interfaces;
using HRMS_API.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

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
    public IActionResult Me()
    {
        var result = new MeDto
        {
            Id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!),
            Email = User.FindFirstValue(ClaimTypes.Email)!,
            Role = User.FindFirstValue(ClaimTypes.Role)!,
            EmployeeId = User.FindFirstValue("employeeId")
        };

        return Ok(ApiResponse<MeDto>.Ok(result));
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