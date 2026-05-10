using Application.Common;
using Application.DTOs.Employee;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.Implementations;

public class EmployeeService(IUnitOfWork uow, IMapper mapper) : IEmployeeService
{
    public async Task<PagedResult<EmployeeDto>> GetAllAsync(int pageNumber, int pageSize)
    {
        var query = uow.Repository<Employee>()
                       .GetAllQueryable()
                       .Include(e => e.Department)
                       .Include(e => e.Position); // ✅ W1/I4 Fix: أضف Position للـ mapping

        var total = await query.CountAsync();
        var items = await query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return PagedResult<EmployeeDto>.Create(
            mapper.Map<List<EmployeeDto>>(items), total, pageNumber, pageSize);
    }

    public async Task<EmployeeDto?> GetByIdAsync(int id)
    {
        var employee = await uow.Repository<Employee>()
                                .GetAllQueryable()
                                .Include(e => e.Department)
                                .Include(e => e.Position) // ✅ W1/I4 Fix
                                .FirstOrDefaultAsync(e => e.Id == id);

        return employee is null ? null : mapper.Map<EmployeeDto>(employee);
    }

    public async Task<EmployeeDto> CreateAsync(CreateEmployeeDto dto)
    {
       
        var emailExists = await uow.Repository<Employee>()
                                   .GetAllQueryable()
                                   .AnyAsync(e => e.Email == dto.Email);

        if (emailExists)
        {
            throw new InvalidOperationException("Email is already in use");
        }
        var employee = mapper.Map<Employee>(dto);
        employee.IsActive = true;

        await uow.Repository<Employee>().AddAsync(employee);
        await uow.SaveChangesAsync();

        // ✅ I1 Fix: أعد جلب الموظف مع Include حتى يحتوي الـ Response على DepartmentName و PositionTitle
        return (await GetByIdAsync(employee.Id))!;
    }

    public async Task<EmployeeDto?> UpdateAsync(int id, UpdateEmployeeDto dto)
    {
        var employee = await uow.Repository<Employee>()
                                .GetAllQueryable()
                                .FirstOrDefaultAsync(e => e.Id == id);

        if (employee is null)
        {
            return null;
        }
        mapper.Map(dto, employee);
        uow.Repository<Employee>().Update(employee);
        await uow.SaveChangesAsync();

        return mapper.Map<EmployeeDto>(employee);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var employee = await uow.Repository<Employee>()
                                .GetAllQueryable()
                                .FirstOrDefaultAsync(e => e.Id == id);

        if (employee is null)
        {
            return false;
        }
        uow.Repository<Employee>().Delete(employee);
        await uow.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<EmployeeDto>> GetByDepartmentAsync(int departmentId)
    {
        var employees = await uow.Repository<Employee>()
                                 .GetAllQueryable()
                                 .Where(e => e.DepartmentId == departmentId)
                                 .Include(e => e.Department)
                                 .ToListAsync();

        return mapper.Map<IEnumerable<EmployeeDto>>(employees);
    }

    public async Task<EmployeeProfileDto?> GetProfileAsync(int id)
    {
        var employee = await uow.Repository<Employee>()
                                .GetAllQueryable()
                                .Include(e => e.Department)
                                .Include(e => e.Position)
                                .FirstOrDefaultAsync(e => e.Id == id);

        return employee is null ? null : mapper.Map<EmployeeProfileDto>(employee);
    }
}