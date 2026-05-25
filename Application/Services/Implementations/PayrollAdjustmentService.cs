using Application.Common;
using Application.DTOs.PayrollAdjustment;
using Application.Services.Interfaces;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.Implementations;

public class PayrollAdjustmentService(IUnitOfWork uow, IEmailService emailService) : IPayrollAdjustmentService
{
    public async Task<PagedResult<PayrollAdjustmentDto>> GetAllAsync(int pageNumber = 1, int pageSize = 10)
    {
        var query = uow.Repository<PayrollAdjustment>().GetAllQueryable().Include(p => p.Employee).ThenInclude(e => e.User);
        var total = await query.CountAsync();
        var items = await query.OrderByDescending(p => p.Date)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(p => new PayrollAdjustmentDto
            {
                Id = p.Id,
                EmployeeId = p.EmployeeId,
                EmployeeName = p.Employee.User.Username,
                Type = p.Type,
                Amount = p.Amount,
                Reason = p.Reason,
                Date = p.Date,
                IsApplied = p.IsApplied
            }).ToListAsync();
        return PagedResult<PayrollAdjustmentDto>.Create(items, total, pageNumber, pageSize);
    }

    public async Task<PagedResult<PayrollAdjustmentDto>> GetByEmployeeIdAsync(int employeeId, int pageNumber = 1, int pageSize = 10)
    {
        var query = uow.Repository<PayrollAdjustment>().GetAllQueryable().Where(p => p.EmployeeId == employeeId);
        var total = await query.CountAsync();
        var items = await query.OrderByDescending(p => p.Date)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(p => new PayrollAdjustmentDto
            {
                Id = p.Id,
                EmployeeId = p.EmployeeId,
                EmployeeName = "",
                Type = p.Type,
                Amount = p.Amount,
                Reason = p.Reason,
                Date = p.Date,
                IsApplied = p.IsApplied
            }).ToListAsync();
        return PagedResult<PayrollAdjustmentDto>.Create(items, total, pageNumber, pageSize);
    }

    public async Task<bool> AddAdjustmentAsync(CreatePayrollAdjustmentDto dto)
    {
        var employee = await uow.Repository<Employee>().GetByIdAsync(dto.EmployeeId);
        if (employee == null) return false;

        var adjustment = new PayrollAdjustment
        {
            EmployeeId = dto.EmployeeId,
            Type = dto.Type,
            Amount = dto.Amount,
            Reason = dto.Reason,
            Date = DateTime.UtcNow,
            IsApplied = false
        };

        await uow.Repository<PayrollAdjustment>().AddAsync(adjustment);
        await uow.SaveChangesAsync();
        
        if (!string.IsNullOrEmpty(employee.Email))
        {
            await emailService.SendPayrollAdjustmentAsync(
                employee.Email,
                $"{employee.FirstName} {employee.LastName}",
                dto.Type.ToString(),
                dto.Amount,
                dto.Reason
            );
        }
        
        return true;
    }

    public async Task<bool> DeleteAdjustmentAsync(int id)
    {
        var adjustment = await uow.Repository<PayrollAdjustment>().GetByIdAsync(id);
        if (adjustment == null || adjustment.IsApplied) return false;
        uow.Repository<PayrollAdjustment>().Delete(adjustment);
        await uow.SaveChangesAsync();
        return true;
    }
}
