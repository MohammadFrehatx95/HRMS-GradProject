using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.Interfaces
{
    public interface IEmailService
    {
        Task SendWelcomeAsync(string toEmail, string username);
        Task SendLeaveRequestedAsync(string toEmail, string employeeName,
            string leaveType, DateTime start, DateTime end);
        Task SendLeaveStatusAsync(string toEmail, string employeeName,
            string leaveType, bool isApproved, string? rejectionReason);
        Task SendLeaveCancelledAsync(string toEmail, string employeeName,
            string leaveType);
        Task SendClockInAsync(string toEmail, string employeeName, TimeOnly clockIn);
        Task SendClockOutAsync(string toEmail, string employeeName,
            TimeOnly clockIn, TimeOnly clockOut);
        Task SendSalaryCreatedAsync(string toEmail, string employeeName,
            int month, int year, decimal netAmount);
        Task SendSalaryUpdatedAsync(string toEmail, string employeeName,
            int month, int year, decimal netAmount);
            
        // New Features
        Task SendAnnouncementAsync(string toEmail, string employeeName, string title, string priority);
        Task SendMeetingInvitationAsync(string toEmail, string employeeName, string title, DateTime meetingDate, string organizerName);
        Task SendPayrollAdjustmentAsync(string toEmail, string employeeName, string type, decimal amount, string reason);
    }
}
