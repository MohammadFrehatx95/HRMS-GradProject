namespace Application.DTOs.AI;

public class TokenStatsDto
{
    public int UsedTokens { get; set; }
    public int MaxTokensPerMinute { get; set; }
    public int SecondsUntilReset { get; set; }
}
