using System.ComponentModel.DataAnnotations;
namespace HRMS_GradProject.Entity
{
    public class LeaveRequest
    {
        [Key]
        public int Id { get; set; }
        public string leaveType { get; set; }
        public DateTime startDate {  get; set; }
        public DateTime endDate { get; set; }
        public string status { get; set;  }
        public string rejectionReason { get; set; }

        //Relationship
        public int employeeId { get; set; }
        public Employee employee { get; set; }

        public int approved_by { get; set; }
        public User user { get; set; }

        
        
    }
}
