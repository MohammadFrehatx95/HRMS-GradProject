namespace Application.DTOs.Auth;

public class PendingProfilePictureDto
{
    public int UserId { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? CurrentProfilePictureUrl { get; set; }
    public string PendingProfilePictureUrl { get; set; } = string.Empty;
}
