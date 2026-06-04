using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.Salary
{
    public class GeneratePayrollDto
    {
        [Required]
        [Range(1, 12)]
        public int Month { get; set; }

        [Required]
        [Range(2000, 2100)]
        public int Year { get; set; }

        public int? DepartmentId { get; set; }

        public List<int> ExcludedEmployeeIds { get; set; } = new();
    }
}
