namespace Application.DTOs.Auth;

public class MeDto
{
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string? EmployeeId { get; set; }
    public string? ProfilePictureUrl { get; set; }
    public string? PendingProfilePictureUrl { get; set; }

    public int? AnnualLeaveBalance { get; set; }
    public int? SickLeaveBalance { get; set; }
    public int? EmergencyLeaveBalance { get; set; }
}