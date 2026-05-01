using Domain.Enums;

using System.ComponentModel.DataAnnotations;


namespace Application.DTOs.Leave
{
    public class CreateLeaveDto
    {
        [Required]
        public LeaveType LeaveType { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        [StringLength(500, MinimumLength = 5)]
        public string Reason { get; set; } = string.Empty;
    }
}
