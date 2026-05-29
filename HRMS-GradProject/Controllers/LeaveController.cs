using Application.Common;
using Application.DTOs.Leave;
using Application.Services.Interfaces;
using HRMS_API.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HRMS_GradProject.Controllers
{
    [ApiController]
    [Route("api/leaves")]
    [Authorize]
    public class LeaveController(ILeaveService leaveService) : ControllerBase
    {
        private int? GetEmployeeId()
        {
            var claim = User.FindFirstValue("employeeId");
            return int.TryParse(claim, out var id) ? id : null;
        }

        // GET /api/leaves?pageNumber=1&pageSize=10 → Admin, HR
        [HttpGet]
        [Authorize(Roles = "Admin,HR")]
        public async Task<IActionResult> GetAll(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10)
        {
            var result = await leaveService.GetAllAsync(pageNumber, pageSize);
            return Ok(ApiResponse<PagedResult<LeaveDto>>.Ok(result));
        }

        // GET /api/leaves/my → Employee
        [HttpGet("my")]
        public async Task<IActionResult> GetMyLeaves(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10)
        {
            var employeeId = GetEmployeeId();
            if (employeeId is null)
                return BadRequest(ApiResponse.Fail("Your account is not linked to an employee profile"));

            var result = await leaveService.GetMyLeavesAsync(employeeId.Value, pageNumber, pageSize);
            return Ok(ApiResponse<PagedResult<LeaveDto>>.Ok(result));
        }

        // GET /api/leaves/my/{id} → Employee 
        
        [HttpGet("my/{id}")]
        public async Task<IActionResult> GetMyById(int id)
        {
            var employeeId = GetEmployeeId();
            if (employeeId is null)
                return BadRequest(ApiResponse.Fail("Your account is not linked to an employee profile"));

            var result = await leaveService.GetMyByIdAsync(id, employeeId.Value);

            return result is null
                ? NotFound(ApiResponse.Fail($"Leave {id} not found"))
                : Ok(ApiResponse<LeaveDto>.Ok(result));
        }

        // GET /api/leaves/{id} → Admin, HR
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,HR")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await leaveService.GetByIdAsync(id)
                         ?? throw new KeyNotFoundException($"Leave {id} not found");
            return Ok(ApiResponse<LeaveDto>.Ok(result));
        }

        // POST /api/leaves → Employee
        [HttpPost]
        [ValidateModel]
        public async Task<IActionResult> Create([FromForm] CreateLeaveDto dto, Microsoft.AspNetCore.Http.IFormFile? attachment)
        {
            var employeeId = GetEmployeeId();
            if (employeeId is null)
                return BadRequest(ApiResponse.Fail("Your account is not linked to an employee profile"));
            
            Stream? fileStream = null;
            string? fileName = null;

            if (attachment != null && attachment.Length > 0)
            {
                fileStream = attachment.OpenReadStream();
                fileName = attachment.FileName;
            }

            var result = await leaveService.CreateAsync(employeeId.Value, dto, fileStream, fileName);
            return CreatedAtAction(nameof(GetMyById), new { id = result.Id },
                ApiResponse<LeaveDto>.Ok(result, "Leave request submitted successfully"));
        }

        // PUT /api/leaves/{id}/status → Admin, HR
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
            var employeeId = GetEmployeeId();
            if (employeeId is null)
                return BadRequest(ApiResponse.Fail("Your account is not linked to an employee profile"));

            await leaveService.DeleteAsync(id, employeeId.Value);
            return Ok(ApiResponse.Ok("Leave request deleted successfully"));
        }
    }
}