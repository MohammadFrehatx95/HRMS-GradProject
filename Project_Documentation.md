# Documentation: Human Resource Management System (HRMS)

## 1. Project Overview
The HRMS is a comprehensive web-based solution designed to streamline human resource processes, including employee management, attendance tracking, leave requests, and payroll. The system is built using modern web technologies with a focus on security, scalability, and user experience.

## 2. Technical Stack
*   **Frontend**: Angular (v18+), TailwindCSS (for custom styling), RxJS, Signals.
*   **Backend**: ASP.NET Core 8 Web API.
*   **Database**: PostgreSQL with Entity Framework Core (Code-First).
*   **Authentication**: JWT (JSON Web Tokens) with Role-Based Access Control (RBAC).
*   **Architecture**: Clean Architecture (Onion Architecture) comprising:
    *   **Domain**: Entities, Enums, and Core Interfaces.
    *   **Application**: Business Logic, DTOs, Mapping, and Service Interfaces.
    *   **Infrastructure**: Database context, Repositories, and External Services.
    *   **API**: Controllers, Middleware, and Configurations.

## 3. Core Features
### A. Authentication & Security
*   Secure Login/Register system.
*   JWT-based authentication with auto-logout on expiration.
*   Role-based access (Admin, HR, Employee).
*   Global Exception Handling middleware for standardized API responses.

### B. Employee Management
*   Full CRUD operations for employee records.
*   Department and Position assignment.
*   Profile management for individual employees.

### C. Attendance & Tracking
*   Daily Clock-in/Clock-out functionality.
*   Tracking total working hours.
*   History of attendance for both employees and managers.

### D. Leave Management
*   Submit leave requests with specific types and reasons.
*   Workflow for approval/rejection by HR or Admins.
*   Status tracking for employees.

### E. Payroll & Salary
*   Automatic salary calculation based on basic pay and bonuses.
*   History of monthly salary slips.

### F. AI Insights (Groq/Gemini Integration)
*   AI-powered analysis of employee performance and attendance patterns.
*   Smart dashboard widgets for quick HR insights.

### G. UI/UX Features
*   Dark/Light mode support.
*   Multi-language support (Arabic/English) with RTL/LTR direction switching.
*   Responsive sidebar and mobile-friendly design.

## 4. Development Challenges & Solutions
To provide a deeper look into the development process, here are the key challenges faced and how they were resolved:

### Challenge 1: Complex Multi-language Support with RTL Layout
**Problem**: Switching between Arabic (RTL) and English (LTR) caused layout breakages in several components, especially the sidebar and tables.
**Solution**: Developed a centralized `SettingsService` using Angular **Signals**. This service dynamically updates the `dir` attribute of the `html` tag and applies specific CSS classes, ensuring a smooth transition without page reloads.

### Challenge 2: Efficient Data Loading for Large Employee Lists
**Problem**: As the number of employees grew, the initial page load for the Employee list became slow due to fetching all data at once.
**Solution**: Implemented a **Generic Repository** pattern with built-in **Pagination** support. The API now returns data in chunks, and the frontend uses lazy loading for tables, significantly improving performance.

### Challenge 3: JWT Expiration UX
**Problem**: Users would suddenly find their actions failing without warning when their token expired, leading to a confusing experience.
**Solution**: Created a custom **HTTP Interceptor** that monitors 401/403 status codes. Upon expiration, it triggers a user-friendly **SweetAlert2** popup notifying the user before redirecting them to the login page, while also clearing invalid local storage data.

### Challenge 4: Managing Complex Relationships in Entity Framework
**Problem**: Dealing with circular references and complex deletions (e.g., deleting a department while it has employees) led to database constraint errors.
**Solution**: Carefully configured **Fluent API** in the `AppDbContext` to handle Cascade and NoAction delete behaviors correctly, ensuring data integrity while allowing for necessary bulk operations.

### Challenge 5: Cross-Origin Resource Sharing (CORS) in Production
**Problem**: After deploying the backend to Render and the frontend to a different host, authentication requests were blocked by CORS policies.
**Solution**: Configured a dynamic CORS policy in `Program.cs` that allows specific production origins and handles HTTP methods correctly, ensuring secure communication between the separated layers.

## 5. Future Enhancements
*   Mobile application using Ionic or React Native.
*   Integration with biometric attendance devices.
*   Advanced PDF generation for payroll and reports.
*   More detailed AI-driven predictive analysis for employee turnover.
