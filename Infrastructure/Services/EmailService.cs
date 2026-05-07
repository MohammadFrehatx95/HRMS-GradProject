// Infrastructure/Services/EmailService.cs
using Application.Interfaces;
using Application.Services.Interfaces;
using Application.Settings;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

public class EmailService(IOptions<EmailSettings> options) : IEmailService
{
    private readonly EmailSettings _settings = options.Value;

    // ── Core Send ─────────────────────────────────────────
    private async Task SendAsync(
        string toEmail, string toName, string subject, string htmlBody)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(_settings.FromName, _settings.FromEmail));
        message.To.Add(new MailboxAddress(toName, toEmail));
        message.Subject = subject;
        message.Body = new BodyBuilder { HtmlBody = htmlBody }.ToMessageBody();

        using var client = new SmtpClient();
        await client.ConnectAsync(
            _settings.Host, _settings.Port, SecureSocketOptions.StartTls);
        await client.AuthenticateAsync(_settings.Username, _settings.Password);
        await client.SendAsync(message);
        await client.DisconnectAsync(true);
    }

    // ── Template Builder ──────────────────────────────────
    private static string BuildTemplate(
        string title, string color, string body)
    {
        return $$"""
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8"/>
          <style>
            body {
              font-family: 'Segoe UI', sans-serif;
              background: #f1f5f9;
              margin: 0;
              padding: 32px;
            }
            .card {
              max-width: 560px;
              margin: auto;
              background: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 24px rgba(0,0,0,0.08);
            }
            .header {
              background: {{color}};
              padding: 32px;
              text-align: center;
              color: #ffffff;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              font-weight: 600;
              letter-spacing: 0.5px;
            }
            .header p {
              margin: 8px 0 0;
              opacity: 0.85;
              font-size: 13px;
            }
            .body {
              padding: 32px;
              color: #334155;
              line-height: 1.7;
              font-size: 15px;
            }
            .row {
              display: flex;
              justify-content: space-between;
              padding: 10px 0;
              border-bottom: 1px solid #f1f5f9;
            }
            .label {
              color: #94a3b8;
              font-size: 13px;
            }
            .value {
              font-weight: 600;
              font-size: 14px;
              color: #1e293b;
            }
            .footer {
              text-align: center;
              padding: 20px 32px;
              background: #f8fafc;
              color: #94a3b8;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h1>{{title}}</h1>
              <p>HRMS — Human Resource Management System</p>
            </div>
            <div class="body">{{body}}</div>
            <div class="footer">
              This is an automated email from HRMS. Please do not reply.
            </div>
          </div>
        </body>
        </html>
        """;
    }

    // ── Welcome ───────────────────────────────────────────
    public async Task SendWelcomeAsync(string toEmail, string username)
    {
        var body = $$"""
            <p>Hello <strong>{{username}}</strong>,</p>
            <p>Your account has been successfully created in the HRMS system.</p>
            <br/>
            <div class="row">
              <span class="label">Email</span>
              <span class="value">{{toEmail}}</span>
            </div>
            <div class="row">
              <span class="label">Status</span>
              <span class="value" style="color:#10b981">Active</span>
            </div>
            <br/>
            <p style="color:#64748b; font-size:13px;">
              You can log in using your email and password.
            </p>
        """;

        await SendAsync(
            toEmail, username,
            "Welcome to HRMS",
            BuildTemplate("Welcome", "#6366f1", body));
    }

    // ── Leave Requested ───────────────────────────────────
    public async Task SendLeaveRequestedAsync(
        string toEmail, string employeeName,
        string leaveType, DateTime start, DateTime end)
    {
        var days = (int)(end.Date - start.Date).TotalDays + 1;

        var body = $$"""
            <p>A new leave request has been submitted and requires your review.</p>
            <br/>
            <div class="row">
              <span class="label">Employee</span>
              <span class="value">{{employeeName}}</span>
            </div>
            <div class="row">
              <span class="label">Leave Type</span>
              <span class="value">{{leaveType}}</span>
            </div>
            <div class="row">
              <span class="label">From</span>
              <span class="value">{{start:yyyy-MM-dd}}</span>
            </div>
            <div class="row">
              <span class="label">To</span>
              <span class="value">{{end:yyyy-MM-dd}}</span>
            </div>
            <div class="row">
              <span class="label">Total Days</span>
              <span class="value">{{days}} days</span>
            </div>
        """;

        await SendAsync(
            toEmail, "HR Team",
            $"New Leave Request — {employeeName}",
            BuildTemplate("New Leave Request", "#f59e0b", body));
    }

    // ── Leave Status ──────────────────────────────────────
    public async Task SendLeaveStatusAsync(
        string toEmail, string employeeName,
        string leaveType, bool isApproved, string? rejectionReason)
    {
        var color = isApproved ? "#10b981" : "#ef4444";
        var status = isApproved ? "Approved" : "Rejected";

        var extra = !isApproved && rejectionReason is not null
            ? $$"""
               <div class="row">
                 <span class="label">Rejection Reason</span>
                 <span class="value" style="color:#ef4444">{{rejectionReason}}</span>
               </div>
               """
            : string.Empty;

        var body = $$"""
            <p>Hello <strong>{{employeeName}}</strong>,</p>
            <p>Your leave request status has been updated.</p>
            <br/>
            <div class="row">
              <span class="label">Leave Type</span>
              <span class="value">{{leaveType}}</span>
            </div>
            <div class="row">
              <span class="label">Status</span>
              <span class="value" style="color:{{color}}">{{status}}</span>
            </div>
            {{extra}}
        """;

        await SendAsync(
            toEmail, employeeName,
            $"Leave Request {status} — {leaveType}",
            BuildTemplate($"Leave {status}", color, body));
    }

    // ── Leave Cancelled ───────────────────────────────────
    public async Task SendLeaveCancelledAsync(
        string toEmail, string employeeName, string leaveType)
    {
        var body = $$"""
            <p>A leave request has been cancelled by the employee.</p>
            <br/>
            <div class="row">
              <span class="label">Employee</span>
              <span class="value">{{employeeName}}</span>
            </div>
            <div class="row">
              <span class="label">Leave Type</span>
              <span class="value">{{leaveType}}</span>
            </div>
        """;

        await SendAsync(
            toEmail, "HR Team",
            $"Leave Request Cancelled — {employeeName}",
            BuildTemplate("Leave Cancelled", "#64748b", body));
    }

    // ── Clock In ──────────────────────────────────────────
    public async Task SendClockInAsync(
        string toEmail, string employeeName, TimeOnly clockIn)
    {
        var body = $$"""
            <p>Hello <strong>{{employeeName}}</strong>,</p>
            <p>Your attendance has been successfully recorded.</p>
            <br/>
            <div class="row">
              <span class="label">Clock In Time</span>
              <span class="value">{{clockIn:HH:mm}}</span>
            </div>
            <div class="row">
              <span class="label">Date</span>
              <span class="value">{{DateTime.UtcNow:yyyy-MM-dd}}</span>
            </div>
        """;

        await SendAsync(
            toEmail, employeeName,
            "Clock In Recorded",
            BuildTemplate("Clock In Recorded", "#10b981", body));
    }

    // ── Clock Out ─────────────────────────────────────────
    public async Task SendClockOutAsync(
        string toEmail, string employeeName,
        TimeOnly clockIn, TimeOnly clockOut)
    {
        var total = clockOut.ToTimeSpan() - clockIn.ToTimeSpan();

        var body = $$"""
            <p>Hello <strong>{{employeeName}}</strong>,</p>
            <p>Your clock-out has been successfully recorded.</p>
            <br/>
            <div class="row">
              <span class="label">Clock In</span>
              <span class="value">{{clockIn:HH:mm}}</span>
            </div>
            <div class="row">
              <span class="label">Clock Out</span>
              <span class="value">{{clockOut:HH:mm}}</span>
            </div>
            <div class="row">
              <span class="label">Total Hours</span>
              <span class="value">{{(int)total.TotalHours}}h {{total.Minutes}}m</span>
            </div>
        """;

        await SendAsync(
            toEmail, employeeName,
            "Clock Out Recorded",
            BuildTemplate("Clock Out Recorded", "#6366f1", body));
    }

    // ── Salary Created ────────────────────────────────────
    public async Task SendSalaryCreatedAsync(
        string toEmail, string employeeName,
        int month, int year, decimal netAmount)
    {
        var body = $$"""
            <p>Hello <strong>{{employeeName}}</strong>,</p>
            <p>Your salary statement for this month is now available.</p>
            <br/>
            <div class="row">
              <span class="label">Month / Year</span>
              <span class="value">{{month}} / {{year}}</span>
            </div>
            <div class="row">
              <span class="label">Net Salary</span>
              <span class="value" style="color:#10b981; font-size:18px;">
                {{netAmount:N2}} JD
              </span>
            </div>
        """;

        await SendAsync(
            toEmail, employeeName,
            $"Salary Statement — {month}/{year}",
            BuildTemplate("Salary Statement", "#10b981", body));
    }

    // ── Salary Updated ────────────────────────────────────
    public async Task SendSalaryUpdatedAsync(
        string toEmail, string employeeName,
        int month, int year, decimal netAmount)
    {
        var body = $$"""
            <p>Hello <strong>{{employeeName}}</strong>,</p>
            <p>Your salary statement has been updated.</p>
            <br/>
            <div class="row">
              <span class="label">Month / Year</span>
              <span class="value">{{month}} / {{year}}</span>
            </div>
            <div class="row">
              <span class="label">Updated Net Salary</span>
              <span class="value" style="color:#10b981; font-size:18px;">
                {{netAmount:N2}} JD
              </span>
            </div>
        """;

        await SendAsync(
            toEmail, employeeName,
            $"Salary Updated — {month}/{year}",
            BuildTemplate("Salary Updated", "#f59e0b", body));
    }
}