using Domain.Enums;

namespace Domain.Entities;

public class Meeting
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Reason { get; set; } = string.Empty;
    public DateTime ScheduledAt { get; set; }          // التاريخ + الوقت
    public int DurationMinutes { get; set; } = 30;
    public string MeetLink { get; set; } = string.Empty;
    public MeetingStatus Status { get; set; } = MeetingStatus.Scheduled;
    public string? Notes { get; set; }          // ملاحظات اختيارية
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // من رتّب الميتنج (HR أو Admin)
    public int OrganizerId { get; set; }
    public User Organizer { get; set; } = null!;

    // الموظف المدعو
    public int EmployeeId { get; set; }
    public Employee Employee { get; set; } = null!;
}