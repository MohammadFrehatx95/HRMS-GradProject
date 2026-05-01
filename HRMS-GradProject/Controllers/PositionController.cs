using Application.Common;
using Application.DTOs.Position;
using Application.Services.Interfaces;
using HRMS_API.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HRMS_API.Controllers;

[ApiController]
[Route("api/positions")]
[Authorize]
public class PositionController(IPositionService positionService) : ControllerBase
{
    // GET api/positions
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var positions = await positionService.GetAllAsync();

        return Ok(ApiResponse<List<PositionDto>>.Ok(positions));
    }

    // GET api/positions/department/2
    [HttpGet("department/{departmentId}")]
    public async Task<IActionResult> GetByDepartment(int departmentId)
    {
        var positions = await positionService.GetByDepartmentAsync(departmentId);

        return Ok(ApiResponse<List<PositionDto>>.Ok(positions));
    }

    // GET api/positions/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var position = await positionService.GetByIdAsync(id);

        return position is null
            ? NotFound(ApiResponse.Fail($"Position {id} not found"))
            : Ok(ApiResponse<PositionDto>.Ok(position));
    }

    // POST api/positions
    [HttpPost]
    [Authorize(Roles = "Admin")]
    [ValidateModel]
    public async Task<IActionResult> Create([FromBody] CreatePositionDto dto)
    {
        var position = await positionService.CreateAsync(dto);

        return CreatedAtAction(nameof(GetById), new { id = position.Id },
            ApiResponse<PositionDto>.Ok(position, "Position created successfully"));
    }

    // PUT api/positions/5
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    [ValidateModel]
    public async Task<IActionResult> Update(int id, [FromBody] UpdatePositionDto dto)
    {
        var position = await positionService.UpdateAsync(id, dto);

        return position is null
            ? NotFound(ApiResponse.Fail($"Position {id} not found"))
            : Ok(ApiResponse<PositionDto>.Ok(position, "Position updated successfully"));
    }

    // DELETE api/positions/5
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await positionService.DeleteAsync(id);

        return !result
            ? NotFound(ApiResponse.Fail($"Position {id} not found"))
            : Ok(ApiResponse.Ok("Position deleted successfully"));
    }
}