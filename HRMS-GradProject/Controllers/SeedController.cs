using Microsoft.AspNetCore.Mvc;
using Infrastructure.Data;
using Domain.Entities;
using Bogus;
using Microsoft.EntityFrameworkCore;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HRMS_API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SeedController : ControllerBase
{
    private readonly AppDbContext _context;

    public SeedController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("generate")]
    public async Task<IActionResult> GenerateData([FromQuery] int employeeCount = 20)
    {
        try
        {
            // Set a fixed seed for predictable data if needed, but random is fine.
            Randomizer.Seed = new Random(8675309);

            // 1. Departments
            var defaultDepts = new List<string> { "IT", "HR", "Finance", "Marketing", "Engineering" };
            var depts = new List<Department>();
            foreach (var deptName in defaultDepts)
            {
                var dept = await _context.Departments.FirstOrDefaultAsync(d => d.Name == deptName);
                if (dept == null)
                {
                    dept = new Department { Name = deptName };
                    _context.Departments.Add(dept);
                    await _context.SaveChangesAsync();
                }
                depts.Add(dept);
            }

            // 2. Positions
            var positions = new List<Position>();
            foreach (var dept in depts)
            {
                var posNames = new List<string> { "Manager", $"Senior {dept.Name} Specialist", $"Junior {dept.Name} Specialist" };
                foreach (var posName in posNames)
                {
                    var pos = await _context.Positions.FirstOrDefaultAsync(p => p.Title == posName && p.DepartmentId == dept.Id);
                    if (pos == null)
                    {
                        pos = new Position { Title = posName, DepartmentId = dept.Id, SalaryMin = 500m, SalaryMax = 2500m };
                        _context.Positions.Add(pos);
                        await _context.SaveChangesAsync();
                    }
                    positions.Add(pos);
                }
            }

            // 3. Employees & Users
            var passwordHash = BCrypt.Net.BCrypt.HashPassword("Password123!");
            var userFaker = new Faker<User>()
                .RuleFor(u => u.Email, f => "") 
                .RuleFor(u => u.Username, f => "") 
                .RuleFor(u => u.PasswordHash, f => passwordHash)
                .RuleFor(u => u.Role, f => "Employee")
                .RuleFor(u => u.IsActive, f => true);

            var empFaker = new Faker<Employee>()
                .RuleFor(e => e.FirstName, f => f.Name.FirstName())
                .RuleFor(e => e.LastName, f => f.Name.LastName())
                .RuleFor(e => e.PhoneNumber, f => f.Phone.PhoneNumber("07########"))
                .RuleFor(e => e.BirthDate, f => f.Date.Past(30, DateTime.Now.AddYears(-22)))
                .RuleFor(e => e.HireDate, f => f.Date.Past(5, DateTime.Now.AddMonths(-1)))
                .RuleFor(e => e.IsActive, f => true)
                .RuleFor(e => e.AnnualLeaveBalance, f => f.Random.Int(5, 14))
                .RuleFor(e => e.SickLeaveBalance, f => f.Random.Int(5, 14))
                .RuleFor(e => e.EmergencyLeaveBalance, f => f.Random.Int(1, 3));

            var addedEmployees = new List<Employee>();

            for (int i = 0; i < employeeCount; i++)
            {
                var f = new Faker();
                var dept = f.PickRandom(depts);
                var deptPositions = positions.Where(p => p.DepartmentId == dept.Id).ToList();
                var pos = f.PickRandom(deptPositions);

                var employee = empFaker.Generate();
                employee.DepartmentId = dept.Id;
                employee.PositionId = pos.Id;

                // Make safe unique email
                string safeEmail = $"{employee.FirstName.ToLower()}.{employee.LastName.ToLower()}{f.Random.Int(1, 9999)}@hrms-grad.local";
                employee.Email = safeEmail;

                var user = userFaker.Generate();
                user.Email = safeEmail;
                user.Username = $"{employee.FirstName.ToLower()}{employee.LastName.ToLower()}{f.Random.Int(1, 9999)}";
                
                // Make some HR or Admin
                var randRole = f.Random.Int(1, 100);
                if (randRole <= 5) user.Role = "Admin";
                else if (randRole <= 15) user.Role = "HR";

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                employee.UserId = user.Id;

                // ID Generation logic from EmployeeService
                var year = employee.HireDate.Year;
                var prefixMin = int.Parse($"{year}{dept.Id:D2}") * 10000;
                var prefixMax = prefixMin + 9999;
                var lastId = await _context.Employees
                    .Where(e => e.Id >= prefixMin && e.Id <= prefixMax)
                    .OrderByDescending(e => e.Id)
                    .Select(e => e.Id)
                    .FirstOrDefaultAsync();

                var nextSeq = lastId == 0 ? 1 : (lastId % 10000) + 1;
                employee.Id = int.Parse($"{year}{dept.Id:D2}{nextSeq:D4}");

                _context.Employees.Add(employee);
                await _context.SaveChangesAsync();

                addedEmployees.Add(employee);
            }

            // 4. Attendances
            var today = DateTime.Today;
            foreach (var emp in addedEmployees)
            {
                var f = new Faker();
                for (int d = 30; d >= 1; d--)
                {
                    var date = today.AddDays(-d);
                    if (date.DayOfWeek == DayOfWeek.Friday || date.DayOfWeek == DayOfWeek.Saturday) continue;

                    // 10% absent
                    if (f.Random.Bool(0.1f)) continue;

                    var inTime = new TimeOnly(8, f.Random.Int(45, 59), 0);
                    if (f.Random.Bool(0.2f)) inTime = new TimeOnly(9, f.Random.Int(5, 30), 0); // Late

                    var outTime = inTime.AddHours(8).AddMinutes(f.Random.Int(0, 30));
                    if (f.Random.Bool(0.1f)) outTime = new TimeOnly(16, f.Random.Int(0, 30), 0); // Early

                    _context.Attendances.Add(new Attendance
                    {
                        EmployeeId = emp.Id,
                        Date = date,
                        ClockIn = inTime,
                        ClockOut = outTime
                    });
                }
            }
            await _context.SaveChangesAsync();

            // 5. Leaves
            var leaveFaker = new Faker<Leave>()
                .RuleFor(l => l.LeaveType, f => f.PickRandom<LeaveType>())
                .RuleFor(l => l.StartDate, f => f.Date.Soon(30))
                .RuleFor(l => l.Reason, f => f.Lorem.Sentence())
                .RuleFor(l => l.Status, f => f.PickRandom<LeaveStatus>());

            foreach (var emp in addedEmployees)
            {
                var f = new Faker();
                if (f.Random.Bool(0.3f)) // 30% have leaves
                {
                    var leave = leaveFaker.Generate();
                    leave.EndDate = leave.StartDate.AddDays(f.Random.Int(1, 5));
                    leave.EmployeeId = emp.Id;
                    _context.Leaves.Add(leave);
                }
            }
            await _context.SaveChangesAsync();

            // 6. Events
            var events = new List<CompanyEvent>();
            var fEvent = new Faker();
            for (int i = 0; i < 3; i++)
            {
                var start = fEvent.Date.Soon(15);
                events.Add(new CompanyEvent
                {
                    Title = fEvent.Company.CatchPhrase(),
                    Description = fEvent.Lorem.Paragraph(),
                    EventDate = start,
                    EventType = "Meeting"
                });
            }
            _context.CompanyEvents.AddRange(events);
            await _context.SaveChangesAsync();

            return Ok(new { message = $"Successfully generated {employeeCount} employees and related data." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message, inner = ex.InnerException?.Message });
        }
    }
}
