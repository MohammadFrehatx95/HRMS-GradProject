using Microsoft.AspNetCore.Components.Web;
using System.ComponentModel.DataAnnotations;

namespace HRMS_GradProject.Entity
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }

        public string firstName { get; set; }

        public string lastName { get; set; }

        public string email { get; set; }

        public string phoneNumber { get; set; }

        public DateTime hireDate { get; set; }

        public bool isActive { get; set; }

        // Relationships

        public int DepartmentId { get; set; }

        public Department Department { get; set; }

        public int userId { get; set; }
        public User User { get; set; }



    }
}
