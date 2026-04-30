using Application.Common;
using Application.DTOs.Leave;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.Interfaces
{
    public interface ILeaveService
    {
        Task<PagedResult<LeaveDto>> GetAllAsync(int pageNumber, int pageSize);
        Task<PagedResult<LeaveDto>> GetMyLeavesAsync(int employeeId, int pageNumber, int pageSize);
        Task<LeaveDto?> GetByIdAsync(int id);
        Task<LeaveDto> CreateAsync(int employeeId, CreateLeaveDto dto);
        Task<LeaveDto> UpdateStatusAsync(int leaveId, int reviewerUserId, UpdateLeaveStatusDto dto);
        Task DeleteAsync(int leaveId, int employeeId);
    }
}
