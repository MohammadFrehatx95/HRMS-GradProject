using System.Security.Claims;
using System.Threading.Tasks;
using Application.DTOs.Announcement;
using Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HRMS_GradProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AnnouncementController : ControllerBase
    {
        private readonly IAnnouncementService _announcementService;

        public AnnouncementController(IAnnouncementService announcementService)
        {
            _announcementService = announcementService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var employeeIdClaim = User.FindFirstValue("employeeId");
            int? employeeId = null;
            if (int.TryParse(employeeIdClaim, out var empId))
            {
                employeeId = empId;
            }

            bool isAdminOrHR = User.IsInRole("Admin") || User.IsInRole("HR");

            var result = await _announcementService.GetAllAsync(pageNumber, pageSize, employeeId, isAdminOrHR);
            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,HR")]
        public async Task<IActionResult> Create([FromBody] CreateAnnouncementDto dto)
        {
            var employeeIdClaim = User.FindFirstValue("employeeId");
            if (!int.TryParse(employeeIdClaim, out var employeeId))
            {
                // Fallback to 0 if not an employee (e.g. pure admin)
                employeeId = 0; 
            }

            var result = await _announcementService.CreateAsync(dto, employeeId);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,HR")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _announcementService.DeleteAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
