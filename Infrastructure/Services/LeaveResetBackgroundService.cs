using System;
using System.Threading;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces;
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
                
                // Run on January 1st
                if (now.Month == 1 && now.Day == 1)
                {
                    using var scope = serviceProvider.CreateScope();
                    var uow = scope.ServiceProvider.GetRequiredService<IUnitOfWork>();
                    
                    var employees = await uow.Repository<Employee>().GetAllAsync();
                    bool updated = false;
                    
                    foreach (var emp in employees)
                    {
                        if (emp.AnnualLeaveBalance < 14) // Only reset if it's less than 14
                        {
                            emp.AnnualLeaveBalance = 14;
                            uow.Repository<Employee>().Update(emp);
                            updated = true;
                        }
                    }
                    
                    if (updated)
                    {
                        await uow.SaveChangesAsync();
                        logger.LogInformation("Annual leave balances have been reset for {Year}", now.Year);
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
