
using System;
using System.Threading;
using System.Threading.Tasks;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Services;

public class LeaveResetBackgroundService(IServiceProvider serviceProvider, ILogger<LeaveResetBackgroundService> logger) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        logger.LogInformation("LeaveResetBackgroundService is starting.");
        
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                var now = DateTime.UtcNow;
                
                using var scope = serviceProvider.CreateScope();
                var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                
                var settings = await dbContext.LeaveSettings.FirstOrDefaultAsync(s => s.Id == 1, stoppingToken);
                if (settings != null && now.Month == settings.ResetMonth && now.Day == settings.ResetDay)
                {
                    // Check if already reset today
                    if (!settings.LastResetDate.HasValue || settings.LastResetDate.Value.Date != now.Date)
                    {
                        logger.LogInformation("Resetting employee leave balances based on database settings.");
                        
                        var rowsAffected = await dbContext.Database.ExecuteSqlRawAsync(
                            @"UPDATE ""Employees"" 
                              SET ""AnnualLeaveBalance"" = {0}, 
                                  ""SickLeaveBalance"" = {1}, 
                                  ""EmergencyLeaveBalance"" = {2}", 
                            settings.DefaultAnnualLeave, 
                            settings.DefaultSickLeave, 
                            settings.DefaultEmergencyLeave);

                        settings.LastResetDate = now.Date;
                        dbContext.LeaveSettings.Update(settings);
                        await dbContext.SaveChangesAsync(stoppingToken);

                        logger.LogInformation("Successfully reset leave balances for {Count} employees.", rowsAffected);
                    }
                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error occurred executing LeaveResetBackgroundService.");
            }

            // Calculate delay until next day at midnight
            var nowUtc = DateTime.UtcNow;
            var tomorrow = nowUtc.AddDays(1).Date;
            var delay = tomorrow - nowUtc;
            
            await Task.Delay(delay, stoppingToken);
        }
    }
}
