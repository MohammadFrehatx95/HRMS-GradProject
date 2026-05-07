using Application.Common;
using Application.DTOs.Salary;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace Application.Services.Implementations
{

    // Application/Services/Implementations/SalaryService.cs
    public class SalaryService(
        IUnitOfWork uow,
        IMapper mapper,
        INotificationService notificationService,
        IEmailService emailService) : ISalaryService
    {
        public async Task<PagedResult<SalaryDto>> GetAllAsync(int pageNumber, int pageSize)
        {
            var query = uow.Repository<Salary>()
                           .GetAllQueryable()
                           .Include(s => s.Employee)
                           .OrderByDescending(s => s.Year)
                           .ThenByDescending(s => s.Month);

            var total = await query.CountAsync();
            var items = await query
                            .Skip((pageNumber - 1) * pageSize)
                            .Take(pageSize)
                            .ToListAsync();

            return PagedResult<SalaryDto>.Create(
                mapper.Map<List<SalaryDto>>(items), total, pageNumber, pageSize);
        }

        public async Task<PagedResult<SalaryDto>> GetMyAsync(
            int employeeId, int pageNumber, int pageSize)
        {
            var query = uow.Repository<Salary>()
                           .GetAllQueryable()
                           .Include(s => s.Employee)
                           .Where(s => s.EmployeeId == employeeId)
                           .OrderByDescending(s => s.Year)
                           .ThenByDescending(s => s.Month);

            var total = await query.CountAsync();
            var items = await query
                            .Skip((pageNumber - 1) * pageSize)
                            .Take(pageSize)
                            .ToListAsync();

            return PagedResult<SalaryDto>.Create(
                mapper.Map<List<SalaryDto>>(items), total, pageNumber, pageSize);
        }

        public async Task<SalaryDto?> GetByIdAsync(int id)
        {
            var salary = await uow.Repository<Salary>()
                                  .GetAllQueryable()
                                  .Include(s => s.Employee)
                                  .FirstOrDefaultAsync(s => s.Id == id);

            return salary is null ? null : mapper.Map<SalaryDto>(salary);
        }

        public async Task<SalaryDto> CreateAsync(CreateSalaryDto dto)
        {
            var employeeExists = await uow.Repository<Employee>()
                                          .GetAllQueryable()
                                          .AnyAsync(e => e.Id == dto.EmployeeId);

            if (!employeeExists)
                throw new KeyNotFoundException($"Employee {dto.EmployeeId} not found");

            var duplicate = await uow.Repository<Salary>()
                                     .GetAllQueryable()
                                     .AnyAsync(s =>
                                         s.EmployeeId == dto.EmployeeId &&
                                         s.Month == dto.Month &&
                                         s.Year == dto.Year);

            if (duplicate)
                throw new InvalidOperationException(
                    $"Salary for this employee in {dto.Month}/{dto.Year} already exists");

            var gross = dto.BaseAmount + dto.Allowances;
            var net = gross - dto.Deductions;

            if (net < 0)
                throw new ArgumentException(
                    "Deductions cannot exceed the gross amount");

            var salary = new Salary
            {
                EmployeeId = dto.EmployeeId,
                BaseAmount = dto.BaseAmount,
                Allowances = dto.Allowances,
                Deductions = dto.Deductions,
                GrossAmount = gross,
                NetAmount = net,
                Month = dto.Month,
                Year = dto.Year,
                // ✅ Fix DateTime Kind
                EffectiveDate = DateTime.SpecifyKind(
                                    dto.EffectiveDate, DateTimeKind.Utc)
            };

            await uow.Repository<Salary>().AddAsync(salary);
            await uow.SaveChangesAsync();

            // جيب الـ User المرتبط بالموظف
            var user = await uow.Repository<User>()
                                .GetAllQueryable()
                                .Include(u => u.Employee)
                                .FirstOrDefaultAsync(u =>
                                    u.EmployeeId == dto.EmployeeId);

            if (user is not null)
            {
                var employeeName = user.Employee is not null
                    ? $"{user.Employee.FirstName} {user.Employee.LastName}"
                    : user.Username;

                // Notification
                await notificationService.CreateAsync(
                    userId: user.Id,
                    title: "Salary Statement Available",
                    message: $"Your salary for {dto.Month}/{dto.Year} has been added. " +
                             $"Net Amount: {net:N2} JD",
                    type: NotificationType.SalaryCreated);

                // ✅ Email
                try
                {
                    await emailService.SendSalaryCreatedAsync(
                        user.Email, employeeName,
                        dto.Month, dto.Year, net);
                }
                catch { /* Log if needed */ }
            }

            return (await GetByIdAsync(salary.Id))!;
        }

        public async Task<SalaryDto> UpdateAsync(int id, UpdateSalaryDto dto)
        {
            var salary = await uow.Repository<Salary>()
                                  .GetAllQueryable()
                                  .Include(s => s.Employee)
                                  .FirstOrDefaultAsync(s => s.Id == id)
                        ?? throw new KeyNotFoundException($"Salary {id} not found");

            if (dto.BaseAmount.HasValue) salary.BaseAmount = dto.BaseAmount.Value;
            if (dto.Allowances.HasValue) salary.Allowances = dto.Allowances.Value;
            if (dto.Deductions.HasValue) salary.Deductions = dto.Deductions.Value;
            if (dto.EffectiveDate.HasValue) salary.EffectiveDate =
                // ✅ Fix DateTime Kind
                DateTime.SpecifyKind(dto.EffectiveDate.Value, DateTimeKind.Utc);

            salary.GrossAmount = salary.BaseAmount + salary.Allowances;
            salary.NetAmount = salary.GrossAmount - salary.Deductions;

            if (salary.NetAmount < 0)
                throw new ArgumentException(
                    "Deductions cannot exceed the gross amount");

            uow.Repository<Salary>().Update(salary);
            await uow.SaveChangesAsync();

            // جيب الـ User المرتبط بالموظف
            var user = await uow.Repository<User>()
                                .GetAllQueryable()
                                .Include(u => u.Employee)
                                .FirstOrDefaultAsync(u =>
                                    u.EmployeeId == salary.EmployeeId);

            if (user is not null)
            {
                var employeeName = user.Employee is not null
                    ? $"{user.Employee.FirstName} {user.Employee.LastName}"
                    : user.Username;

                // Notification
                await notificationService.CreateAsync(
                    userId: user.Id,
                    title: "Salary Updated",
                    message: $"Your salary for {salary.Month}/{salary.Year} " +
                             $"has been updated. Net Amount: {salary.NetAmount:N2} JD",
                    type: NotificationType.SalaryUpdated);

                // ✅ Email
                try
                {
                    await emailService.SendSalaryUpdatedAsync(
                        user.Email, employeeName,
                        salary.Month, salary.Year, salary.NetAmount);
                }
                catch { /* Log if needed */ }
            }

            return mapper.Map<SalaryDto>(salary);
        }

        public async Task DeleteAsync(int id)
        {
            var salary = await uow.Repository<Salary>()
                                  .GetAllQueryable()
                                  .FirstOrDefaultAsync(s => s.Id == id)
                        ?? throw new KeyNotFoundException($"Salary {id} not found");

            uow.Repository<Salary>().Delete(salary);
            await uow.SaveChangesAsync();
        }
    }
}
