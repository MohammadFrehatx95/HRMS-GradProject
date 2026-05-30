using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.CompanyEvent;

public class CreateCompanyEventDto
{
    [Required]
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    [Required]
    public DateTime EventDate { get; set; }
    [Required]
    public string EventType { get; set; } = "Company";
}
