using Application.Common;
using Application.DTOs.CompanyEvent;
using Domain.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace HRMS_API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class EventsController : ControllerBase
{
    private readonly IUnitOfWork _uow;

    public EventsController(IUnitOfWork uow)
    {
        _uow = uow;
    }

    // GET /api/events/upcoming?days=30
    [HttpGet("upcoming")]
    public async Task<IActionResult> GetUpcomingEvents([FromQuery] int days = 30)
    {
        var today = DateTime.UtcNow.Date;
        var endDate = today.AddDays(days);
        
        var upcomingEvents = new List<UpcomingEventDto>();

        // 1. Get Company Events
        var companyEvents = await _uow.Repository<CompanyEvent>()
            .GetAllQueryable()
            .Where(e => e.EventDate.Date >= today && e.EventDate.Date <= endDate)
            .ToListAsync();

        foreach (var ce in companyEvents)
        {
            upcomingEvents.Add(new UpcomingEventDto
            {
                Id = ce.Id,
                Title = ce.Title,
                Description = ce.Description,
                EventDate = ce.EventDate,
                EventType = ce.EventType,
                EmployeeId = ce.EmployeeId
            });
        }

        // 2. Get Upcoming Birthdays
        // We need to find employees whose birthday falls within the next N days (ignoring year).
        // Since SQL translation for this is tricky in EF Core, we fetch active employees and filter in memory.
        var employees = await _uow.Repository<Employee>()
            .GetAllQueryable()
            .Include(e => e.User)
            .Where(e => e.IsActive)
            .ToListAsync();

        foreach (var emp in employees)
        {
            // Calculate next birthday
            var nextBirthday = new DateTime(today.Year, emp.BirthDate.Month, emp.BirthDate.Day);
            if (nextBirthday < today)
            {
                nextBirthday = nextBirthday.AddYears(1);
            }

            if (nextBirthday >= today && nextBirthday <= endDate)
            {
                upcomingEvents.Add(new UpcomingEventDto
                {
                    Id = 0, // 0 means it's a birthday not a company event
                    Title = $"{emp.FirstName} {emp.LastName}'s Birthday",
                    Description = $"Wish {emp.FirstName} a happy birthday!",
                    EventDate = nextBirthday,
                    EventType = "Birthday",
                    EmployeeId = emp.Id,
                    ImageUrl = emp.User?.ProfilePictureUrl ?? ""
                });
            }
        }

        // Sort by date
        var sortedEvents = upcomingEvents.OrderBy(e => e.EventDate).ToList();

        return Ok(ApiResponse<List<UpcomingEventDto>>.Ok(sortedEvents, "Fetched successfully"));
    }

    // POST /api/events
    [HttpPost]
    [Authorize(Roles = "Admin,HR")]
    public async Task<IActionResult> CreateEvent([FromBody] CreateCompanyEventDto dto)
    {
        var newEvent = new CompanyEvent
        {
            Title = dto.Title,
            Description = dto.Description,
            EventDate = DateTime.SpecifyKind(dto.EventDate, DateTimeKind.Utc),
            EventType = dto.EventType
        };

        await _uow.Repository<CompanyEvent>().AddAsync(newEvent);
        await _uow.SaveChangesAsync();

        return Ok(ApiResponse<int>.Ok(newEvent.Id, "Event created successfully"));
    }

    // DELETE /api/events/{id}
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin,HR")]
    public async Task<IActionResult> DeleteEvent(int id)
    {
        var ev = await _uow.Repository<CompanyEvent>().GetByIdAsync(id);
        if (ev == null)
            return NotFound(ApiResponse.Fail("Event not found"));

        _uow.Repository<CompanyEvent>().Delete(ev);
        await _uow.SaveChangesAsync();

        return Ok(ApiResponse.Ok("Event deleted"));
    }
}
