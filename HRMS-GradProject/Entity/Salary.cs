using System.ComponentModel.DataAnnotations;
namespace HRMS_GradProject.Entity
{
    public class Salary
    {
        [Key]
        public int Id { get; set; }
        public Decimal base_amount { get; set; }
        public Decimal allowances { get; set; }
        public Decimal deductions { get; set; }
        public Decimal gross_amount { get; set; }
        public Decimal net_amount { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public decimal effective_date { get; set; }

        //Relationship
        public int employeeId { get; set; }
        public Employee employee { get; set; }




    }
}
