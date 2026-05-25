using System.Threading.Tasks;
using Application.Common;
using Application.DTOs.Meeting;

namespace Application.Services.Interfaces
{
    public interface IMeetingService
    {
        Task<PagedResult<MeetingDto>> GetAllAsync(int pageNumber, int pageSize);
        Task<PagedResult<MeetingDto>> GetByEmployeeIdAsync(int employeeId, int pageNumber, int pageSize);
        Task<MeetingDto> GetByIdAsync(int id);
        Task<MeetingDto> CreateAsync(CreateMeetingDto dto, int? organizerId);
        Task UpdateStatusAsync(int id, Domain.Enums.MeetingStatus newStatus);
        Task DeleteAsync(int id);
    }
}
