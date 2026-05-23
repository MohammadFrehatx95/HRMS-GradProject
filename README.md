<div align="center">

# 🏢 HRMS — Human Resource Management System

**A full-stack enterprise-grade HR management platform**  
built with **.NET 8 Clean Architecture** · **PostgreSQL** · **Angular**

<br/>

![.NET](https://img.shields.io/badge/.NET_8-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![AutoMapper](https://img.shields.io/badge/AutoMapper-BE4B48?style=for-the-badge&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)

<br/>

> 🎓 Graduation Project — Computer Science · 2026  
> 👨‍💻 Abedalqader Alfaqeeh · Mohammad Frehat · Saad Rabadi · Mohammad Alghazo

<br/>

[📖 Documentation](#-api-endpoints) · [🚀 Quick Start](#-getting-started) · [🏗 Architecture](#-architecture) · [✅ Progress](#-progress)

</div>

---

## ✨ What is HRMS?

HRMS is a comprehensive **Human Resource Management System** that gives organizations full control over their workforce.  
From hiring to payroll — everything in one place, secured with role-based access and a clean modern interface.

```
🔐 Secure Login          →   JWT Authentication + BCrypt password hashing
👥 Employee Management   →   Full CRUD with profiles, departments, positions
🏢 Department Control    →   Organize teams and track headcount
🪑 Position Management   →   Define roles within each department
📅 Leave Management      →   Request, approve, and track employee leaves
⏰ Attendance Tracking   →   Daily check-in/check-out with history
💰 Salary Management     →   Payroll records per employee
🔔 Notifications         →   Real-time alerts for HR events
📊 Admin Dashboard       →   Statistics, user control, activity feed
📧 Email Service         →   SMTP notifications for key events
```

---

## 🏗 Architecture

This project follows **Clean Architecture** — a layered design where each layer has a single responsibility and dependencies only point inward.

```
┌──────────────────────────────────────────────────────┐
│                     HRMS_API                         │
│              (Presentation Layer)                    │
│   Controllers · Middleware · Filters · Swagger       │
└─────────────────────┬────────────────────────────────┘
                      │  depends on
┌─────────────────────▼────────────────────────────────┐
│                  Application                         │
│               (Business Logic Layer)                 │
│      Services · DTOs · Interfaces · AutoMapper       │
└─────────────────────┬────────────────────────────────┘
                      │  depends on
┌─────────────────────▼────────────────────────────────┐
│                Infrastructure                        │
│               (Data Access Layer)                    │
│   AppDbContext · Repositories · UnitOfWork · EF Core │
└─────────────────────┬────────────────────────────────┘
                      │  depends on
┌─────────────────────▼────────────────────────────────┐
│                    Domain                            │
│                  (Core Layer)                        │
│           Entities · Enums · Interfaces              │
│              ⬆ zero external dependencies            │
└──────────────────────────────────────────────────────┘
```

### Key Patterns Used

| Pattern | Purpose |
|---|---|
| **Generic Repository** | Single `Repository<T>()` for all entities — no duplication |
| **Unit of Work** | Wraps all repositories + single `SaveChangesAsync()` |
| **Clean Architecture** | Separation of concerns across 4 projects |
| **DTO Pattern** | Never expose domain entities directly to clients |
| **Unified API Response** | Every endpoint returns `ApiResponse<T>` |
| **Global Exception Handling** | One middleware catches all unhandled exceptions |
| **Pagination** | `PagedResult<T>` for all list endpoints |

---

## 🛠 Tech Stack

### Backend
| Technology | Version | Usage |
|---|---|---|
| ASP.NET Core | .NET 8 | Web API framework |
| Entity Framework Core | 8.x | ORM + Migrations |
| PostgreSQL | 15+ | Primary database |
| JWT Bearer | 8.x | Authentication |
| BCrypt.Net | 4.x | Password hashing |
| AutoMapper | 13.x | Entity ↔ DTO mapping |
| Swagger / OpenAPI | 6.x | API documentation |

### Frontend
| Technology | Usage |
|---|---|
| Angular 17+ | SPA Framework |
| TypeScript | Type-safe code |
| Angular Router | Navigation + Guards |
| HTTP Interceptors | JWT injection + Error handling |
| RxJS | Reactive data streams |

---

## 📁 Project Structure

```
HRMS-GradProject/
│
├── 📦 Domain/                         ← Core (zero dependencies)
│   ├── Entities/
│   │   ├── Employee.cs
│   │   ├── Department.cs
│   │   ├── Position.cs
│   │   ├── User.cs
│   │   ├── LeaveRequest.cs
│   │   ├── Attendance.cs
│   │   ├── Salary.cs
│   │   └── Notification.cs
│   ├── Enums/
│   │   ├── UserRole.cs                (Admin · HR · Employee)
│   │   ├── LeaveType.cs
│   │   ├── LeaveStatus.cs
│   │   └── NotificationType.cs
│   └── Interfaces/
│       ├── IGenericRepository.cs
│       └── IUnitOfWork.cs
│
├── 📦 Application/                    ← Business Logic
│   ├── Common/
│   │   ├── ApiResponse.cs             ← unified response wrapper
│   │   └── PagedResult.cs             ← pagination
│   ├── DTOs/
│   │   ├── Auth/                      (Login · Register · Me · ChangePassword)
│   │   ├── Employee/                  (Employee · Create · Update · Profile)
│   │   ├── Department/
│   │   ├── Position/
│   │   ├── Leave/
│   │   ├── Attendance/
│   │   ├── Salary/
│   │   ├── Notification/
│   │   ├── Email/
│   │   └── Dashboard/
│   ├── Services/
│   │   ├── Interfaces/                (IAuthService · IEmployeeService · ...)
│   │   └── Implementations/           (AuthService · EmployeeService · ...)
│   └── Mapping/
│       └── MappingProfile.cs
│
├── 📦 Infrastructure/                 ← Data Access
│   ├── Data/
│   │   ├── AppDbContext.cs
│   │   └── Repositories/
│   │       ├── GenericRepository.cs
│   │       └── UnitOfWork.cs
│   ├── Services/
│   │   ├── JwtService.cs
│   │   └── EmailService.cs
│   ├── Migrations/
│   └── DependencyInjection.cs
│
├── 📦 HRMS_API/                       ← Presentation
│   ├── Controllers/
│   │   ├── AuthController.cs
│   │   ├── EmployeeController.cs
│   │   ├── DepartmentController.cs
│   │   ├── PositionController.cs
│   │   ├── LeaveController.cs
│   │   ├── AttendanceController.cs
│   │   ├── SalaryController.cs
│   │   ├── NotificationController.cs
│   │   └── DashboardController.cs
│   ├── Middleware/
│   │   └── ExceptionHandlingMiddleware.cs
│   ├── Filters/
│   │   └── ValidateModelAttribute.cs
│   ├── appsettings.json
│   └── Program.cs
│
└── 📦 Frontend/                       ← Angular
    └── src/app/
        ├── core/
        │   ├── guards/                (auth.guard · role.guard)
        │   ├── interceptors/          (jwt · error)
        │   ├── services/              (auth · employee · department · ...)
        │   └── models/
        ├── shared/
        │   └── components/            (navbar · sidebar · pagination · ...)
        └── features/
            ├── auth/
            ├── dashboard/
            ├── employees/
            ├── departments/
            ├── positions/
            ├── leave/
            ├── attendance/
            ├── salary/
            └── notifications/
```

---

## 📡 API Endpoints

### 🔐 Auth
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/login` | Public | Login → returns JWT token |
| `POST` | `/api/auth/register` | Admin | Register new user |
| `POST` | `/api/auth/change-password` | Auth | Change own password |
| `GET` | `/api/auth/me` | Auth | Get current user from token |

### 👥 Employees
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/employees?pageNumber=1&pageSize=10` | HR · Admin | All employees (paginated) |
| `GET` | `/api/employees/{id}` | Auth | Get by ID |
| `GET` | `/api/employees/{id}/profile` | Auth | Full profile (dept + position) |
| `GET` | `/api/employees/me` | Employee | My own profile |
| `POST` | `/api/employees` | Admin | Add employee |
| `PUT` | `/api/employees/{id}` | HR · Admin | Update employee |
| `DELETE` | `/api/employees/{id}` | Admin | Delete employee |

### 🏢 Departments
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/departments` | Auth | All departments |
| `GET` | `/api/departments/{id}` | Auth | Get by ID |
| `POST` | `/api/departments` | Admin | Create department |
| `PUT` | `/api/departments/{id}` | Admin | Update department |
| `DELETE` | `/api/departments/{id}` | Admin | Delete department |

### 🪑 Positions
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/positions` | Auth | All positions |
| `GET` | `/api/positions/{id}` | Auth | Get by ID |
| `GET` | `/api/positions/department/{id}` | Auth | Positions by department |
| `POST` | `/api/positions` | Admin | Create position |
| `PUT` | `/api/positions/{id}` | Admin | Update position |
| `DELETE` | `/api/positions/{id}` | Admin | Delete position |

### 📅 Leave
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/leaves` | HR · Admin | All leave requests (paginated) |
| `GET` | `/api/leaves/{id}` | Auth | Get leave request by ID |
| `GET` | `/api/leaves/my` | Employee | My leave requests |
| `POST` | `/api/leaves` | Employee | Submit leave request |
| `PUT` | `/api/leaves/{id}/approve` | HR · Admin | Approve request |
| `PUT` | `/api/leaves/{id}/reject` | HR · Admin | Reject request |
| `DELETE` | `/api/leaves/{id}` | Employee | Cancel pending request |

### ⏰ Attendance
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/attendance` | HR · Admin | All records (paginated) |
| `GET` | `/api/attendance/{id}` | Auth | Get record by ID |
| `GET` | `/api/attendance/my` | Employee | My attendance history |
| `GET` | `/api/attendance/employee/{id}` | HR · Admin | Specific employee attendance |
| `POST` | `/api/attendance/check-in` | Employee | Check in |
| `POST` | `/api/attendance/check-out` | Employee | Check out |

### 💰 Salary
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/salaries` | Admin | All salary records (paginated) |
| `GET` | `/api/salaries/{id}` | HR · Admin | Get salary record by ID |
| `GET` | `/api/salaries/employee/{id}` | HR · Admin | Employee salary history |
| `GET` | `/api/salaries/my` | Employee | My salary records |
| `POST` | `/api/salaries` | Admin | Add salary record |
| `PUT` | `/api/salaries/{id}` | Admin | Update salary record |
| `DELETE` | `/api/salaries/{id}` | Admin | Delete salary record |

### 🔔 Notifications
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/notifications` | Auth | My notifications |
| `GET` | `/api/notifications/unread-count` | Auth | Count of unread notifications |
| `PUT` | `/api/notifications/{id}/read` | Auth | Mark as read |
| `PUT` | `/api/notifications/read-all` | Auth | Mark all as read |
| `DELETE` | `/api/notifications/{id}` | Auth | Delete notification |

### 📊 Dashboard
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/dashboard/stats` | Admin | General statistics (employees, leaves, attendance) |
| `GET` | `/api/dashboard/users` | Admin | All users with status |
| `PUT` | `/api/dashboard/users/{id}/toggle-active` | Admin | Activate / deactivate user |
| `GET` | `/api/dashboard/recent-activity` | Admin | Latest activity feed |
| `GET` | `/api/dashboard/leave-summary` | Admin | Leave requests summary by status |
| `GET` | `/api/dashboard/attendance-today` | Admin | Today's attendance summary |

---

## 🚀 Getting Started

### Prerequisites

```bash
# Required
✅ .NET 8 SDK        → https://dotnet.microsoft.com/download
✅ PostgreSQL 15+    → https://www.postgresql.org/download
✅ Node.js 18+       → https://nodejs.org
✅ Angular CLI       → npm install -g @angular/cli

# Optional
💡 pgAdmin          → GUI for PostgreSQL
💡 Postman          → API testing
```

### Backend Setup

```bash
# 1. Clone the repo
git clone https://github.com/your-username/HRMS-GradProject.git
cd HRMS-GradProject

# 2. Restore packages
dotnet restore

# 3. Configure appsettings.json (see Environment Variables)

# 4. Apply migrations
dotnet ef database update --project Infrastructure --startup-project HRMS_API

# 5. Run
dotnet run --project HRMS_API

# Swagger → https://localhost:7204/swagger
```

### Frontend Setup

```bash
cd Frontend
npm install
ng serve
# → http://localhost:4200
```

---

## ⚙️ Environment Variables

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=HRMSDb;Username=postgres;Password=yourpassword"
  },
  "Jwt": {
    "Key": "YourSuperSecretKeyHere_AtLeast32Chars!!",
    "Issuer": "HRMS_API",
    "Audience": "HRMS_Client",
    "ExpiryHours": "24"
  },
  "Email": {
    "Host": "smtp.gmail.com",
    "Port": "587",
    "Username": "your@email.com",
    "Password": "your-app-password"
  }
}
```

> ⚠️ Never commit real secrets to GitHub.
> ```bash
> dotnet user-secrets set "Jwt:Key" "YourSecretKey" --project HRMS_API
> ```

---

## 🗄 Database

```bash
# Add migration
dotnet ef migrations add MigrationName --project Infrastructure --startup-project HRMS_API

# Apply
dotnet ef database update --project Infrastructure --startup-project HRMS_API

# Rollback
dotnet ef migrations remove --project Infrastructure --startup-project HRMS_API
```

### Seed Data
| Table | Records |
|---|---|
| Departments | HR · IT · Finance · Operations |
| Positions | 7 positions across all departments |
| Users | 1 Admin + sample users |
| Employees | Sample employees linked to departments |

---

## 🔒 Roles & Permissions

| Action | Employee | HR | Admin |
|---|---|---|---|
| Login / Change password | ✅ | ✅ | ✅ |
| View own profile | ✅ | ✅ | ✅ |
| View all employees | ❌ | ✅ | ✅ |
| Add / Delete employee | ❌ | ❌ | ✅ |
| Update employee | ❌ | ✅ | ✅ |
| Submit leave request | ✅ | ✅ | ✅ |
| Approve / Reject leave | ❌ | ✅ | ✅ |
| Check in / Check out | ✅ | ✅ | ✅ |
| View all attendance | ❌ | ✅ | ✅ |
| Manage departments | ❌ | ❌ | ✅ |
| Manage positions | ❌ | ❌ | ✅ |
| Register new users | ❌ | ❌ | ✅ |
| View own salary | ✅ | ✅ | ✅ |
| View all salary records | ❌ | ✅ | ✅ |
| Manage salaries | ❌ | ❌ | ✅ |
| View notifications | ✅ | ✅ | ✅ |
| View dashboard | ❌ | ❌ | ✅ |

---

## 🧱 Core Concepts

### Unified API Response
```json
{
  "success": true,
  "message": "Login successful",
  "data": { "token": "eyJ...", "email": "admin@hrms.com" },
  "errors": null
}
```

### Pagination
```json
{
  "items": [...],
  "totalCount": 95,
  "pageNumber": 1,
  "pageSize": 10,
  "totalPages": 10,
  "hasPreviousPage": false,
  "hasNextPage": true
}
```

### Global Exception Handling
| Exception | HTTP Status |
|---|---|
| `KeyNotFoundException` | `404 Not Found` |
| `UnauthorizedAccessException` | `401 Unauthorized` |
| `ArgumentException` | `400 Bad Request` |
| `InvalidOperationException` | `400 Bad Request` |
| Anything else | `500 Internal Server Error` |

---

## ✅ Progress

### Backend
| Module | Status |
|---|---|
| Auth (Login · Register · Me · Change Password) | ✅ Done |
| Employee CRUD + Profile + Pagination | ✅ Done |
| Department CRUD | ✅ Done |
| Position CRUD | ✅ Done |
| Global Exception Middleware | ✅ Done |
| Unified ApiResponse + PagedResult | ✅ Done |
| Leave Management | ✅ Done |
| Attendance Tracking | ✅ Done |
| Salary Management | ✅ Done |
| Notification System | ✅ Done |
| Email Service | ✅ Done |
| Admin Dashboard | ✅ Done |

### Frontend (Angular)
| Module | Status |
|---|---|
| Auth (Login · Logout · Change Password) | ✅ Done |
| Admin Dashboard | ✅ Done |
| Employees (List · Profile · Add · Edit) | ✅ Done |
| Departments & Positions | ✅ Done |
| Leave Management | ✅ Done |
| Attendance Tracking | ✅ Done |
| Salary Records | ✅ Done |
| Notifications | ✅ Done |

---

## 🤝 Contributing

This is a graduation project. Contributions from team members are welcome.

```bash
# 1. Create a feature branch
git checkout -b feature/your-feature-name

# 2. Commit your changes
git commit -m "feat: add leave approval logic"

# 3. Push and open a pull request
git push origin feature/your-feature-name
```

### Commit Convention
| Prefix | When to use |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `refactor:` | Code refactor without behavior change |
| `docs:` | README or documentation update |
| `style:` | Formatting, missing semicolons, etc. |
| `chore:` | Build process, dependency updates |

---

## 👨‍💻 Authors

| Name | Role |
|---|---|
| **Abedalqader Alfaqeeh** | Backend Lead · Clean Architecture |
| **Mohammad Frehat** | Frontend Developer |
| **Saad Rabadi** | UI/UX Designer |
| **Mohammad Alghazo** | Frontend Developer |

---

## 📄 License

This project is developed as a graduation project for academic purposes.  
© 2026 HRMS Team — Computer Science Department.

---

<div align="center">

**Built with ❤️ — HRMS Grad Project 2026**

![Made with .NET](https://img.shields.io/badge/Made_with-.NET_8-512BD4?style=flat-square&logo=dotnet)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-316192?style=flat-square&logo=postgresql)
![Angular](https://img.shields.io/badge/Frontend-Angular-DD0031?style=flat-square&logo=angular)

</div>
