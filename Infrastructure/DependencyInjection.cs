using Application.Mappings;
using Application.Services.Implementations;
using Application.Services.Interfaces;
using Application.Settings;
using Domain.Interfaces;
using Infrastructure.Data;
using Infrastructure.Data.Repositories;
using Infrastructure.Repositories;
using Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;



namespace Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // Database
        services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(
                configuration.GetConnectionString("DefaultConnection")));



        // UnitOfWork
        services.AddScoped<IUnitOfWork, UnitOfWork>();

        // MemoryCache (required by HrAiService)
        services.AddMemoryCache();

        services.AddHostedService<LeaveResetBackgroundService>();

        return services;
    }

    public static IServiceCollection AddApplication(
     this IServiceCollection services, IConfiguration configuration)
    {
        // AutoMapper
        services.AddAutoMapper(cfg => cfg.AddProfile<MappingProfile>());

        // Services
        services.AddScoped<IEmployeeService, EmployeeService>();
        services.AddScoped<IDepartmentService, DepartmentService>();
        services.AddScoped<IPositionService, PositionService>();
        services.AddScoped<ILeaveService, LeaveService>();
        services.AddScoped<ILeaveSettingService, LeaveSettingService>();
        services.AddScoped<IAttendanceService, AttendanceService>();
        
        services.AddScoped<ISalaryService, SalaryService>();
        services.AddScoped<IAnnouncementService, AnnouncementService>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IPayrollAdjustmentService, PayrollAdjustmentService>();
        services.AddScoped<IMeetingService, MeetingService>();

        services.AddScoped<INotificationService, NotificationService>();
        services.AddScoped<IEmailService, EmailService>();
        services.AddScoped<IImageService, CloudinaryService>();

        // Ai 
        services.Configure<GroqSettings>(configuration.GetSection("GroqSettings"));
        services.AddHttpClient(); 
        services.AddScoped<IHrAiService, HrAiService>();


        // obtain IConfiguration from the service collection to avoid missing 'configuration' variable

        services.Configure<EmailSettings>(configuration.GetSection("EmailSettings"));
        
        services.Configure<AttendanceSettings>(configuration.GetSection("AttendanceSettings"));

        return services;
    }
}