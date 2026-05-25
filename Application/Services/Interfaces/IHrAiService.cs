
using Application.DTOs.AI;

namespace Application.Services.Interfaces;

public interface IHrAiService
{
    Task<AiResponseDto> ChatAsync(
        string message,
        int? employeeId = null,
        string userRole = "Employee",
        Domain.Enums.AiMode mode = Domain.Enums.AiMode.Normal);

    Task<AiResponseDto> AnalyzeLeaveAsync(int employeeId);
    Task<AiResponseDto> SalaryInsightAsync(int employeeId);
}