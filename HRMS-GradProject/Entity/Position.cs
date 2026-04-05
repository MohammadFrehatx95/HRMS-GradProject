using System.ComponentModel.DataAnnotations;

namespace HRMS_GradProject.Entity
{
    public class Position
    {
        [Key]

        public int Id { get; set; }
        public string title { get; set; }
        public decimal salary_min { get; set; }
        public decimal salary_max { get; set; }

        // Relationships
        public ICollection<Employee> Employees { get; set; } = new List<Employee>();
        public int DepartmentId { get; set; }
        public Department Department { get; set; }

    }
}
