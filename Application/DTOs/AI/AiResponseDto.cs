
namespace Application.DTOs.AI;

public class AiResponseDto
{
    public string Reply { get; set; } = string.Empty;
    public string Model { get; set; } = string.Empty;
    public int Tokens { get; set; }
}