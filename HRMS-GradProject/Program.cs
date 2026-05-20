using Application.Interfaces;
using Application.Services.Implementations;
using Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json.Serialization;
using HRMS_API.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
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
                  .AllowAnyMethod();
        }
        else
        {
            // Development fallback only
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        }
    });
    });



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

builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddApplication(builder.Configuration);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseHttpsRedirection();
}

app.UseCors("AllowAngular");

app.UseAuthentication();
app.UseAuthorization();
app.UseMiddleware<ExceptionHandlingMiddleware>();
app.MapControllers();

app.Run();