# Kawādir - Human Resource Management System
## Product Requirements Document (PRD)

### 1. Product Overview
Kawādir is an enterprise-grade, Clean Architecture HR platform that manages the complete employee lifecycle. It features a reactive Angular 19 PWA frontend, an ASP.NET Core 8 backend with a PostgreSQL database, real-time communication via SignalR, and an embedded AI Assistant powered by Groq (LLaMA 3).

### 2. User Roles & Permissions
- **Admin**: Full system access, including managing departments, positions, salaries, and user accounts.
- **HR**: Access to employee records, leave approvals, attendance tracking, and AI Executive mode.
- **Employee**: Can view personal profile, request leave, clock in/out, view salaries, and use the AI assistant in normal mode.

### 3. Core Features & User Flows

#### 3.1. Authentication & User Management
- **Login Flow**: Users log in using email/password. The system returns a JWT token.
- **User Registration Flow**: Admin registers new users into the system (public registration is disabled).
- **Password Management Flow**: Users can update their passwords securely from their profile settings.

#### 3.2. Dashboard & Reporting
- **Live Statistics Flow**: User accesses the dashboard to view real-time metrics (e.g., active employees, pending leaves, attendance stats).
- **Report Generation Flow**: Admin/HR clicks to export system-wide or per-employee reports as PDF files.

#### 3.3. Organization Structure (Departments & Positions)
- **Department Management Flow**: Admin creates, updates, or deletes departments. The system blocks deletion if employees are still assigned.
- **Position Management Flow**: Admin creates job positions and assigns them to specific departments with salary ranges.

#### 3.4. Employee Management
- **Profile Creation Flow**: Admins/HR create employees. The system auto-generates a unique Employee ID based on the hire year and department (e.g., `2026020001`).
- **Profile Pictures Flow**: Employees upload pictures -> Sent to HR for approval queue -> Applied upon approval.

#### 3.5. Attendance Tracking
- **Clock In/Out Flow**: Employee clicks "Clock In". The system records the time. At the end of the shift, "Clock Out" records hours worked. 
- **Auto-Close Flow**: Stale/forgotten sessions are auto-closed by the system at midnight.

#### 3.6. Leave Management
- **Request Leave Flow**: Employee selects dates and leave type. The system checks for overlaps and remaining annual balance before submission.
- **Approval Flow**: Request appears in the HR/Admin queue. HR approves or rejects (with reason). A real-time notification is sent.
- **Annual Reset Flow**: The system automatically resets annual leave balances on January 1st via a Background Service.

#### 3.7. Salary & Payroll Adjustments
- **Adjustment Flow**: HR/Admin creates a bonus or penalty (Adjustment) for an employee.
- **Salary Generation Flow**: Admin generates the monthly salary. The system automatically applies any pending payroll adjustments to calculate the net salary.
- **Payslip Access Flow**: Employees can download their monthly payslips as a PDF.

#### 3.8. AI Assistant (HRMS-AI)
- **Normal Mode Flow**: Employees chat with AI, which answers using their injected personal HR context.
- **DeepThink Mode Flow**: AI uses tool-calling to query system data (leaves, attendance, salaries) to answer complex HR questions.
- **Executive Mode Flow**: HR/Admin commands the AI to perform actions directly, such as approving or rejecting leave requests.

#### 3.9. Meetings & Announcements
- **Meetings Flow**: HR/Admin schedules a meeting -> Google Meet link is auto-generated -> Invites are sent via email and notifications.
- **Announcements Flow**: HR/Admin broadcasts messages to all or specific employees with expiry dates.

#### 3.10. Notifications & Communications
- **Real-Time Delivery Flow**: The system pushes live notifications via SignalR for events (e.g., leave approved, meeting scheduled).
- **Notification Management Flow**: User clicks to mark notifications as read, view unread badges, or delete them.
- **Automated Emails Flow**: The system fires asynchronous HTML emails for major HR events.

### 4. Technical Integrations & Environment
- **Frontend**: Angular 19, PWA, Bootstrap 5, Chart.js, jsPDF.
- **Backend**: .NET 8 Web API, Entity Framework Core 9.
- **Database**: PostgreSQL 15+.
- **Real-time**: SignalR (Notifications & AI Token tracking).
- **Integrations**: MailKit (SMTP Emails), Cloudinary (Image storage), Groq Cloud API (AI).
