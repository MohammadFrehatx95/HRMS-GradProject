using Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.PayrollAdjustment;

public class CreatePayrollAdjustmentDto
{
    [Required]
    public int EmployeeId { get; set; }

    [Required]
    public AdjustmentType Type { get; set; }

    [Required]
    [Range(0.01, 10000)]
    public decimal Amount { get; set; }

    [Required]
    [MaxLength(250)]
    public string Reason { get; set; } = string.Empty;
}
