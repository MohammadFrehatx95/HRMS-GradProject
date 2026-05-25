using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.DTOs.Meeting;
using Application.Services.Interfaces;
using Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HRMS_GradProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MeetingController : ControllerBase
    {
        private readonly IMeetingService _meetingService;

        public MeetingController(IMeetingService meetingService)
        {
            _meetingService = meetingService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin,HR")]
        public async Task<IActionResult> GetAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var result = await _meetingService.GetAllAsync(pageNumber, pageSize);
            return Ok(result);
        }

        [HttpGet("my-meetings")]
        public async Task<IActionResult> GetMyMeetings([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var employeeIdClaim = User.FindFirstValue("employeeId");
            if (!int.TryParse(employeeIdClaim, out var employeeId))
                return BadRequest("Your account is not linked to an employee profile");

            var result = await _meetingService.GetByEmployeeIdAsync(employeeId, pageNumber, pageSize);
            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,HR")]
        public async Task<IActionResult> Create([FromBody] CreateMeetingDto dto)
        {
            var employeeIdClaim = User.FindFirstValue("employeeId");
            if (!int.TryParse(employeeIdClaim, out var organizerId))
                return BadRequest("Your account is not linked to an employee profile");

            var result = await _meetingService.CreateAsync(dto, organizerId);
            return Ok(result);
        }

        [HttpPut("{id}/status")]
        [Authorize(Roles = "Admin,HR")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateMeetingDto dto)
        {
            await _meetingService.UpdateStatusAsync(id, dto.Status);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,HR")]
        public async Task<IActionResult> Delete(int id)
        {
            await _meetingService.DeleteAsync(id);
            return NoContent();
        }
    }
}
