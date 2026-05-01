using Application.DTOs.Position;

namespace Application.Services.Interfaces;

public interface IPositionService
{
    Task<List<PositionDto>> GetAllAsync();
    Task<List<PositionDto>> GetByDepartmentAsync(int departmentId);
    Task<PositionDto?> GetByIdAsync(int id);
    Task<PositionDto> CreateAsync(CreatePositionDto dto);
    Task<PositionDto?> UpdateAsync(int id, UpdatePositionDto dto);
    Task<bool> DeleteAsync(int id);
}