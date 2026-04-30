

using Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.Leave
{
  
    public class UpdateLeaveStatusDto
    {
        [Required]
        public LeaveStatus Status { get; set; }

        public string? RejectionReason { get; set; }
    }
}
