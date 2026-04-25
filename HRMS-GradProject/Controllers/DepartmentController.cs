using Application.Common;
using Application.DTOs.Department;
using Application.Services.Interfaces;
using HRMS_API.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HRMS_API.Controllers;

[ApiController]
[Route("api/departments")]
[Authorize]
public class DepartmentController(IDepartmentService departmentService) : ControllerBase
{
    // GET api/departments
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var departments = await departmentService.GetAllAsync();
        return Ok(ApiResponse<List<DepartmentDto>>.Ok(departments));
    }

    // GET api/departments/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var department = await departmentService.GetByIdAsync(id);

        return department is null
            ? NotFound(ApiResponse.Fail($"Department {id} not found"))
            : Ok(ApiResponse<DepartmentDto>.Ok(department));
    }

    // POST api/departments
    [HttpPost]
    [Authorize(Roles = "Admin")]
    [ValidateModel]
    public async Task<IActionResult> Create([FromBody] CreateDepartmentDto dto)
    {
        var department = await departmentService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = department.Id },
            ApiResponse<DepartmentDto>.Ok(department, "Department created successfully"));
    }

    // PUT api/departments/5
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    [ValidateModel]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateDepartmentDto dto)
    {
        var department = await departmentService.UpdateAsync(id, dto);

        return department is null
            ? NotFound(ApiResponse.Fail($"Department {id} not found"))
            : Ok(ApiResponse<DepartmentDto>.Ok(department, "Department updated successfully"));
    }

    // DELETE api/departments/5
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await departmentService.DeleteAsync(id);

        return !result
            ? NotFound(ApiResponse.Fail($"Department {id} not found"))
            : Ok(ApiResponse.Ok("Department deleted successfully"));
    }
}