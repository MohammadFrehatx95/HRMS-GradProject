using Application.Common;
using Application.DTOs.PayrollAdjustment;
using Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HRMS_API.Controllers;

[ApiController]
[Route("api/payroll-adjustments")]
public class PayrollAdjustmentController(IPayrollAdjustmentService service) : ControllerBase
{
    [HttpGet]
    [Authorize(Roles = "Admin,HR")]
    public async Task<IActionResult> GetAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
    {
        var result = await service.GetAllAsync(pageNumber, pageSize);
        return Ok(ApiResponse<PagedResult<PayrollAdjustmentDto>>.Ok(result));
    }

    [HttpGet("employee/{employeeId}")]
    [Authorize(Roles = "Admin,HR")]
    public async Task<IActionResult> GetByEmployeeId(int employeeId, [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
    {
        var result = await service.GetByEmployeeIdAsync(employeeId, pageNumber, pageSize);
        return Ok(ApiResponse<PagedResult<PayrollAdjustmentDto>>.Ok(result));
    }

    [HttpPost]
    [Authorize(Roles = "Admin,HR")]
    public async Task<IActionResult> Create([FromBody] CreatePayrollAdjustmentDto dto)
    {
        var success = await service.AddAdjustmentAsync(dto);
        if (!success) return BadRequest(ApiResponse.Fail("Failed to create adjustment or employee not found."));
        return Ok(ApiResponse.Ok("Adjustment created successfully."));
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin,HR")]
    public async Task<IActionResult> Delete(int id)
    {
        var success = await service.DeleteAdjustmentAsync(id);
        if (!success) return BadRequest(ApiResponse.Fail("Failed to delete or adjustment is already applied."));
        return Ok(ApiResponse.Ok("Adjustment deleted successfully."));
    }
}
