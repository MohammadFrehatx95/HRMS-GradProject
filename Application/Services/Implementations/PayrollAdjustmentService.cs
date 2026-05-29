using Application.Common;
using Application.DTOs.PayrollAdjustment;
using Application.Services.Interfaces;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.Implementations;

public class PayrollAdjustmentService(IUnitOfWork uow, IEmailService emailService, INotificationService notificationService) : IPayrollAdjustmentService
{
    public async Task<PagedResult<PayrollAdjustmentDto>> GetAllAsync(int pageNumber = 1, int pageSize = 10, int? month = null, int? year = null)
    {
        var query = uow.Repository<PayrollAdjustment>().GetAllQueryable().Include(p => p.Employee).ThenInclude(e => e.User).AsQueryable();

        if (month.HasValue && month.Value > 0) query = query.Where(p => p.Date.Month == month.Value);
        if (year.HasValue && year.Value > 0) query = query.Where(p => p.Date.Year == year.Value);

        var total = await query.CountAsync();
        var items = await query.OrderByDescending(p => p.Date)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(p => new PayrollAdjustmentDto
            {
                Id = p.Id,
                EmployeeId = p.EmployeeId,
                EmployeeName = p.Employee.FirstName + " " + p.Employee.LastName,
                EmployeeProfilePictureUrl = p.Employee.User != null ? p.Employee.User.ProfilePictureUrl : null,
                Type = p.Type,
                Amount = p.Amount,
                Reason = p.Reason,
                Date = p.Date,
                IsApplied = p.IsApplied
            }).ToListAsync();
        return PagedResult<PayrollAdjustmentDto>.Create(items, total, pageNumber, pageSize);
    }

    public async Task<PagedResult<PayrollAdjustmentDto>> GetByEmployeeIdAsync(int employeeId, int pageNumber = 1, int pageSize = 10, int? month = null, int? year = null)
    {
        var query = uow.Repository<PayrollAdjustment>().GetAllQueryable().Include(p => p.Employee).ThenInclude(e => e.User).Where(p => p.EmployeeId == employeeId);
        
        if (month.HasValue && month.Value > 0) query = query.Where(p => p.Date.Month == month.Value);
        if (year.HasValue && year.Value > 0) query = query.Where(p => p.Date.Year == year.Value);

        var total = await query.CountAsync();
        var items = await query.OrderByDescending(p => p.Date)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(p => new PayrollAdjustmentDto
            {
                Id = p.Id,
                EmployeeId = p.EmployeeId,
                EmployeeName = p.Employee.FirstName + " " + p.Employee.LastName,
                EmployeeProfilePictureUrl = p.Employee.User != null ? p.Employee.User.ProfilePictureUrl : null,
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
            Date = new DateTime(dto.Year, dto.Month, 1, 0, 0, 0, DateTimeKind.Utc),
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

        if (employee.UserId != 0)
        {
            await notificationService.CreateAsync(
                employee.UserId,
                dto.Type == AdjustmentType.Bonus ? "Bonus Received" : "Penalty Applied",
                $"A {(dto.Type == AdjustmentType.Bonus ? "Bonus" : "Penalty")} of {dto.Amount} JD has been added. Reason: {dto.Reason}",
                NotificationType.General
            );
        }
        
        return true;
    }

    public async Task<int> CreateBulkAsync(CreateBulkPayrollAdjustmentDto dto)
    {
        var employeeQuery = uow.Repository<Employee>().GetAllQueryable().Include(e => e.User).Where(e => e.IsActive);
        
        if (dto.DepartmentId.HasValue && dto.DepartmentId.Value > 0)
        {
            employeeQuery = employeeQuery.Where(e => e.DepartmentId == dto.DepartmentId.Value);
        }

        var employees = await employeeQuery.ToListAsync();
        int count = 0;

        foreach (var emp in employees)
        {
            var adjustment = new PayrollAdjustment
            {
                EmployeeId = emp.Id,
                Type = dto.Type,
                Amount = dto.Amount,
                Reason = dto.Reason,
                Date = new DateTime(dto.Year, dto.Month, 1, 0, 0, 0, DateTimeKind.Utc),
                IsApplied = false
            };
            await uow.Repository<PayrollAdjustment>().AddAsync(adjustment);
            count++;

            if (!string.IsNullOrEmpty(emp.Email))
            {
                try
                {
                    await emailService.SendPayrollAdjustmentAsync(
                        emp.Email,
                        $"{emp.FirstName} {emp.LastName}",
                        dto.Type.ToString(),
                        dto.Amount,
                        dto.Reason
                    );
                } catch { /* ignore */ }
            }

            if (emp.UserId != 0)
            {
                await notificationService.CreateAsync(
                    emp.UserId,
                    dto.Type == AdjustmentType.Bonus ? "Bonus Received" : "Penalty Applied",
                    $"A {(dto.Type == AdjustmentType.Bonus ? "Bonus" : "Penalty")} of {dto.Amount} JD has been added. Reason: {dto.Reason}",
                    NotificationType.General
                );
            }
        }

        if (count > 0)
        {
            await uow.SaveChangesAsync();
        }

        return count;
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
