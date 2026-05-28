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

    //   2026010001  
    private async Task<int> GenerateEmployeeIdAsync(int departmentId, DateTime hireDate)
    {
        //  Guard against departmentId > 99
        if (departmentId > 99)
            throw new InvalidOperationException(
                $"Department ID {departmentId} exceeds the maximum supported value of 99 " +
                $"for employee ID generation. Please contact system administrator.");

        var year = hireDate.Year;
        var prefix = int.Parse($"{year}{departmentId:D2}");
        var prefixMin = prefix * 10000;
        var prefixMax = prefixMin + 9999;

        var lastId = await uow.Repository<Employee>()
                              .GetAllQueryable()
                              .Where(e => e.Id >= prefixMin && e.Id <= prefixMax)
                              .OrderByDescending(e => e.Id)
                              .Select(e => e.Id)
                              .FirstOrDefaultAsync();

        var nextSeq = lastId == 0
            ? 1
            : (lastId % 10000) + 1;

        if (nextSeq > 9999)
            throw new InvalidOperationException(
                $"Employee limit reached for dept {departmentId} in {year}");

        return int.Parse($"{year}{departmentId:D2}{nextSeq:D4}");
    }


    public async Task<PagedResult<EmployeeDto>> GetAllAsync(int pageNumber, int pageSize)
    {
        var query = uow.Repository<Employee>()
                       .GetAllQueryable()
                       .Include(e => e.Department)
                       .Include(e => e.Position)
                       .Include(e => e.User)
                       .OrderBy(e => e.DepartmentId)
                       .ThenBy(e => e.Id);

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
                                .Include(e => e.Position)
                                .Include(e => e.User)
                                .FirstOrDefaultAsync(e => e.Id == id);

        return employee is null ? null : mapper.Map<EmployeeDto>(employee);
    }

    public async Task<EmployeeDto> CreateAsync(CreateEmployeeDto dto)
    {
        var emailExists = await uow.Repository<Employee>()
                                   .GetAllQueryable()
                                   .AnyAsync(e => e.Email == dto.Email);
        if (emailExists)
            throw new InvalidOperationException("Email already used");

        var deptExists = await uow.Repository<Department>()
                                  .GetAllQueryable()
                                  .AnyAsync(d => d.Id == dto.DepartmentId);
        if (!deptExists)
            throw new KeyNotFoundException($"Department {dto.DepartmentId} not found");

        var employee = mapper.Map<Employee>(dto);
        employee.IsActive = true;

        // ← توليد الـ ID قبل الحفظ
        employee.Id = await GenerateEmployeeIdAsync(dto.DepartmentId, dto.HireDate);

        await uow.Repository<Employee>().AddAsync(employee);
        await uow.SaveChangesAsync();

        return (await GetByIdAsync(employee.Id))!;
    }

    public async Task<EmployeeDto?> UpdateAsync(int id, UpdateEmployeeDto dto)
    {
        var employee = await uow.Repository<Employee>()
                                .GetAllQueryable()
                                .Include(e => e.User)
                                .FirstOrDefaultAsync(e => e.Id == id);

        if (employee is null) return null;

        mapper.Map(dto, employee);

        if (!string.IsNullOrWhiteSpace(dto.Password) && employee.User != null)
        {
            employee.User.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
        }

        uow.Repository<Employee>().Update(employee);
        await uow.SaveChangesAsync();

        return await GetByIdAsync(id);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var employee = await uow.Repository<Employee>()
                                .GetAllQueryable()
                                .FirstOrDefaultAsync(e => e.Id == id);

        if (employee is null) return false;

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
                                 .Include(e => e.Position)
                                 .Include(e => e.User)
                                 .OrderBy(e => e.Id)
                                 .ToListAsync();

        return mapper.Map<IEnumerable<EmployeeDto>>(employees);
    }

    public async Task<EmployeeProfileDto?> GetProfileAsync(int id)
    {
        var employee = await uow.Repository<Employee>()
                                .GetAllQueryable()
                                .Include(e => e.Department)
                                .Include(e => e.Position)
                                .Include(e => e.User)
                                .FirstOrDefaultAsync(e => e.Id == id);

        return employee is null ? null : mapper.Map<EmployeeProfileDto>(employee);
    }
}