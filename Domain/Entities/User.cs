namespace Domain.Entities;

public class User
{
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public  string Username { get; set; } = string.Empty; 
    public string Role { get; set; } = "Employee"; 
    public int? EmployeeId { get; set; }          
    public Employee? Employee { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public bool IsActive { get; set; } = true;
    public string? ProfilePictureUrl { get; set; }
    public string? PendingProfilePictureUrl { get; set; }

    // Navigation properties
    public ICollection<Notification> Notifications { get; set; } = new List<Notification>();
    public ICollection<FidoCredential> FidoCredentials { get; set; } = new List<FidoCredential>();
    
    // Face Recognition
    public string? AzurePersonId { get; set; }
}