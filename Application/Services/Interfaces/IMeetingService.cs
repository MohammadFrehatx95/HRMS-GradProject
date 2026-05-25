using Application.Common;
using Application.DTOs.Meeting;

namespace Application.Services.Interfaces;

public interface IMeetingService
{
    Task<PagedResult<MeetingDto>> GetAllAsync(int pageNumber, int pageSize);
    Task<PagedResult<MeetingDto>> GetMyMeetingsAsync(int employeeId, int pageNumber, int pageSize);
    Task<MeetingDto?> GetByIdAsync(int id);
    Task<MeetingDto> CreateAsync(int organizerUserId, CreateMeetingDto dto);
    Task<MeetingDto> UpdateAsync(int id, UpdateMeetingDto dto);
    Task<MeetingDto> CancelAsync(int id);
    Task<MeetingDto> CompleteAsync(int id);
}