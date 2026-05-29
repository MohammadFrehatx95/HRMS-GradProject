using Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.PayrollAdjustment;

public class CreateBulkPayrollAdjustmentDto
{
    [Required]
    public AdjustmentType Type { get; set; }
    
    [Required]
    public decimal Amount { get; set; }
    
    public string Reason { get; set; } = string.Empty;
    
    [Required]
    [Range(1, 12)]
    public int Month { get; set; }

    [Required]
    [Range(2000, 2100)]
    public int Year { get; set; }

    /// <summary>
    /// If null, applies to ALL active employees. 
    /// If provided, applies only to active employees in this department.
    /// </summary>
    public int? DepartmentId { get; set; }
}
