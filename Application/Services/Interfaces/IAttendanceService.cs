using Application.Common;
using Application.DTOs.Attendance;


namespace Application.Services.Interfaces
{
    
    public interface IAttendanceService
    {
        Task<PagedResult<AttendanceDto>> GetAllAsync(int pageNumber, int pageSize);
        Task<PagedResult<AttendanceDto>> GetMyAttendanceAsync(int employeeId, int pageNumber, int pageSize);
        Task<AttendanceDto?> GetByIdAsync(int id);
        Task<AttendanceDto> ClockInAsync(int employeeId, ClockInDto dto);
        Task<AttendanceDto> ClockOutAsync(int employeeId, ClockOutDto dto);
    }
}
