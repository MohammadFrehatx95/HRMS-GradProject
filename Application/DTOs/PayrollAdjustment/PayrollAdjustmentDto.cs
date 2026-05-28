using Domain.Enums;

namespace Application.DTOs.PayrollAdjustment;

public class PayrollAdjustmentDto
{
    public int Id { get; set; }
    public int EmployeeId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public string? EmployeeProfilePictureUrl { get; set; }
    public AdjustmentType Type { get; set; }
    public decimal Amount { get; set; }
    public string Reason { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public bool IsApplied { get; set; }
}
