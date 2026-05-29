
using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.AI;

public class AiChatDto
{
    [Required]
    [StringLength(1000, MinimumLength = 2)]
    public string Message { get; set; } = string.Empty;

    public Domain.Enums.AiMode Mode { get; set; } = Domain.Enums.AiMode.Normal;

    public List<ChatMessageDto> History { get; set; } = new();
}