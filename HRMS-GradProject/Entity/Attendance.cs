using System.ComponentModel.DataAnnotations;

namespace HRMS_GradProject.Entity
{
    public class Attendance
    {
        [Key]
        public int Id { get; set; }
        public DateTime date {  get; set; }
        public TimeOnly clock_in {  get; set; }
        public TimeOnly clock_out { get; set; }


        // Relationships
        public int employeeId { get; set; }
        public Employee employee { get; set; }

        
    }
}
