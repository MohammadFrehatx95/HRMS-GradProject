using System.IO;
using System.Threading.Tasks;
using Application.Services.Interfaces;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Services;

public class AzureFaceAuthService : IAzureFaceAuthService
{
    private readonly ILogger<AzureFaceAuthService> _logger;

    public AzureFaceAuthService(ILogger<AzureFaceAuthService> logger)
    {
        _logger = logger;
        // In a real scenario, you inject HttpClient or Azure FaceClient here
        // along with settings from appsettings.json (Endpoint, ApiKey, PersonGroupId).
    }

    public async Task<string> RegisterFaceAsync(int userId, Stream imageStream)
    {
        _logger.LogInformation($"Registering face for user {userId} in Azure...");
        
        // TODO: Implement actual Azure Face API call
        // 1. Create a Person in PersonGroup
        // 2. Add Face to that Person using imageStream
        // 3. Train the PersonGroup
        
        // Mocking a successful registration and returning a dummy Azure Person ID
        await Task.Delay(500); 
        return System.Guid.NewGuid().ToString();
    }

    public async Task<bool> VerifyFaceAsync(string azurePersonId, Stream imageStream)
    {
        _logger.LogInformation($"Verifying face for Azure Person {azurePersonId}...");

        // TODO: Implement actual Azure Face API call
        // 1. Detect Face in imageStream -> FaceId
        // 2. Verify FaceId against azurePersonId
        
        // Mocking a successful verification
        await Task.Delay(500);
        return true; 
    }
}
