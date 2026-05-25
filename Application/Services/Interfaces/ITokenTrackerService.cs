using Application.DTOs.AI;

namespace Application.Services.Interfaces;

public interface ITokenTrackerService
{
    Task AddTokensAsync(int tokens);
    TokenStatsDto GetStats();
}
