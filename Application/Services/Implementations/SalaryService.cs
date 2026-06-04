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
    public async Task<PagedResult<SalaryDto>> GetAllAsync(int pageNumber, int pageSize, int? month = null, int? year = null, string? searchQuery = null)
    {
        var query = uow.Repository<Salary>()
                       .GetAllQueryable()
                       .Include(s => s.Employee).ThenInclude(e => e.User)
                       .AsQueryable();

        if (month.HasValue && month.Value > 0) query = query.Where(s => s.Month == month.Value);
        if (year.HasValue && year.Value > 0) query = query.Where(s => s.Year == year.Value);

        if (!string.IsNullOrWhiteSpace(searchQuery))
        {
            query = query.Where(s => 
                (s.Employee != null && (s.Employee.FirstName.Contains(searchQuery) || s.Employee.LastName.Contains(searchQuery))) ||
                s.EmployeeId.ToString().Contains(searchQuery) ||
                s.Status.ToString().Contains(searchQuery));
        }

        query = query.OrderByDescending(s => s.Status == SalaryStatus.Draft).ThenByDescending(s => s.Year).ThenByDescending(s => s.Month);

            var total = await query.CountAsync();
            var items = await query
                            .Skip((pageNumber - 1) * pageSize)
                            .Take(pageSize)
                            .ToListAsync();

            return PagedResult<SalaryDto>.Create(
                mapper.Map<List<SalaryDto>>(items), total, pageNumber, pageSize);
        }

    public async Task<PagedResult<SalaryDto>> GetMyAsync(int employeeId, int pageNumber, int pageSize, int? month = null, int? year = null, string? searchQuery = null)
    {
        var query = uow.Repository<Salary>()
                       .GetAllQueryable()
                       .Include(s => s.Employee).ThenInclude(e => e.User)
                       .Where(s => s.EmployeeId == employeeId);

        if (month.HasValue && month.Value > 0) query = query.Where(s => s.Month == month.Value);
        if (year.HasValue && year.Value > 0) query = query.Where(s => s.Year == year.Value);

        if (!string.IsNullOrWhiteSpace(searchQuery))
        {
            query = query.Where(s => 
                s.Status.ToString().Contains(searchQuery));
        }

        query = query.OrderByDescending(s => s.Status == SalaryStatus.Draft).ThenByDescending(s => s.Year).ThenByDescending(s => s.Month);

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
                                  .Include(s => s.Employee).ThenInclude(e => e.User)
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
                    $"Salary for employee {dto.EmployeeId} in {dto.Month}/{dto.Year} already exists. " +
                    $"Use the update endpoint to modify it.");

            var unappliedAdjustments = await uow.Repository<PayrollAdjustment>()
                                                .GetAllQueryable()
                                                .Where(p => p.EmployeeId == dto.EmployeeId && !p.IsApplied)
                                                .ToListAsync();

            var totalBonuses = unappliedAdjustments.Where(p => p.Type == AdjustmentType.Bonus).Sum(p => p.Amount);
            var totalPenalties = unappliedAdjustments.Where(p => p.Type == AdjustmentType.Penalty).Sum(p => p.Amount);

            var finalAllowances = dto.Allowances + totalBonuses;
            var finalDeductions = dto.Deductions + totalPenalties;

            var gross = dto.BaseAmount + finalAllowances;
            var net = gross - finalDeductions;

            if (net < 0)
                throw new ArgumentException("Deductions cannot exceed the gross amount");

            var salary = new Salary
            {
                EmployeeId = dto.EmployeeId,
                BaseAmount = dto.BaseAmount,
                Allowances = finalAllowances,
                Deductions = finalDeductions,
                GrossAmount = gross,
                NetAmount = net,
                Month = dto.Month,
                Year = dto.Year,
                EffectiveDate = DateTime.SpecifyKind(dto.EffectiveDate, DateTimeKind.Utc)
            };

            await uow.Repository<Salary>().AddAsync(salary);
            await uow.SaveChangesAsync(); // Save to get the generated Salary Id

            // Mark adjustments as applied
            foreach(var adj in unappliedAdjustments)
            {
                adj.IsApplied = true;
                adj.AppliedToSalaryId = salary.Id;
                uow.Repository<PayrollAdjustment>().Update(adj);
            }
            if (unappliedAdjustments.Any())
            {
                await uow.SaveChangesAsync();
            }

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
                                  .Include(s => s.Employee).ThenInclude(e => e.User)
                                  .FirstOrDefaultAsync(s => s.Id == id)
                        ?? throw new KeyNotFoundException($"Salary {id} not found");

            if (salary.Status == SalaryStatus.Paid)
                throw new InvalidOperationException("Cannot update a salary that has already been paid.");

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

            if (salary.Status == SalaryStatus.Paid)
                throw new InvalidOperationException("Cannot delete a salary that has already been paid.");

            uow.Repository<Salary>().Delete(salary);
            await uow.SaveChangesAsync();
        }

        public async Task<PayrollPreviewResultDto> PreviewBatchAsync(GeneratePayrollDto dto)
        {
            var query = uow.Repository<Employee>()
                           .GetAllQueryable()
                           .Include(e => e.Position)
                           .Include(e => e.Department)
                           .Where(e => e.IsActive && 
                                       (e.HireDate.Year < dto.Year || (e.HireDate.Year == dto.Year && e.HireDate.Month <= dto.Month)));

            if (dto.DepartmentId.HasValue && dto.DepartmentId.Value > 0)
            {
                query = query.Where(e => e.DepartmentId == dto.DepartmentId.Value);
            }

            var activeEmployees = await query.ToListAsync();

            var existingSalaries = await uow.Repository<Salary>()
                                            .GetAllQueryable()
                                            .Where(s => s.Month == dto.Month && s.Year == dto.Year)
                                            .Select(s => s.EmployeeId)
                                            .ToListAsync();

            var employeesWithoutSalary = activeEmployees
                                         .Where(e => !existingSalaries.Contains(e.Id))
                                         .ToList();

            var previewResult = new PayrollPreviewResultDto();

            foreach (var emp in employeesWithoutSalary)
            {
                var baseAmount = emp.Position?.SalaryMin ?? 0;

                var unappliedAdjustments = await uow.Repository<PayrollAdjustment>()
                                                    .GetAllQueryable()
                                                    .Where(p => p.EmployeeId == emp.Id && !p.IsApplied)
                                                    .ToListAsync();

                var totalBonuses = unappliedAdjustments.Where(p => p.Type == AdjustmentType.Bonus).Sum(p => p.Amount);
                var totalPenalties = unappliedAdjustments.Where(p => p.Type == AdjustmentType.Penalty).Sum(p => p.Amount);

                var gross = baseAmount + totalBonuses;
                var net = gross - totalPenalties;
                if (net < 0) net = 0; // Prevent negative preview if penalty > gross

                var preview = new SalaryPreviewDto
                {
                    EmployeeId = emp.Id,
                    EmployeeName = $"{emp.FirstName} {emp.LastName}",
                    DepartmentName = emp.Department?.Name ?? "Unknown",
                    BaseAmount = baseAmount,
                    Allowances = totalBonuses,
                    Deductions = totalPenalties,
                    NetAmount = net
                };

                previewResult.Salaries.Add(preview);
                previewResult.TotalCost += net;
                previewResult.EmployeeCount++;
            }

            return previewResult;
        }

        public async Task<int> GenerateBatchAsync(GeneratePayrollDto dto)
        {
            var query = uow.Repository<Employee>()
                           .GetAllQueryable()
                           .Include(e => e.Position)
                           .Where(e => e.IsActive && 
                                       (e.HireDate.Year < dto.Year || (e.HireDate.Year == dto.Year && e.HireDate.Month <= dto.Month)));

            if (dto.DepartmentId.HasValue && dto.DepartmentId.Value > 0)
            {
                query = query.Where(e => e.DepartmentId == dto.DepartmentId.Value);
            }

            var activeEmployees = await query.ToListAsync();

            var existingSalaries = await uow.Repository<Salary>()
                                            .GetAllQueryable()
                                            .Where(s => s.Month == dto.Month && s.Year == dto.Year)
                                            .Select(s => s.EmployeeId)
                                            .ToListAsync();

            var employeesWithoutSalary = activeEmployees
                                         .Where(e => !existingSalaries.Contains(e.Id) && 
                                                     (dto.ExcludedEmployeeIds == null || !dto.ExcludedEmployeeIds.Contains(e.Id)))
                                         .ToList();

            int generatedCount = 0;

            foreach (var emp in employeesWithoutSalary)
            {
                var baseAmount = emp.Position?.SalaryMin ?? 0;

                var createDto = new CreateSalaryDto
                {
                    EmployeeId = emp.Id,
                    Month = dto.Month,
                    Year = dto.Year,
                    BaseAmount = baseAmount,
                    Allowances = 0,
                    Deductions = 0,
                    EffectiveDate = new DateTime(dto.Year, dto.Month, DateTime.DaysInMonth(dto.Year, dto.Month), 0, 0, 0, DateTimeKind.Utc)
                };

                try
                {
                    await CreateAsync(createDto);
                    generatedCount++;
                }
                catch
                {
                    // If creation fails for an employee, log it and continue
                    continue;
                }
            }

            return generatedCount;
        }

        public async Task<int> MarkAsPaidAsync(int month, int year)
        {
            var salaries = await uow.Repository<Salary>()
                                    .GetAllQueryable()
                                    .Where(s => s.Month == month && s.Year == year && s.Status == SalaryStatus.Draft)
                                    .ToListAsync();

            if (!salaries.Any()) return 0;

            foreach (var salary in salaries)
            {
                salary.Status = SalaryStatus.Paid;
                uow.Repository<Salary>().Update(salary);
            }

            await uow.SaveChangesAsync();
            return salaries.Count;
        }

        public async Task<SalaryDto> ApproveAsync(int id)
        {
            var salary = await uow.Repository<Salary>()
                                  .GetAllQueryable()
                                  .Include(s => s.Employee).ThenInclude(e => e.User)
                                  .FirstOrDefaultAsync(s => s.Id == id)
                        ?? throw new KeyNotFoundException($"Salary {id} not found");

            if (salary.Status == SalaryStatus.Paid)
                throw new InvalidOperationException("Salary is already paid.");

            salary.Status = SalaryStatus.Paid;
            uow.Repository<Salary>().Update(salary);
            await uow.SaveChangesAsync();

            return mapper.Map<SalaryDto>(salary);
        }
    }
}
