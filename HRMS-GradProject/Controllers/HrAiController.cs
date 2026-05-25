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
        var result = await aiService.ChatAsync(
            dto.Message,
            GetEmployeeId(),
            GetRole(),
            dto.Mode);

        return Ok(ApiResponse<AiResponseDto>.Ok(result));
    }

    // GET /api/ai/analyze-leave
    [HttpGet("analyze-leave")]
    public async Task<IActionResult> AnalyzeLeave()
    {
        var employeeId = GetEmployeeId();
        if (employeeId is null)
            return BadRequest(ApiResponse.Fail(
                "Your account is not linked to an employee profile"));

        var result = await aiService.AnalyzeLeaveAsync(employeeId.Value);
        return Ok(ApiResponse<AiResponseDto>.Ok(result));
    }

    // GET /api/ai/salary-insight
    [HttpGet("salary-insight")]
    public async Task<IActionResult> SalaryInsight()
    {
        var employeeId = GetEmployeeId();
        if (employeeId is null)
            return BadRequest(ApiResponse.Fail(
                "Your account is not linked to an employee profile"));

        var result = await aiService.SalaryInsightAsync(employeeId.Value);
        return Ok(ApiResponse<AiResponseDto>.Ok(result));
    }
}