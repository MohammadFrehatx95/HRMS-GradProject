using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.Position;

public class UpdatePositionDto
{
    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [Range(0, double.MaxValue, ErrorMessage = "SalaryMin must be positive")]
    public decimal SalaryMin { get; set; }

    [Required]
    [Range(0, double.MaxValue, ErrorMessage = "SalaryMax must be positive")]
    public decimal SalaryMax { get; set; }

    [Required]
    public int DepartmentId { get; set; }
}