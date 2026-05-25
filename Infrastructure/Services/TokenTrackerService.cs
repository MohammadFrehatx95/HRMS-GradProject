using Application.DTOs.AI;
using Application.Services.Interfaces;
using Microsoft.AspNetCore.SignalR;

namespace Infrastructure.Services;

public class AiHub : Hub
{
    private readonly ITokenTrackerService _tokenTracker;

    public AiHub(ITokenTrackerService tokenTracker)
    {
        _tokenTracker = tokenTracker;
    }

    public override async Task OnConnectedAsync()
    {
        // Send the current global stats to the newly connected client
        await Clients.Caller.SendAsync("ReceiveTokenUpdate", _tokenTracker.GetStats());
        await base.OnConnectedAsync();
    }
}

public class TokenTrackerService : ITokenTrackerService, IDisposable
{
    private int _usedTokens = 0;
    private readonly int _maxTokensPerMinute = 14400; // Assuming 14.4K TPM limit for LLaMA 3
    private DateTime _nextResetTime;
    private readonly Timer _resetTimer;
    private readonly IHubContext<AiHub> _hubContext;

    public TokenTrackerService(IHubContext<AiHub> hubContext)
    {
        _hubContext = hubContext;
        _nextResetTime = DateTime.UtcNow.AddMinutes(1);
        
        // Reset tokens every 1 minute
        _resetTimer = new Timer(ResetTokens, null, TimeSpan.FromMinutes(1), TimeSpan.FromMinutes(1));
    }

    private void ResetTokens(object? state)
    {
        Interlocked.Exchange(ref _usedTokens, 0);
        _nextResetTime = DateTime.UtcNow.AddMinutes(1);
        
        // Broadcast reset event
        _ = BroadcastStatsAsync();
    }

    public async Task AddTokensAsync(int tokens)
    {
        if (tokens > 0)
        {
            Interlocked.Add(ref _usedTokens, tokens);
            await BroadcastStatsAsync();
        }
    }

    public TokenStatsDto GetStats()
    {
        var secondsUntilReset = (int)(_nextResetTime - DateTime.UtcNow).TotalSeconds;
        if (secondsUntilReset < 0) secondsUntilReset = 0;

        return new TokenStatsDto
        {
            UsedTokens = _usedTokens,
            MaxTokensPerMinute = _maxTokensPerMinute,
            SecondsUntilReset = secondsUntilReset
        };
    }

    private async Task BroadcastStatsAsync()
    {
        var stats = GetStats();
        // Fire and forget broadcast
        await _hubContext.Clients.All.SendAsync("ReceiveTokenUpdate", stats);
    }

    public void Dispose()
    {
        _resetTimer?.Dispose();
    }
}
