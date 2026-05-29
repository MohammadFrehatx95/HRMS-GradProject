using Application.DTOs.Leave;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services.Implementations;

public class LeaveSettingService(IUnitOfWork unitOfWork, IMapper mapper) : ILeaveSettingService
{
    public async Task<LeaveSettingDto> GetSettingsAsync()
    {
        var settings = await unitOfWork.Repository<LeaveSetting>().GetByIdAsync(1);
        if (settings == null)
        {
            // Seed default if not exists just in case
            settings = new LeaveSetting
            {
                Id = 1,
                ResetMonth = 1,
                ResetDay = 1,
                DefaultAnnualLeave = 14,
                DefaultSickLeave = 14,
                DefaultEmergencyLeave = 3
            };
            await unitOfWork.Repository<LeaveSetting>().AddAsync(settings);
            await unitOfWork.SaveChangesAsync();
        }

        return mapper.Map<LeaveSettingDto>(settings);
    }

    public async Task<bool> UpdateSettingsAsync(UpdateLeaveSettingDto dto)
    {
        var settings = await unitOfWork.Repository<LeaveSetting>().GetByIdAsync(1);
        if (settings == null)
            return false;

        mapper.Map(dto, settings);
        unitOfWork.Repository<LeaveSetting>().Update(settings);
        return await unitOfWork.SaveChangesAsync() > 0;
    }
}
