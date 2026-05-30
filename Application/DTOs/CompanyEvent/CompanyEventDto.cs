namespace Application.DTOs.CompanyEvent;

public class CompanyEventDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime EventDate { get; set; }
    public string EventType { get; set; } = string.Empty;
    public int? EmployeeId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
}
