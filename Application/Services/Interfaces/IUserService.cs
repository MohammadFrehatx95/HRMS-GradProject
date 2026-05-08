

using Application.Common;
using Application.DTOs.User;

namespace Application.Services.Interfaces
{
    public interface IUserService
    {
        Task<PagedResult<UserDto>> GetAllEmployeesAsync(int pageNumber, int pageSize);
        Task<UserDto?> GetByIdAsync(int id);
        Task<PagedResult<UserDto>> GetUnassignedEmployeeUsersAsync(int pageNumber, int pageSize);


    }

}
