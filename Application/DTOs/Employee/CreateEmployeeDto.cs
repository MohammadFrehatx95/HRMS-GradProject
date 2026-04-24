using System.ComponentModel.DataAnnotations;

public class CreateEmployeeDto
{
    [Required]
    public string FirstName { get; set; } = string.Empty;
    [Required]
    public string LastName { get; set; } = string.Empty;
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
    [Required]
    [RegularExpression(@"^\+?\d{10,15}$", ErrorMessage = "Invalid phone number format.")]
    public string PhoneNumber { get; set; } = string.Empty;
    [Required]
    public DateTime HireDate { get; set; }
    [Required]
    public int DepartmentId { get; set; }
    [Required]
    public int UserId { get; set; } 
    [Required]
    public int PositionId { get; set; }
}