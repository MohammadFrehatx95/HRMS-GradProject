using System.Collections.Generic;

namespace Application.DTOs.Salary
{
    public class PayrollPreviewResultDto
    {
        public List<SalaryPreviewDto> Salaries { get; set; } = new List<SalaryPreviewDto>();
        public int EmployeeCount { get; set; }
        public decimal TotalCost { get; set; }
    }
}
