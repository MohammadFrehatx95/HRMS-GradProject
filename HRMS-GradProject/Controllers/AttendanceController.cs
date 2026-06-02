using Application.Common;
using Application.DTOs.Attendance;
using Application.Services.Interfaces;
using HRMS_API.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HRMS_GradProject.Controllers
{
    
    [ApiController]
    [Route("api/attendance")]
    [Authorize]
    public class AttendanceController(IAttendanceService attendanceService) : ControllerBase
    {
        // GET /api/attendance → HR · Admin
        [HttpGet]
        [Authorize(Roles = "Admin,HR")]
        public async Task<IActionResult> GetAll(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] DateTime? date = null,
            [FromQuery] string? searchQuery = null,
            [FromQuery] string? status = null)
        {
            var result = await attendanceService.GetAllAsync(pageNumber, pageSize, date, searchQuery, status);
            return Ok(ApiResponse<PagedResult<AttendanceDto>>.Ok(result));
        }

        // GET /api/attendance/my → Employee
        [HttpGet("my")]
        public async Task<IActionResult> GetMyAttendance( [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10, [FromQuery] DateTime? date = null, [FromQuery] string? searchQuery = null, [FromQuery] string? status = null)
        {
            var employeeIdClaim = User.FindFirstValue("employeeId");

            if (string.IsNullOrWhiteSpace(employeeIdClaim) || !int.TryParse(employeeIdClaim, out int employeeId))
            {
                return BadRequest(ApiResponse.Fail("Your account is not linked to an employee profile"));
            }
            var result = await attendanceService.GetMyAttendanceAsync(employeeId, pageNumber, pageSize, date, searchQuery, status);

            return Ok(ApiResponse<PagedResult<AttendanceDto>>.Ok(result));
        }

        // GET /api/attendance/{id}
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,HR")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await attendanceService.GetByIdAsync(id) ?? throw new KeyNotFoundException($"Attendance {id} not found");

            return Ok(ApiResponse<AttendanceDto>.Ok(result));
        }

        // POST /api/attendance/clockin → Employee
        [HttpPost("clockin")]
        [ValidateModel]
        public async Task<IActionResult> ClockIn([FromBody] ClockInDto dto)
        {
            var employeeIdClaim = User.FindFirstValue("employeeId");

            if (string.IsNullOrWhiteSpace(employeeIdClaim) ||
                !int.TryParse(employeeIdClaim, out int employeeId))
                return BadRequest(ApiResponse.Fail(
                    "Your account is not linked to an employee profile"));

            var result = await attendanceService.ClockInAsync(employeeId, dto);
            return CreatedAtAction(nameof(GetById), new { id = result.Id },
                ApiResponse<AttendanceDto>.Ok(result, "Clocked in successfully"));
        }

        [HttpPut("clockout")]
        [ValidateModel]
        public async Task<IActionResult> ClockOut([FromBody] ClockOutDto dto)
        {
            var employeeIdClaim = User.FindFirstValue("employeeId");

            if (string.IsNullOrWhiteSpace(employeeIdClaim) ||
                !int.TryParse(employeeIdClaim, out int employeeId))
                return BadRequest(ApiResponse.Fail(
                    "Your account is not linked to an employee profile"));

            var result = await attendanceService.ClockOutAsync(employeeId, dto);
            return Ok(ApiResponse<AttendanceDto>.Ok(result, "Clocked out successfully"));
        }
    }
}
