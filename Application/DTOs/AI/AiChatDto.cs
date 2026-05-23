
using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.AI;

public class AiChatDto
{
    [Required]
    [StringLength(1000, MinimumLength = 2)]
    public string Message { get; set; } = string.Empty;
}