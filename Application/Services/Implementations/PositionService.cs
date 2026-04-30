using Application.DTOs.Position;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.Implementations;

public class PositionService(IUnitOfWork uow, IMapper mapper) : IPositionService
{
    public async Task<List<PositionDto>> GetAllAsync()
    {
        var positions = await uow.Repository<Position>()
                                 .GetAllQueryable()
                                 .Include(p => p.Department)
                                 .Include(p => p.Employees)
                                 .ToListAsync();

        return mapper.Map<List<PositionDto>>(positions);
    }

    public async Task<List<PositionDto>> GetByDepartmentAsync(int departmentId)
    {
        var positions = await uow.Repository<Position>()
                                 .GetAllQueryable()
                                 .Include(p => p.Department)
                                 .Include(p => p.Employees)
                                 .Where(p => p.DepartmentId == departmentId)
                                 .ToListAsync();

        return mapper.Map<List<PositionDto>>(positions);
    }

    public async Task<PositionDto?> GetByIdAsync(int id)
    {
        var position = await uow.Repository<Position>()
                                .GetAllQueryable()
                                .Include(p => p.Department)
                                .Include(p => p.Employees)
                                .FirstOrDefaultAsync(p => p.Id == id);

        return position is null ? null : mapper.Map<PositionDto>(position);
    }

    public async Task<PositionDto> CreateAsync(CreatePositionDto dto)
    {
        var departmentExists = await uow.Repository<Department>()
                                        .GetAllQueryable()
                                        .AnyAsync(d => d.Id == dto.DepartmentId);

        if (!departmentExists)
        {
            throw new KeyNotFoundException($"Department {dto.DepartmentId} not found");
        }




        var exists = await uow.Repository<Position>()
                              .GetAllQueryable()
                              .AnyAsync(p => p.Title == dto.Title &&
                                             p.DepartmentId == dto.DepartmentId);

        if (dto.SalaryMin > dto.SalaryMax)
        {
            throw new ArgumentException("SalaryMin cannot be greater than SalaryMax");
        }


        if (exists)
        {
            throw new InvalidOperationException("Position already exists in this department");
        }

        var position = mapper.Map<Position>(dto);

        await uow.Repository<Position>().AddAsync(position);

        await uow.SaveChangesAsync();

        return await GetByIdAsync(position.Id) ?? mapper.Map<PositionDto>(position);
    }

    public async Task<PositionDto?> UpdateAsync(int id, UpdatePositionDto dto)
    {
        var position = await uow.Repository<Position>()
                                .GetAllQueryable()
                                .FirstOrDefaultAsync(p => p.Id == id);

        if (position is null)
        {
            return null;
        }

        if (dto.SalaryMin > dto.SalaryMax) 
        { 

        throw new ArgumentException("SalaryMin cannot be greater than SalaryMax");
    
        
        }
        mapper.Map(dto, position);

        uow.Repository<Position>().Update(position);

        await uow.SaveChangesAsync();

        return await GetByIdAsync(id);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var position = await uow.Repository<Position>()
                                .GetAllQueryable()
                                .Include(p => p.Employees)
                                .FirstOrDefaultAsync(p => p.Id == id);


        if (position is null)
        {
            return false;
        }

        if (position.Employees.Any())
        {
            throw new InvalidOperationException("Cannot delete position with assigned employees");
        }

        uow.Repository<Position>().Delete(position);

        await uow.SaveChangesAsync();
        return true;
    }
}