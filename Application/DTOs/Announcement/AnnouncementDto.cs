using System;

namespace Application.DTOs.Announcement
{
    public class AnnouncementDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public string Priority { get; set; } = string.Empty;
        public string AuthorName { get; set; } = string.Empty;
        public int AuthorId { get; set; }
    }
}
