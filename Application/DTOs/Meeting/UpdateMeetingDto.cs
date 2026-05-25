
using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.Meeting;

public class UpdateMeetingDto
{
    [StringLength(150, MinimumLength = 3)]
    public string? Title { get; set; }

    [StringLength(1000, MinimumLength = 10)]
    public string? Reason { get; set; }

    public DateTime? ScheduledAt { get; set; }

    [Range(15, 480)]
    public int? DurationMinutes { get; set; }

    [StringLength(500)]
    public string? Notes { get; set; }
}