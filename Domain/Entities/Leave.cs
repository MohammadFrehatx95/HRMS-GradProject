using Domain.Entities;
using Domain.Enums;

public class Leave
{
    public int Id { get; set; }

    public int EmployeeId { get; set; }
    public Employee Employee { get; set; } = null!;

    public LeaveType LeaveType { get; set; }
    public LeaveStatus Status { get; set; } = LeaveStatus.Pending;

    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int TotalDays { get; set; }

    public string Reason { get; set; } = string.Empty;

    public DateTime RequestedAt { get; set; } = DateTime.UtcNow;

    public int? ReviewedByUserId { get; set; }
    public User? ReviewedBy { get; set; }

    public DateTime? ReviewedAt { get; set; }
    public string? RejectionReason { get; set; }
}