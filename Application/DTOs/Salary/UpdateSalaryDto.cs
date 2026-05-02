using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Salary
{
  
    public class UpdateSalaryDto
    {
        [Range(0, double.MaxValue)]
        public decimal? BaseAmount { get; set; }

        [Range(0, double.MaxValue)]
        public decimal? Allowances { get; set; }

        [Range(0, double.MaxValue)]
        public decimal? Deductions { get; set; }

        public DateTime? EffectiveDate { get; set; }
    }
}
