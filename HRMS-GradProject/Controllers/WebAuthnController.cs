using Application.Common;
using Application.DTOs.Auth;
using Application.Interfaces;
using System.Linq;
using Domain.Entities;
using Domain.Interfaces;
using Fido2NetLib;
using Fido2NetLib.Objects;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using System.Security.Claims;
using System.Text;

namespace HRMS_API.Controllers;

[ApiController]
[Route("api/auth/webauthn")]
public class WebAuthnController(
    IFido2 fido2,
    IMemoryCache cache,
    IUnitOfWork uow,
    IJwtService jwtService) : ControllerBase
{
    private string GetCacheKey(string prefix, string identifier) => $"{prefix}_{identifier}";

    [HttpPost("register-options")]
    [Authorize]
    public async Task<IActionResult> MakeCredentialOptions()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var user = await uow.Repository<User>().GetAllQueryable()
            .Include(u => u.FidoCredentials)
            .FirstOrDefaultAsync(u => u.Id == userId);

        if (user == null) return NotFound("User not found");

        var userObj = new Fido2User
        {
            DisplayName = user.Username,
            Name = user.Email,
            Id = Encoding.UTF8.GetBytes(user.Id.ToString())
        };

        var existingKeys = user.FidoCredentials
            .Select(c => new PublicKeyCredentialDescriptor(c.DescriptorId))
            .ToList();

        var authenticatorSelection = new AuthenticatorSelection
        {
            ResidentKey = ResidentKeyRequirement.Preferred,
            UserVerification = UserVerificationRequirement.Preferred
        };

        var reqParams = new RequestNewCredentialParams
        {
            User = userObj,
            ExcludeCredentials = existingKeys,
            AuthenticatorSelection = authenticatorSelection,
            AttestationPreference = AttestationConveyancePreference.None
        };

        var options = fido2.RequestNewCredential(reqParams);
        cache.Set(GetCacheKey("fido2_register", user.Id.ToString()), options.ToJson(), TimeSpan.FromMinutes(5));

        return Ok(options);
    }

    [HttpPost("register")]
    [Authorize]
    public async Task<IActionResult> MakeCredential([FromBody] AuthenticatorAttestationRawResponse attestationResponse)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        
        var jsonOptions = cache.Get<string>(GetCacheKey("fido2_register", userId.ToString()));
        if (string.IsNullOrEmpty(jsonOptions))
            return BadRequest("Registration options not found or expired. Please try again.");

        var options = CredentialCreateOptions.FromJson(jsonOptions);

        try
        {
            var makeParams = new MakeNewCredentialParams
            {
                AttestationResponse = attestationResponse,
                OriginalOptions = options,
                IsCredentialIdUniqueToUserCallback = async (args, cancellationToken) =>
                {
                    var descriptorIdBytes = args.CredentialId;
                    var isUnique = !await uow.Repository<FidoCredential>().GetAllQueryable().AnyAsync(c => c.DescriptorId == descriptorIdBytes);
                    return isUnique;
                }
            };
            var success = await fido2.MakeNewCredentialAsync(makeParams, HttpContext.RequestAborted);

            var credential = new FidoCredential
            {
                DescriptorId = success.Id,
                PublicKey = success.PublicKey,
                UserHandle = success.User.Id,
                SignatureCounter = success.SignCount,
                AaGuid = success.AaGuid,
                CredType = "public-key",
                RegDate = DateTime.UtcNow,
                UserId = userId
            };

            await uow.Repository<FidoCredential>().AddAsync(credential);
            await uow.SaveChangesAsync();

            return Ok(new { status = "ok", message = "Fingerprint added successfully." });
        }
        catch (Exception ex)
        {
            return BadRequest($"Error creating credential: {ex.Message}");
        }
    }

    [HttpPost("login-options")]
    public async Task<IActionResult> GetLoginOptions([FromBody] string email)
    {
        var user = await uow.Repository<User>().GetAllQueryable()
            .Include(u => u.FidoCredentials)
            .FirstOrDefaultAsync(u => u.Email == email);

        if (user == null || !user.FidoCredentials.Any())
            return BadRequest("No fingerprint registered for this account. Please go to My Profile and add a fingerprint first.");

        var existingCredentials = user.FidoCredentials
            .Select(c => new PublicKeyCredentialDescriptor(c.DescriptorId))
            .ToList();

        var getParams = new GetAssertionOptionsParams
        {
            AllowedCredentials = existingCredentials,
            UserVerification = UserVerificationRequirement.Preferred
        };

        var options = fido2.GetAssertionOptions(getParams);

        cache.Set(GetCacheKey("fido2_login", email), options.ToJson(), TimeSpan.FromMinutes(5));

        return Ok(options);
    }

    [HttpPost("login")]
    public async Task<IActionResult> MakeAssertion([FromBody] AuthenticatorAssertionRawResponse assertionResponse, [FromQuery] string email)
    {
        var jsonOptions = cache.Get<string>(GetCacheKey("fido2_login", email));
        if (string.IsNullOrEmpty(jsonOptions))
            return BadRequest("Login options not found or expired. Please try again.");

        var options = AssertionOptions.FromJson(jsonOptions);

        var user = await uow.Repository<User>().GetAllQueryable()
            .Include(u => u.FidoCredentials)
            .FirstOrDefaultAsync(u => u.Email == email);

        if (user == null) return NotFound("User not found");

        var creds = user.FidoCredentials.FirstOrDefault(c => c.DescriptorId == assertionResponse.RawId);
        if (creds == null) return BadRequest("Unknown credential");

        try
        {
            var makeAssertionParams = new MakeAssertionParams
            {
                AssertionResponse = assertionResponse,
                OriginalOptions = options,
                StoredPublicKey = creds.PublicKey,
                StoredSignatureCounter = creds.SignatureCounter,
                IsUserHandleOwnerOfCredentialIdCallback = (args, cancellationToken) => Task.FromResult(true)
            };

            var res = await fido2.MakeAssertionAsync(makeAssertionParams, HttpContext.RequestAborted);

            creds.SignatureCounter = res.SignCount;
            uow.Repository<FidoCredential>().Update(creds);
            await uow.SaveChangesAsync();

            var token = jwtService.GenerateToken(user);
            var result = new AuthResponseDto
            {
                Token = token,
                Email = user.Email,
                Username = user.Username,
                Role = user.Role,
                ProfilePictureUrl = user.ProfilePictureUrl,
                ExpiresAt = jwtService.GetExpiration()
            };

            return Ok(ApiResponse<AuthResponseDto>.Ok(result, "Login successful"));
        }
        catch (Exception ex)
        {
            return BadRequest($"Error authenticating: {ex.Message}");
        }
    }
}
