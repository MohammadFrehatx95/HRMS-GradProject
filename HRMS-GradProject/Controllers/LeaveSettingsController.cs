using Application.Common;
using Application.DTOs.Leave;
using Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HRMS_API.Controllers;

[ApiController]
[Route("api/leavesettings")]
[Authorize(Roles = "Admin,HR")]
public class LeaveSettingsController(ILeaveSettingService leaveSettingService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetSettings()
    {
        var settings = await leaveSettingService.GetSettingsAsync();
        return Ok(ApiResponse<LeaveSettingDto>.Ok(settings));
    }

    [HttpPut]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateSettings([FromBody] UpdateLeaveSettingDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ApiResponse.Fail("Invalid data"));

        var success = await leaveSettingService.UpdateSettingsAsync(dto);
        if (!success)
            return BadRequest(ApiResponse.Fail("Failed to update settings"));

        return Ok(ApiResponse.Ok("Settings updated successfully"));
    }
}
