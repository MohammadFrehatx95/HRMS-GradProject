using Domain.Enums;

namespace Application.DTOs.Auth;

public class ProfilePictureRequestDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? CurrentProfilePictureUrl { get; set; }
    public string RequestedPictureUrl { get; set; } = string.Empty;
    public RequestStatus Status { get; set; }
    public DateTime RequestedAt { get; set; }
    public DateTime? ResolvedAt { get; set; }
}
