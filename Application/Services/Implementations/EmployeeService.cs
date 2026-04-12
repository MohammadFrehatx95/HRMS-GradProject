using Application.DTOs.Employee;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services.Implementations;

public class EmployeeService : IEmployeeService
{
    private readonly IUnitOfWork _uow;
    private readonly IMapper _mapper;

    public EmployeeService(IUnitOfWork uow, IMapper mapper)
    {
        _uow = uow;
        _mapper = mapper;
    }

    public async Task<IEnumerable<EmployeeDto>> GetAllAsync()
    {
        var employees = await _uow.Employees.GetAllAsync(
            e => e.Department);  // ← include Department 


        return _mapper.Map<IEnumerable<EmployeeDto>>(employees);
    }

    public async Task<EmployeeDto?> GetByIdAsync(int id)
    {
        var employee = await _uow.Employees.GetAsync(
            e => e.Id == id,
            e => e.Department);

        return employee is null ? null : _mapper.Map<EmployeeDto>(employee);
    }

    public async Task<EmployeeDto> CreateAsync(CreateEmployeeDto dto)
    {
        // validate email 
        var isUnique = await _uow.Employees.IsEmailUniqueAsync(dto.Email);
        if (!isUnique)
            throw new Exception("Previously used email");

        var employee = _mapper.Map<Employee>(dto);
        employee.IsActive = true;

        await _uow.Employees.AddAsync(employee);
        await _uow.SaveChangesAsync();

        return _mapper.Map<EmployeeDto>(employee);
    }

    public async Task<EmployeeDto?> UpdateAsync(int id, UpdateEmployeeDto dto)
    {
        var employee = await _uow.Employees.GetAsync(e => e.Id == id);
        if (employee is null) return null;

        _mapper.Map(dto, employee);
        _uow.Employees.Update(employee);
        await _uow.SaveChangesAsync();

        return _mapper.Map<EmployeeDto>(employee);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var employee = await _uow.Employees.GetAsync(e => e.Id == id);
        if (employee is null) return false;

        _uow.Employees.Delete(employee);
        await _uow.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<EmployeeDto>> GetByDepartmentAsync(int departmentId)
    {
        var employees = await _uow.Employees.GetByDepartmentAsync(departmentId);
        return _mapper.Map<IEnumerable<EmployeeDto>>(employees);
    }
}