using Application.Common;
using Application.DTOs.Leave;
using Application.Services.Interfaces;
using HRMS_API.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HRMS_GradProject.Controllers
{
    [ApiController]
    [Route("api/leaves")]
    [Authorize]
    public class LeaveController(ILeaveService leaveService) : ControllerBase
    {
        // GET /api/leaves?pageNumber=1&pageSize=10 
        [HttpGet]
        [Authorize(Roles = "Admin,HR")]
        public async Task<IActionResult> GetAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var result = await leaveService.GetAllAsync(pageNumber, pageSize);
            return Ok(ApiResponse<PagedResult<LeaveDto>>.Ok(result));
        }

        // GET /api/leaves/my     Employee
        [HttpGet("my")]
        public async Task<IActionResult> GetMyLeaves([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var employeeId = int.Parse(User.FindFirstValue("employeeId")!);
            var result = await leaveService.GetMyLeavesAsync(employeeId, pageNumber, pageSize);
            return Ok(ApiResponse<PagedResult<LeaveDto>>.Ok(result));
        }

        // GET /api/leaves/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await leaveService.GetByIdAsync(id)
                         ?? throw new KeyNotFoundException($"Leave {id} not found");
            return Ok(ApiResponse<LeaveDto>.Ok(result));
        }

        // POST /api/leaves → Employee
        [HttpPost]
        [ValidateModel]
        public async Task<IActionResult> Create([FromBody] CreateLeaveDto dto)
        {
            var employeeIdClaim = User.FindFirstValue("employeeId");

            if (string.IsNullOrWhiteSpace(employeeIdClaim) ||
                !int.TryParse(employeeIdClaim, out int employeeId))
            {
                return BadRequest(ApiResponse.Fail(
                    "Your account is not linked to an employee profile"));
            }

            var result = await leaveService.CreateAsync(employeeId, dto);
            return CreatedAtAction(nameof(GetById), new { id = result.Id },
                ApiResponse<LeaveDto>.Ok(result, "Leave request submitted successfully"));
        }

        // PUT /api/leaves/{id}/status → HR · Admin
        [HttpPut("{id}/status")]
        [Authorize(Roles = "Admin,HR")]
        [ValidateModel]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateLeaveStatusDto dto)
        {
            var reviewerUserId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var result = await leaveService.UpdateStatusAsync(id, reviewerUserId, dto);
            return Ok(ApiResponse<LeaveDto>.Ok(result, "Leave status updated successfully"));
        }

        // DELETE /api/leaves/{id} → Employee (Pending only)
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var employeeId = int.Parse(User.FindFirstValue("employeeId")!);
            await leaveService.DeleteAsync(id, employeeId);
            return Ok(ApiResponse.Ok("Leave request deleted successfully"));
        }
    }
}
