using Domain.Enums;

namespace Domain.Entities;

public class PayrollAdjustment
{
    public int Id { get; set; }
    public int EmployeeId { get; set; }
    public Employee Employee { get; set; } = null!;
    public AdjustmentType Type { get; set; }
    public decimal Amount { get; set; }
    public string Reason { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public bool IsApplied { get; set; }
    public int? AppliedToSalaryId { get; set; }
    public Salary? AppliedToSalary { get; set; }
}
