using System.ComponentModel.DataAnnotations;

namespace Domain.Entities;

public class LeaveSetting
{
    [Key]
    public int Id { get; set; } = 1; // Single row table

    [Range(1, 12)]
    public int ResetMonth { get; set; } = 1; // Default: January

    [Range(1, 31)]
    public int ResetDay { get; set; } = 1; // Default: 1st

    [Range(0, 365)]
    public int DefaultAnnualLeave { get; set; } = 14;

    [Range(0, 365)]
    public int DefaultSickLeave { get; set; } = 14;

    [Range(0, 365)]
    public int DefaultEmergencyLeave { get; set; } = 3;
    
    public DateTime? LastResetDate { get; set; }
}
