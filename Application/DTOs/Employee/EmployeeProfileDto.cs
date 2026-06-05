namespace Application.DTOs.Employee;

public class EmployeeProfileDto
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string DepartmentName { get; set; } = string.Empty;
    public string PositionTitle { get; set; } = string.Empty;
    public DateTime HireDate { get; set; }
    public string? ProfilePictureUrl { get; set; }
    public string Role { get; set; } = string.Empty;
    public int? AnnualLeaveBalance { get; set; }
    public int? SickLeaveBalance { get; set; }
    public int? EmergencyLeaveBalance { get; set; }
}