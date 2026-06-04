

namespace Application.DTOs.Attendance
{
   
    public class AttendanceDto
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; } = string.Empty;
        public string? EmployeeProfilePictureUrl { get; set; }
        public DateTime Date { get; set; }
        public TimeOnly? ClockIn { get; set; }
        public TimeOnly? ClockOut { get; set; }
        public string TotalHours { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
    }
}
