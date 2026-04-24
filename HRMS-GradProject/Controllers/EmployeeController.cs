using Application.Common;
using Application.DTOs.Employee;
using Application.Services.Interfaces;
using HRMS_API.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HRMS_API.Controllers;

[ApiController]
[Route("api/employees")]
public class EmployeeController(IEmployeeService employeeService) : ControllerBase
{
    // GET api/employees?pageNumber=1&pageSize=10
    [HttpGet]
    public async Task<IActionResult> GetAll( [FromQuery] int pageNumber = 1,[FromQuery] int pageSize = 10)
    {
        var employees = await employeeService.GetAllAsync(pageNumber, pageSize);

        return Ok(ApiResponse<PagedResult<EmployeeDto>>.Ok(employees));
    }

    // GET api/employees/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var employee = await employeeService.GetByIdAsync(id);


        return employee is null
            ? NotFound(ApiResponse.Fail($"Employee {id} not found"))
            : Ok(ApiResponse<EmployeeDto>.Ok(employee));
    }

    // GET api/employees/5/profile
    [HttpGet("{id}/profile")]
    public async Task<IActionResult> GetProfile(int id)
    {
        var profile = await employeeService.GetProfileAsync(id);



        return profile is null
            ? NotFound(ApiResponse.Fail($"Employee {id} not found"))
            : Ok(ApiResponse<EmployeeProfileDto>.Ok(profile));
    }

    // GET api/employees/me
    [HttpGet("me")]
    [Authorize]
    public async Task<IActionResult> Me()
    {
        var employeeId = User.FindFirstValue("employeeId");

        if (string.IsNullOrEmpty(employeeId))
        {
            return NotFound(ApiResponse.Fail("No employee linked to this account"));
        }

        var employee = await employeeService.GetProfileAsync(int.Parse(employeeId));


        return employee is null
            ? NotFound(ApiResponse.Fail("Employee not found"))
            : Ok(ApiResponse<EmployeeProfileDto>.Ok(employee));
    }

    // POST api/employees
    [HttpPost]
    [ValidateModel]
    public async Task<IActionResult> Create([FromBody] CreateEmployeeDto dto)
    {
        var employee = await employeeService.CreateAsync(dto);


        return CreatedAtAction(nameof(GetById), new { id = employee.Id },
            ApiResponse<EmployeeDto>.Ok(employee, "Employee created successfully"));
    }

    // PUT api/employees/5
    [HttpPut("{id}")]
    [ValidateModel]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateEmployeeDto dto)
    {
        var employee = await employeeService.UpdateAsync(id, dto);


        return employee is null
            ? NotFound(ApiResponse.Fail($"Employee {id} not found"))
            : Ok(ApiResponse<EmployeeDto>.Ok(employee, "Employee updated successfully"));
    }

    // DELETE api/employees/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {

        var result = await employeeService.DeleteAsync(id);


        return !result
            ? NotFound(ApiResponse.Fail($"Employee {id} not found"))
            : Ok(ApiResponse.Ok("Employee deleted successfully"));
    }
}



//repository pattern 
// Generic repository => CRUD operations for all entities  => Clean Artitecture 
// Auto Mapper => DTOs => Data Transfer Objects => Avoid exposing internal data structures => Security and flexibility


