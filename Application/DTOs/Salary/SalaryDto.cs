using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Salary
{
    public class SalaryDto
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; } = string.Empty;
        public decimal BaseAmount { get; set; }
        public decimal Allowances { get; set; }
        public decimal Deductions { get; set; }
        public decimal GrossAmount { get; set; }
        public decimal NetAmount { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public DateTime EffectiveDate { get; set; }
    }
}
