using System.ComponentModel.DataAnnotations;

namespace HRMS_GradProject.Entity
{
    public class Department
    {
        [Key]
        public int Id { get; set; }

        public string name { get; set; }

        public string location { get; set; }

        // Relationships
        public ICollection<Employee> Employees { get; set; } 





    }
}
