using Application.Interfaces;
using Application.Services.Implementations;
using Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.RateLimiting;
using HRMS_API.Middleware;

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true); 

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();
builder.Services.AddMemoryCache();

builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("login", opt =>
    {
        opt.PermitLimit = 5;
        opt.Window = TimeSpan.FromMinutes(1);
        opt.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
        opt.QueueLimit = 0;
    });
    options.RejectionStatusCode = 429;
});
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters
               .Add(new JsonStringEnumConverter());
    });



    builder.Services.AddCors(options =>
    {
    options.AddPolicy("AllowAngular", policy =>
    {
        var allowedOrigins = builder.Configuration
            .GetSection("AllowedOrigins")
            .Get<string[]>();

        if (allowedOrigins != null && allowedOrigins.Length > 0)
        {
            policy.WithOrigins(allowedOrigins)
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        }
        else
        {
            // Development fallback only
            policy.SetIsOriginAllowed(_ => true)
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        }
    });
    });



// JWT Configuration Validation

var jwtKey = builder.Configuration["Jwt:Key"];
      var jwtIssuer = builder.Configuration["Jwt:Issuer"];
      var jwtAudience = builder.Configuration["Jwt:Audience"];
   
   if (string.IsNullOrWhiteSpace(jwtKey))
       throw new InvalidOperationException(
           "JWT configuration error: 'Jwt:Key' is missing or empty. " +
           "Please set it in appsettings.json or User Secrets.");
   
   if (string.IsNullOrWhiteSpace(jwtIssuer))
       throw new InvalidOperationException(
           "JWT configuration error: 'Jwt:Issuer' is missing or empty.");
   
   if (string.IsNullOrWhiteSpace(jwtAudience))
       throw new InvalidOperationException(
           "JWT configuration error: 'Jwt:Audience' is missing or empty.");

// Log the JWT configuration status (for development visibility)
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<IAuthService, AuthService>();


// FIDO2 Configuration => fast identity online authentication, for passwordless login and 2FA

builder.Services.AddFido2(options =>
{
    var serverDomain = builder.Configuration["Fido2:ServerDomain"] ?? "localhost";
    options.ServerDomain = serverDomain;
    options.ServerName = "Kawadir HRMS";
    
    var origins = builder.Configuration.GetSection("AllowedOrigins").Get<HashSet<string>>() ?? new HashSet<string>();
    origins.Add($"https://{serverDomain}");
    origins.Add("http://localhost:4200");
    options.Origins = origins;
    
    options.TimestampDriftTolerance = 300000;
});
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddApplication(builder.Configuration);

var app = builder.Build();

// Groq API Key Check (for development visibility)
var groqKey = builder.Configuration["GroqSettings:ApiKey"];
var keyStatus = string.IsNullOrWhiteSpace(groqKey)
    ? " EMPTY / NOT FOUND"
    : $" Found — starts with: {groqKey[..Math.Min(8, groqKey.Length)]}...";
app.Logger.LogWarning("=== GROQ API KEY STATUS: {Status} ===", keyStatus);


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseHttpsRedirection();
}


app.UseCors("AllowAngular");
app.UseRateLimiter();  
app.UseAuthentication();
app.UseAuthorization();
app.UseMiddleware<ExceptionHandlingMiddleware>();
app.MapControllers();


app.Run();