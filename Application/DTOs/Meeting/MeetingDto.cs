using System;
using Domain.Enums;

namespace Application.DTOs.Meeting
{
    public class MeetingDto
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public DateTime MeetingDate { get; set; }
        public int EmployeeId { get; set; }
        public string? EmployeeName { get; set; }
        public int? OrganizerId { get; set; }
        public string? OrganizerName { get; set; }
        public MeetingStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class CreateMeetingDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime MeetingDate { get; set; }
        public int EmployeeId { get; set; }
    }

    public class UpdateMeetingDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime MeetingDate { get; set; }
        public MeetingStatus Status { get; set; }
    }
}
