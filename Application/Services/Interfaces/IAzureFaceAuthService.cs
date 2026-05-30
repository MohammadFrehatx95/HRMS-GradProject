using System.Threading.Tasks;

namespace Application.Services.Interfaces;

public interface IAzureFaceAuthService
{
    /// <summary>
    /// Registers a new face for a user in Azure Face API
    /// </summary>
    /// <param name="userId">The User ID</param>
    /// <param name="imageStream">The image file stream (from base64 or file)</param>
    /// <returns>The Azure Person ID or similar identifier</returns>
    Task<string> RegisterFaceAsync(int userId, Stream imageStream);

    /// <summary>
    /// Verifies a face against the registered Azure Person ID
    /// </summary>
    /// <param name="azurePersonId">The saved Azure Person ID from the database</param>
    /// <param name="imageStream">The image file stream (from camera)</param>
    /// <returns>True if the face matches, False otherwise</returns>
    Task<bool> VerifyFaceAsync(string azurePersonId, Stream imageStream);
}
