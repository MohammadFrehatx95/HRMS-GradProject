using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.Announcement
{
    public class CreateAnnouncementDto
    {
        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Content { get; set; } = string.Empty;

        [Required]
        public string Priority { get; set; } = "Normal";

        public bool IsGeneral { get; set; } = true;
        
        public List<int>? TargetEmployeeIds { get; set; }
        
        public DateTime? ExpiryDate { get; set; }
    }
}
