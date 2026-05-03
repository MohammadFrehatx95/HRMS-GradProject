using Application.Common;
using Application.DTOs.Salary;
using Application.Services.Interfaces;
using HRMS_API.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HRMS_GradProject.Controllers
{
    // HRMS_API/Controllers/SalaryController.cs
    [ApiController]
    [Route("api/salaries")]
    [Authorize]
    public class SalaryController(ISalaryService salaryService) : ControllerBase
    {
        // GET /api/salaries → Admin · HR
        [HttpGet]
        [Authorize(Roles = "Admin,HR")]
        public async Task<IActionResult> GetAll(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10)
        {
            var result = await salaryService.GetAllAsync(pageNumber, pageSize);
            return Ok(ApiResponse<PagedResult<SalaryDto>>.Ok(result));
        }

        // GET /api/salaries/my → Employee
        [HttpGet("my")]
        public async Task<IActionResult> GetMy(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10)
        {
            var employeeIdClaim = User.FindFirstValue("employeeId");

            if (string.IsNullOrWhiteSpace(employeeIdClaim) ||
                !int.TryParse(employeeIdClaim, out int employeeId))
                return BadRequest(ApiResponse.Fail(
                    "Your account is not linked to an employee profile"));

            var result = await salaryService.GetMyAsync(employeeId, pageNumber, pageSize);
            return Ok(ApiResponse<PagedResult<SalaryDto>>.Ok(result));
        }

        // GET /api/salaries/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await salaryService.GetByIdAsync(id)
                         ?? throw new KeyNotFoundException($"Salary {id} not found");

            return Ok(ApiResponse<SalaryDto>.Ok(result));
        }

        // POST /api/salaries → Admin
        [HttpPost]
        [Authorize(Roles = "Admin")]
        [ValidateModel]
        public async Task<IActionResult> Create([FromBody] CreateSalaryDto dto)
        {
            var result = await salaryService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = result.Id },
                ApiResponse<SalaryDto>.Ok(result, "Salary created successfully"));
        }

        // PUT /api/salaries/{id} → Admin
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        [ValidateModel]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateSalaryDto dto)
        {
            var result = await salaryService.UpdateAsync(id, dto);
            return Ok(ApiResponse<SalaryDto>.Ok(result, "Salary updated successfully"));
        }

        // DELETE /api/salaries/{id} → Admin
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            await salaryService.DeleteAsync(id);
            return Ok(ApiResponse.Ok("Salary deleted successfully"));
        }
    }
}
