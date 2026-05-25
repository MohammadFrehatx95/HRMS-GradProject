using System.Threading.Tasks;
using Application.Common;
using Application.DTOs.Announcement;

namespace Application.Services.Interfaces
{
    public interface IAnnouncementService
    {
        Task<PagedResult<AnnouncementDto>> GetAllAsync(int pageNumber, int pageSize, int? currentEmployeeId = null, bool isAdminOrHR = false);
        Task<AnnouncementDto> CreateAsync(CreateAnnouncementDto dto, int? authorId);
        Task<bool> DeleteAsync(int id);
    }
}
