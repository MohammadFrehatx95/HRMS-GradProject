using Application.Common;
using Application.DTOs.Leave;

namespace Application.Services.Interfaces
{
    public interface ILeaveService
    {
        Task<PagedResult<LeaveDto>> GetAllAsync(int pageNumber, int pageSize);
        Task<PagedResult<LeaveDto>> GetMyLeavesAsync(int employeeId, int pageNumber, int pageSize);
        Task<LeaveDto?> GetByIdAsync(int id);

        // FIX: endpoint خاص للموظف يجيب طلبه بالـ ID مع التحقق من الملكية
        Task<LeaveDto?> GetMyByIdAsync(int leaveId, int employeeId);

        Task<LeaveDto> CreateAsync(int employeeId, CreateLeaveDto dto, Stream? fileStream = null, string? fileName = null);
        Task<LeaveDto> UpdateStatusAsync(int leaveId, int reviewerUserId, UpdateLeaveStatusDto dto);
        Task DeleteAsync(int leaveId, int employeeId);
    }
}