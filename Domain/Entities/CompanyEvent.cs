namespace Domain.Entities;

public class CompanyEvent
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime EventDate { get; set; }
    
    // Type of event: "Birthday", "Holiday", "Meeting", "Other"
    public string EventType { get; set; } = "Other";

    // For birthdays, we can link it to the Employee (optional)
    public int? EmployeeId { get; set; }
    public Employee? Employee { get; set; }
}
