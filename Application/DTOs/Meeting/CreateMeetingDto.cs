// Application/DTOs/Meeting/CreateMeetingDto.cs
using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.Meeting;

public class CreateMeetingDto
{
    [Required]
    [StringLength(150, MinimumLength = 3)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [StringLength(1000, MinimumLength = 10)]
    public string Reason { get; set; } = string.Empty;

    [Required]
    public DateTime ScheduledAt { get; set; }

    [Range(15, 480)]
    public int DurationMinutes { get; set; } = 30;

    [Required]
    public List<int> EmployeeIds { get; set; } = new();

    [StringLength(500)]
    public string? Notes { get; set; }
}