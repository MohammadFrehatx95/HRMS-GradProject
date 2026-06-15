using Application.Common;
using Application.DTOs.AI;
using Application.Services.Interfaces;
using HRMS_API.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HRMS_GradProject.Controllers;

[ApiController]
[Route("api/ai")]
[Authorize]
public class HrAiController(IHrAiService aiService) : ControllerBase
{
    private int? GetEmployeeId()
    {
        var claim = User.FindFirstValue("employeeId");
        return int.TryParse(claim, out var id) ? id : null;
    }

    private string GetRole() =>
        User.FindFirstValue(ClaimTypes.Role) ?? "Employee";

    // POST /api/ai/chat
    [HttpPost("chat")]
    [ValidateModel]
    public async Task<IActionResult> Chat([FromBody] AiChatDto dto)
    {
        var role = GetRole();
        if (dto.Mode == Domain.Enums.AiMode.DeepThink && role == "Employee")
            return StatusCode(403, Application.Common.ApiResponse.Fail("Deep Think mode is not available for your account."));

        var result = await aiService.ChatAsync(
            dto.Message,
            GetEmployeeId(),
            role,
            dto.Mode,
            dto.History);

        return Ok(ApiResponse<AiResponseDto>.Ok(result));
    }


}