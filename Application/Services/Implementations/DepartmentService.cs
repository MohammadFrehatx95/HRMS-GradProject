using Application.DTOs.Department;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.Implementations;

public class DepartmentService(IUnitOfWork uow, IMapper mapper) : IDepartmentService
{
    public async Task<List<DepartmentDto>> GetAllAsync()
    {
        var departments = await uow.Repository<Department>()
                                   .GetAllQueryable()
                                   .Include(d => d.Employees)
                                   .ToListAsync();

        return mapper.Map<List<DepartmentDto>>(departments);
    }

    public async Task<DepartmentDto?> GetByIdAsync(int id)
    {
        var department = await uow.Repository<Department>()
                                  .GetAllQueryable()
                                  .Include(d => d.Employees)
                                  .FirstOrDefaultAsync(d => d.Id == id);

        return department is null ? null : mapper.Map<DepartmentDto>(department);
    }

    public async Task<DepartmentDto> CreateAsync(CreateDepartmentDto dto)
    {
        var exists = await uow.Repository<Department>()
                              .GetAllQueryable()
                              .AnyAsync(d => d.Name == dto.Name);

        if (exists)
            throw new InvalidOperationException("Department name already exists");

        var department = mapper.Map<Department>(dto);
        await uow.Repository<Department>().AddAsync(department);
        await uow.SaveChangesAsync();

        return mapper.Map<DepartmentDto>(department);
    }

    public async Task<DepartmentDto?> UpdateAsync(int id, UpdateDepartmentDto dto)
    {
        var department = await uow.Repository<Department>()
                                  .GetAllQueryable()
                                  .FirstOrDefaultAsync(d => d.Id == id);

        if (department is null) return null;

        mapper.Map(dto, department);
        uow.Repository<Department>().Update(department);
        await uow.SaveChangesAsync();

        return mapper.Map<DepartmentDto>(department);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var department = await uow.Repository<Department>()
                                  .GetAllQueryable()
                                  .Include(d => d.Employees)
                                  .FirstOrDefaultAsync(d => d.Id == id);

        if (department is null) return false;

        if (department.Employees.Any())
            throw new InvalidOperationException("Cannot delete department with employees");

        uow.Repository<Department>().Delete(department);
        await uow.SaveChangesAsync();
        return true;
    }
}