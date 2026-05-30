namespace Application.DTOs.CompanyEvent;

public class UpcomingEventDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime EventDate { get; set; }
    public string EventType { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public int? EmployeeId { get; set; }
}
