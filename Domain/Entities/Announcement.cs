using System;
using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public class Announcement
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Content { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        [MaxLength(50)]
        public string Priority { get; set; } = "Normal"; // Normal, High, Urgent

        public bool IsGeneral { get; set; } = true;
        
        public List<int>? TargetEmployeeIds { get; set; }
        
        public DateTime? ExpiryDate { get; set; }

        // The HR/Admin who posted it
        public int AuthorId { get; set; }
        public Employee? Author { get; set; }
    }
}
