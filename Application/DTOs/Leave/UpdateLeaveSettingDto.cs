using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.Leave;

public class UpdateLeaveSettingDto
{
    [Range(1, 12)]
    public int ResetMonth { get; set; }
    
    [Range(1, 31)]
    public int ResetDay { get; set; }
    
    [Range(0, 365)]
    public int DefaultAnnualLeave { get; set; }
    
    [Range(0, 365)]
    public int DefaultSickLeave { get; set; }
    
    [Range(0, 365)]
    public int DefaultEmergencyLeave { get; set; }
}
