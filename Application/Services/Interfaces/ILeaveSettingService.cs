using Application.DTOs.Leave;

namespace Application.Services.Interfaces;

public interface ILeaveSettingService
{
    Task<LeaveSettingDto> GetSettingsAsync();
    Task<bool> UpdateSettingsAsync(UpdateLeaveSettingDto dto);
}
