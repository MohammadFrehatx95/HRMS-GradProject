namespace Application.DTOs.Leave;

public class LeaveSettingDto
{
    public int ResetMonth { get; set; }
    public int ResetDay { get; set; }
    public int DefaultAnnualLeave { get; set; }
    public int DefaultSickLeave { get; set; }
    public int DefaultEmergencyLeave { get; set; }
    public DateTime? LastResetDate { get; set; }
}
