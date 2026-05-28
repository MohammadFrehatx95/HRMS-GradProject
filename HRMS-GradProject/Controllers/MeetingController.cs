// HRMS-GradProject/Controllers/MeetingController.cs
using Application.Common;
using Application.DTOs.Meeting;
using Application.Services.Interfaces;
using HRMS_API.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HRMS_GradProject.Controllers;

[ApiController]
[Route("api/meetings")]
[Authorize]
public class MeetingController(IMeetingService meetingService) : ControllerBase
{
    private int GetUserId() =>
        int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    private int? GetEmployeeId()
    {
        var claim = User.FindFirstValue("employeeId");
        return int.TryParse(claim, out var id) ? id : null;
    }

    // GET /api/meetings
    [HttpGet]
    [Authorize(Roles = "Admin,HR")]
    public async Task<IActionResult> GetAll(
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10)
    {
        var result = await meetingService.GetAllAsync(pageNumber, pageSize);
        return Ok(ApiResponse<PagedResult<MeetingDto>>.Ok(result));
    }

    // GET /api/meetings/my
    [HttpGet("my")]
    public async Task<IActionResult> GetMy(
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10)
    {
        var employeeId = GetEmployeeId();
        if (employeeId is null)
            return BadRequest(ApiResponse.Fail(
                "Your account is not linked to an employee profile"));

        var result = await meetingService
            .GetMyMeetingsAsync(employeeId.Value, pageNumber, pageSize);
        return Ok(ApiResponse<PagedResult<MeetingDto>>.Ok(result));
    }

    // GET /api/meetings/{id}
    [HttpGet("{id}")]
    [Authorize(Roles = "Admin,HR")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await meetingService.GetByIdAsync(id)
                     ?? throw new KeyNotFoundException($"Meeting {id} not found");
        return Ok(ApiResponse<MeetingDto>.Ok(result));
    }

    [HttpPost]
    [Authorize(Roles = "Admin,HR")]
    [ValidateModel]
    public async Task<IActionResult> Create([FromBody] CreateMeetingDto dto)
    {
        var result = await meetingService.CreateAsync(GetUserId(), dto);
        return Ok(ApiResponse<IEnumerable<MeetingDto>>.Ok(result, "Meeting(s) scheduled successfully"));
    }

    // PUT /api/meetings/{id}
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin,HR")]
    [ValidateModel]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateMeetingDto dto)
    {
        var result = await meetingService.UpdateAsync(id, dto);
        return Ok(ApiResponse<MeetingDto>.Ok(result, "Meeting updated successfully"));
    }

    // PUT /api/meetings/{id}/cancel
    [HttpPut("{id}/cancel")]
    [Authorize(Roles = "Admin,HR")]
    public async Task<IActionResult> Cancel(int id)
    {
        var result = await meetingService.CancelAsync(id);
        return Ok(ApiResponse<MeetingDto>.Ok(result, "Meeting cancelled successfully"));
    }

    // PUT /api/meetings/{id}/complete
    [HttpPut("{id}/complete")]
    [Authorize(Roles = "Admin,HR")]
    public async Task<IActionResult> Complete(int id)
    {
        var result = await meetingService.CompleteAsync(id);
        return Ok(ApiResponse<MeetingDto>.Ok(result, "Meeting marked as completed"));
    }
}