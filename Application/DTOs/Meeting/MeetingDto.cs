// Application/DTOs/Meeting/MeetingDto.cs
using Domain.Enums;

namespace Application.DTOs.Meeting;

public class MeetingDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Reason { get; set; } = string.Empty;
    public DateTime ScheduledAt { get; set; }
    public int DurationMinutes { get; set; }
    public string MeetLink { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string? Notes { get; set; }
    public DateTime CreatedAt { get; set; }

    // Organizer info
    public int OrganizerId { get; set; }
    public string OrganizerName { get; set; } = string.Empty;

    // Employee info
    public int EmployeeId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
}