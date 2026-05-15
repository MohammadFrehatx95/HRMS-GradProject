# Backend Project Structure and Code


## File: D:\HRMS-Team\Application\Application.csproj


```csproj

<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="AutoMapper" Version="16.1.1" />
    <PackageReference Include="BCrypt.Net-Next" Version="4.1.0" />
    <PackageReference Include="MailKit" Version="4.16.0" />
    <PackageReference Include="MimeKit" Version="4.16.0" />
    <PackageReference Include="System.IdentityModel.Tokens.Jwt" Version="8.17.0" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\Domain\Domain.csproj" />
  </ItemGroup>

</Project>

```

## File: D:\HRMS-Team\Application\Common\ApiResponse.cs


```csharp

// This file defines a generic class `ApiResponse<T>` that represents a standard structure for API responses.
// It includes properties to indicate success, a message, the data being returned, and any errors that may have occurred.
// The class also provides static methods for creating successful and failed responses. Additionally,
// there is a non-generic version of `ApiResponse` for cases where no data is needed.

namespace Application.Common;

public class ApiResponse<T> 
{
    
    public bool Success { get; set; }
   
    public string Message { get; set; } = string.Empty;
    
    public T? Data { get; set; }
    public List<string>? Errors { get; set; }

    public static ApiResponse<T> Ok(T data, string message = "Success") =>
        new() { Success = true, Message = message, Data = data };

    public static ApiResponse<T> Fail(string message, List<string>? errors = null) =>
        new() { Success = false, Message = message, Errors = errors };
}

public class ApiResponse : ApiResponse<object> 
{
    public static ApiResponse Ok(string message = "Success") =>
        new() { Success = true, Message = message };

    public static new ApiResponse Fail(string message, List<string>? errors = null) =>
        new() { Success = false, Message = message, Errors = errors };
}


```

## File: D:\HRMS-Team\Application\Common\PagedResult.cs


```csharp

namespace Application.Common;

public class PagedResult<T>
{
    public List<T> Items { get; set; } = [];
    public int TotalCount { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);
    public bool HasPreviousPage => PageNumber > 1;
    public bool HasNextPage => PageNumber < TotalPages;

    public static PagedResult<T> Create(List<T> items, int totalCount, int pageNumber, int pageSize) =>
        new()
        {
            Items = items,
            TotalCount = totalCount,
            PageNumber = pageNumber,
            PageSize = pageSize
        };
}

```

## File: D:\HRMS-Team\Application\DTOs\Attendance\AttendanceDto.cs


```csharp



namespace Application.DTOs.Attendance
{
   
    public class AttendanceDto
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public TimeOnly ClockIn { get; set; }
        public TimeOnly? ClockOut { get; set; }
        public string? TotalHours { get; set; }  
    }
}

```

## File: D:\HRMS-Team\Application\DTOs\Attendance\ClockInDto.cs


```csharp

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace Application.DTOs.Attendance
{
    
    public class ClockInDto
    {
        [Required]
        public DateTime Date { get; set; }

        [Required]
        public TimeOnly ClockIn { get; set; }
    }
}

```

## File: D:\HRMS-Team\Application\DTOs\Attendance\ClockOutDto.cs


```csharp

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace Application.DTOs.Attendance
{
   
    public class ClockOutDto
    {
        [Required]
        public TimeOnly ClockOut { get; set; }
    }
}

```

## File: D:\HRMS-Team\Application\DTOs\Auth\AuthResponseDto.cs


```csharp

namespace Application.DTOs.Auth;

public class AuthResponseDto
{
    public string Token { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public DateTime ExpiresAt { get; set; }
}

```

## File: D:\HRMS-Team\Application\DTOs\Auth\ChangePasswordDto.cs


```csharp


using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.Auth
{
    public  class ChangePasswordDto
    {
        public string? Email { get; set; }

        [RegularExpression(@"^(?=.*[A-Z])(?=.*\d).{8,}$",
    ErrorMessage = "Must have uppercase letter and number")]
        public string CurrentPassword { get; set; } = null!;
        [Required]
        [MinLength(6)]
        [RegularExpression(@"^(?=.*[A-Z])(?=.*\d).{8,}$",
    ErrorMessage = "Must have uppercase letter and number")]
        public string NewPassword { get; set; } = null!;

        [Required]
        [Compare("NewPassword", ErrorMessage = "Passwords don't match")]
        public string ConfirmNewPassword { get; set; } = null!;


    }
}

```

## File: D:\HRMS-Team\Application\DTOs\Auth\LoginDto.cs


```csharp

using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.Auth;

public class LoginDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MinLength(6)]
    public string Password { get; set; } = string.Empty;
}

```

## File: D:\HRMS-Team\Application\DTOs\Auth\MeDto.cs


```csharp

namespace Application.DTOs.Auth;

public class MeDto
{
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string? EmployeeId { get; set; }
}

```

## File: D:\HRMS-Team\Application\DTOs\Auth\RegisterDto.cs


```csharp

using System.ComponentModel.DataAnnotations;
using Domain.Enums;

namespace Application.DTOs.Auth;

public class RegisterDto
{
    [Required]
    public string Username { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MinLength(6)]
    [RegularExpression(@"^(?=.*[A-Z])(?=.*\d).{8,}$",
    ErrorMessage = "Must have uppercase letter and number")]    
    public string Password { get; set; } = string.Empty;

    public UserRole Role { get; set; } = UserRole.Employee;

    public int? EmployeeId { get; set; }
}

```

## File: D:\HRMS-Team\Application\DTOs\Department\CreateDepartmentDto.cs


```csharp

using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.Department;

public class CreateDepartmentDto
{
    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Name { get; set; } = string.Empty;
}

```

## File: D:\HRMS-Team\Application\DTOs\Department\DepartmentDto.cs


```csharp

namespace Application.DTOs.Department;

public class DepartmentDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int EmployeeCount { get; set; }
}

```

## File: D:\HRMS-Team\Application\DTOs\Department\UpdateDepartmentDto.cs


```csharp

using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.Department;

public class UpdateDepartmentDto
{
    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Name { get; set; } = string.Empty;
}

```

## File: D:\HRMS-Team\Application\DTOs\Employee\CreateEmployeeDto.cs


```csharp

using System.ComponentModel.DataAnnotations;

public class CreateEmployeeDto
{
    [Required]
    public string FirstName { get; set; } = string.Empty;
    [Required]
    public string LastName { get; set; } = string.Empty;
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
    [Required]
    [RegularExpression(@"^\+?\d{10,15}$", ErrorMessage = "Invalid phone number format.")]
    public string PhoneNumber { get; set; } = string.Empty;
    [Required]
    public DateTime HireDate { get; set; }
    [Required]
    public int DepartmentId { get; set; }
    [Required]
    public int UserId { get; set; } 
    [Required]
    public int PositionId { get; set; }
}

```

## File: D:\HRMS-Team\Application\DTOs\Employee\EmployeeDto.cs


```csharp



namespace Application.DTOs.Employee;

public class EmployeeDto
{
    public int Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string FullName => $"{FirstName} {LastName}";  
    public string Email { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public DateTime HireDate { get; set; }
    public bool IsActive { get; set; }
    public int DepartmentId { get; set; }
    public string DepartmentName { get; set; } = string.Empty; 
    // âœ… W1/I4 Fix: Ø£Ø¶Ù PositionId ÙˆPositionTitle Ù„Ø¯Ø¹Ù… Ù†Ù…ÙˆØ°Ø¬ Ø§Ù„ØªØ¹Ø¯ÙŠÙ„ ÙˆØ¹Ø±Ø¶ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª
    public int PositionId { get; set; }
    public string PositionTitle { get; set; } = string.Empty;
    public int UserId { get; set; }
}


```

## File: D:\HRMS-Team\Application\DTOs\Employee\EmployeeProfileDto.cs


```csharp

namespace Application.DTOs.Employee;

public class EmployeeProfileDto
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string DepartmentName { get; set; } = string.Empty;
    public string PositionTitle { get; set; } = string.Empty;
    public DateTime HireDate { get; set; }
}

```

## File: D:\HRMS-Team\Application\DTOs\Employee\UpdateEmployeeDto.cs


```csharp


namespace Application.DTOs.Employee
{
    public class UpdateEmployeeDto
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? PhoneNumber { get; set; }
        public bool? IsActive { get; set; }
        public int? DepartmentId { get; set; }
    }
}

```

## File: D:\HRMS-Team\Application\DTOs\Leave\CreateLeaveDto.cs


```csharp

using Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.Leave
{
    public class CreateLeaveDto
    {
        [Required]
        public LeaveType LeaveType { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        [StringLength(500, MinimumLength = 5)]
        public string Reason { get; set; } = string.Empty;
    }
}

```

## File: D:\HRMS-Team\Application\DTOs\Leave\LeaveDto.cs


```csharp



namespace Application.DTOs.Leave
{
    public class LeaveDto
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; } = string.Empty;
        public string LeaveType { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int TotalDays { get; set; }
        public string Reason { get; set; } = string.Empty;
        public DateTime RequestedAt { get; set; }
        public string RejectionReason { get; set; } = string.Empty;
    }
}

```

## File: D:\HRMS-Team\Application\DTOs\Leave\UpdateLeaveStatusDto.cs


```csharp



using Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.Leave
{
  
    public class UpdateLeaveStatusDto
    {
        [Required]
        public LeaveStatus Status { get; set; }

        public string RejectionReason { get; set; } = string.Empty;
    }
}

```

## File: D:\HRMS-Team\Application\DTOs\Notification\NotificationDto.cs


```csharp

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Notification
{
    public class NotificationDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public bool IsRead { get; set; }
        public string Type { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}

```

## File: D:\HRMS-Team\Application\DTOs\Position\CreatePositionDto.cs


```csharp

using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.Position;

public class CreatePositionDto
{
    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [Range(0, double.MaxValue, ErrorMessage = "SalaryMin must be positive")]
    public decimal SalaryMin { get; set; }

    [Required]
    [Range(0, double.MaxValue, ErrorMessage = "SalaryMax must be positive")]
    public decimal SalaryMax { get; set; }

    [Required]
    public int DepartmentId { get; set; }
}

```

## File: D:\HRMS-Team\Application\DTOs\Position\PositionDto.cs


```csharp

namespace Application.DTOs.Position;

public class PositionDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public decimal SalaryMin { get; set; }
    public decimal SalaryMax { get; set; }
    public int DepartmentId { get; set; }
    public string DepartmentName { get; set; } = string.Empty;
    public int EmployeeCount { get; set; }
}

```

## File: D:\HRMS-Team\Application\DTOs\Position\UpdatePositionDto.cs


```csharp

using System.ComponentModel.DataAnnotations;

namespace Application.DTOs.Position;

public class UpdatePositionDto
{
    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [Range(0, double.MaxValue, ErrorMessage = "SalaryMin must be positive")]
    public decimal SalaryMin { get; set; }

    [Required]
    [Range(0, double.MaxValue, ErrorMessage = "SalaryMax must be positive")]
    public decimal SalaryMax { get; set; }

    [Required]
    public int DepartmentId { get; set; }
}

```

## File: D:\HRMS-Team\Application\DTOs\Salary\CreateSalaryDto.cs


```csharp

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Salary
{
    public class CreateSalaryDto
    {
        [Required]
        public int EmployeeId { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public decimal BaseAmount { get; set; }

        [Range(0, double.MaxValue)]
        public decimal Allowances { get; set; } = 0;

        [Range(0, double.MaxValue)]
        public decimal Deductions { get; set; } = 0;

        [Required]
        [Range(1, 12)]
        public int Month { get; set; }

        [Required]
        [Range(2000, 2100)]
        public int Year { get; set; }

        [Required]
        public DateTime EffectiveDate { get; set; }
    }
}

```

## File: D:\HRMS-Team\Application\DTOs\Salary\SalaryDto.cs


```csharp

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Salary
{
    public class SalaryDto
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; } = string.Empty;
        public decimal BaseAmount { get; set; }
        public decimal Allowances { get; set; }
        public decimal Deductions { get; set; }
        public decimal GrossAmount { get; set; }
        public decimal NetAmount { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public DateTime EffectiveDate { get; set; }
    }
}

```

## File: D:\HRMS-Team\Application\DTOs\Salary\UpdateSalaryDto.cs


```csharp

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Salary
{
  
    public class UpdateSalaryDto
    {
        [Range(0, double.MaxValue)]
        public decimal? BaseAmount { get; set; }

        [Range(0, double.MaxValue)]
        public decimal? Allowances { get; set; }

        [Range(0, double.MaxValue)]
        public decimal? Deductions { get; set; }

        public DateTime? EffectiveDate { get; set; }
    }
}

```

## File: D:\HRMS-Team\Application\DTOs\User\UserDto.cs


```csharp

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.User
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? EmployeeName { get; set; }
    }
}

```

## File: D:\HRMS-Team\Application\Mapping\MappingProfile.cs


```csharp

// Aother : Abedalqader Alfaqeeh
// last Edit : 2026-04-12
// </sammer> the MappingProfile class defines how to map between domain entities and data transfer objects (DTOs) using AutoMapper.
// It includes mappings for the Employee entity, allowing for both retrieval (mapping to EmployeeDto) and creation/update (mapping from CreateEmployeeDto and UpdateEmployeeDto).
// The update mapping is configured to ignore null values, enabling partial updates without overwriting existing data with nulls.

using Application.DTOs.Attendance;
using Application.DTOs.Department;
using Application.DTOs.Employee;
using Application.DTOs.Leave;
using Application.DTOs.Notification;
using Application.DTOs.Position;
using Application.DTOs.Salary;
using Application.DTOs.User;
using AutoMapper;
using Domain.Entities;


namespace Application.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Employee 
        // For retrieval, we want to map from Employee to EmployeeDto, including the department name
        CreateMap<Employee, EmployeeDto>()
            .ForMember(dest => dest.DepartmentName,
                opt => opt.MapFrom(src => src.Department != null ? src.Department.Name : string.Empty))
            // âœ… W1/I4 Fix: map PositionId ÙˆPositionTitle ÙˆUserId
            .ForMember(dest => dest.PositionId,
                opt => opt.MapFrom(src => src.PositionId))
            .ForMember(dest => dest.PositionTitle,
                opt => opt.MapFrom(src => src.Position != null ? src.Position.Title : string.Empty))
            .ForMember(dest => dest.UserId,
                opt => opt.MapFrom(src => src.UserId));


        // For creation, we want to map from CreateEmployeeDto to Employee
        CreateMap<CreateEmployeeDto, Employee>();

        // For update, we want to ignore null values to allow partial updates
        CreateMap<UpdateEmployeeDto, Employee>()
            .ForAllMembers(opt => opt.Condition(
                (src, dest, srcMember) => srcMember != null));  // Ignore null values during update

        CreateMap<Employee, EmployeeProfileDto>()
            .ForMember(d => d.FullName, o => o.MapFrom(s => $"{s.FirstName} {s.LastName}"))
            .ForMember(d => d.Phone, o => o.MapFrom(s => s.PhoneNumber))  // âœ… PhoneNumber â†’ Phone
            .ForMember(dest => dest.DepartmentName,
                    opt => opt.MapFrom(src => src.Department != null ? src.Department.Name : string.Empty))
          .ForMember(d => d.PositionTitle, o => o.MapFrom(s => s.Position != null ? s.Position.Title : string.Empty));

        CreateMap<Department, DepartmentDto>()
          .ForMember(d => d.EmployeeCount,
            o => o.MapFrom(s => s.Employees != null ? s.Employees.Count : 0));

        CreateMap<CreateDepartmentDto, Department>();
        CreateMap<UpdateDepartmentDto, Department>();

        CreateMap<Position, PositionDto>()
      .ForMember(d => d.DepartmentName,
          o => o.MapFrom(s => s.Department != null ? s.Department.Name : string.Empty))
      .ForMember(d => d.EmployeeCount,
          o => o.MapFrom(s => s.Employees != null ? s.Employees.Count : 0));

        CreateMap<CreatePositionDto, Position>();

        CreateMap<UpdatePositionDto, Position>()
            .ForAllMembers(opt => opt.Condition(
                (src, dest, srcMember) => srcMember != null));



        CreateMap<Leave, LeaveDto>()
            .ForMember(d => d.EmployeeName,
                o => o.MapFrom(s => s.Employee != null
                    ? $"{s.Employee.FirstName} {s.Employee.LastName}"
                    : string.Empty))
            .ForMember(d => d.LeaveType, o => o.MapFrom(s => s.LeaveType.ToString()))
            .ForMember(d => d.Status, o => o.MapFrom(s => s.Status.ToString()))
            .ForMember(d => d.Reason, o => o.MapFrom(s => s.Reason))
            .ForMember(d => d.RejectionReason, o => o.MapFrom(s => s.RejectionReason));









        CreateMap<Attendance, AttendanceDto>()
            .ForMember(d => d.EmployeeName,
                o => o.MapFrom(s => s.Employee != null
                    ? $"{s.Employee.FirstName} {s.Employee.LastName}"
                    : string.Empty))
            .ForMember(d => d.TotalHours,
                o => o.MapFrom(s => s.ClockOut.HasValue
                    ? FormatHours(s.ClockIn, s.ClockOut.Value)
                    : null));

        
        CreateMap<Salary, SalaryDto>()
            .ForMember(d => d.EmployeeName,
                o => o.MapFrom(s => s.Employee != null
                    ? $"{s.Employee.FirstName} {s.Employee.LastName}"
                    : string.Empty));

       
        CreateMap<Notification, NotificationDto>()
            .ForMember(d => d.Type,
                o => o.MapFrom(s => s.Type.ToString()));

        CreateMap<User, UserDto>()
    .ForMember(d => d.EmployeeName,
        o => o.MapFrom(s => s.Employee != null
            ? $"{s.Employee.FirstName} {s.Employee.LastName}"
            : null));
    }

// Helper method ÙÙŠ Ù†ÙØ³ Ø§Ù„Ù€ MappingProfile
private static string FormatHours(TimeOnly clockIn, TimeOnly clockOut)
    {
        var duration = clockOut.ToTimeSpan() - clockIn.ToTimeSpan();
        return $"{(int)duration.TotalHours}h {duration.Minutes}m";
    }





}

```

## File: D:\HRMS-Team\Application\Services\Implementations\AttendanceService.cs


```csharp

using Application.Common;
using Application.DTOs.Attendance;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace Application.Services.Implementations
{

    // Application/Services/Implementations/AttendanceService.cs
    public class AttendanceService(
        IUnitOfWork uow,
        IMapper mapper,
        INotificationService notificationService,
        IEmailService emailService) : IAttendanceService
    {
        public async Task<PagedResult<AttendanceDto>> GetAllAsync(
            int pageNumber, int pageSize)
        {
            var query = uow.Repository<Attendance>()
                           .GetAllQueryable()
                           .Include(a => a.Employee)
                           .OrderByDescending(a => a.Date);

            var total = await query.CountAsync();
            var items = await query
                            .Skip((pageNumber - 1) * pageSize)
                            .Take(pageSize)
                            .ToListAsync();

            return PagedResult<AttendanceDto>.Create(
                mapper.Map<List<AttendanceDto>>(items), total, pageNumber, pageSize);
        }

        public async Task<PagedResult<AttendanceDto>> GetMyAttendanceAsync(
            int employeeId, int pageNumber, int pageSize)
        {
            var query = uow.Repository<Attendance>()
                           .GetAllQueryable()
                           .Include(a => a.Employee)
                           .Where(a => a.EmployeeId == employeeId)
                           .OrderByDescending(a => a.Date);

            var total = await query.CountAsync();
            var items = await query
                            .Skip((pageNumber - 1) * pageSize)
                            .Take(pageSize)
                            .ToListAsync();

            return PagedResult<AttendanceDto>.Create(
                mapper.Map<List<AttendanceDto>>(items), total, pageNumber, pageSize);
        }

        public async Task<AttendanceDto?> GetByIdAsync(int id)
        {
            var attendance = await uow.Repository<Attendance>()
                                      .GetAllQueryable()
                                      .Include(a => a.Employee)
                                      .FirstOrDefaultAsync(a => a.Id == id);

            return attendance is null ? null : mapper.Map<AttendanceDto>(attendance);
        }

        public async Task<AttendanceDto> ClockInAsync(int employeeId, ClockInDto dto)
        {
            // âœ… Fix DateTime Kind
            var date = DateTime.SpecifyKind(dto.Date.Date, DateTimeKind.Utc);

            // â”€â”€ 1. ØªØ­Ù‚Ù‚ Ù…Ù† ÙˆØ¬ÙˆØ¯ session Ù…ÙØªÙˆØ­Ø© (Working) Ù…Ù† Ø£ÙŠ ÙŠÙˆÙ… Ø³Ø§Ø¨Ù‚
            var openSession = await uow.Repository<Attendance>()
                                        .GetAllQueryable()
                                        .FirstOrDefaultAsync(a =>
                                            a.EmployeeId == employeeId &&
                                            a.ClockOut == null);

            if (openSession != null)
            {
                // â”€â”€ Auto Clock-out ØªÙ„Ù‚Ø§Ø¦ÙŠ: Ù†ØºÙ„Ù‚ Ø§Ù„Ù€ session Ø§Ù„Ù‚Ø¯ÙŠÙ…Ø© Ø¨Ù€ 23:59 Ù…Ù† Ù†ÙØ³ ÙŠÙˆÙ…Ù‡Ø§
                var autoClockOut = new TimeOnly(23, 59, 0);

                // Ø¥Ø°Ø§ Ø§Ù„Ù€ session Ù‡ÙŠ Ù…Ù† Ù†ÙØ³ Ø§Ù„ÙŠÙˆÙ… Ø§Ù„Ù…Ø·Ù„ÙˆØ¨ØŒ Ø§Ø±ÙØ¶ ÙˆÙ‚Ù„ Ù„Ù‡ ÙŠØ¹Ù…Ù„ Clock Out Ø£ÙˆÙ„Ø§Ù‹
                if (openSession.Date.Date == date.Date)
                    throw new InvalidOperationException(
                        "You have already clocked in today. Please clock out first.");

                // Ø¥Ø°Ø§ Ù…Ù† ÙŠÙˆÙ… Ø³Ø§Ø¨Ù‚ â†’ Auto Clock-out
                openSession.ClockOut = autoClockOut;
                uow.Repository<Attendance>().Update(openSession);
                await uow.SaveChangesAsync();
            }

            // â”€â”€ 2. ØªØ­Ù‚Ù‚ Ø£Ù„Ø§ ÙŠÙƒÙˆÙ† Clock-in Ù„Ù†ÙØ³ Ø§Ù„ÙŠÙˆÙ… Ù…ÙˆØ¬ÙˆØ¯Ø§Ù‹ (Ù…ÙƒØªÙ…Ù„ Ø£Ùˆ Ù„Ø§)
            var alreadyClockedInToday = await uow.Repository<Attendance>()
                                                  .GetAllQueryable()
                                                  .AnyAsync(a =>
                                                      a.EmployeeId == employeeId &&
                                                      a.Date == date);

            if (alreadyClockedInToday)
                throw new InvalidOperationException(
                    "You have already clocked in today. Please clock out first.");

            // â”€â”€ 3. Ø¥Ù†Ø´Ø§Ø¡ Ø³Ø¬Ù„ Ø¬Ø¯ÙŠØ¯
            var attendance = new Attendance
            {
                EmployeeId = employeeId,
                Date = date,
                ClockIn = dto.ClockIn
            };

            await uow.Repository<Attendance>().AddAsync(attendance);
            await uow.SaveChangesAsync();

            // â”€â”€ Ø¥Ø±Ø³Ø§Ù„ Ø§Ù„Ø¥Ø´Ø¹Ø§Ø± ÙˆØ§Ù„Ø¥ÙŠÙ…ÙŠÙ„
            var user = await uow.Repository<User>()
                                .GetAllQueryable()
                                .Include(u => u.Employee)
                                .FirstOrDefaultAsync(u => u.EmployeeId == employeeId);

            if (user is not null)
            {
                var employeeName = user.Employee is not null
                    ? $"{user.Employee.FirstName} {user.Employee.LastName}"
                    : user.Username;

                await notificationService.CreateAsync(
                    userId: user.Id,
                    title: "Clock In Recorded",
                    message: $"Your attendance was recorded at {dto.ClockIn:HH:mm}",
                    type: NotificationType.ClockIn);

                try { await emailService.SendClockInAsync(user.Email, employeeName, dto.ClockIn); }
                catch { /* Log if needed */ }
            }

            return (await GetByIdAsync(attendance.Id))!;
        }

        public async Task<AttendanceDto> ClockOutAsync(int employeeId, ClockOutDto dto)
        {
            // â”€â”€ Ø§Ù„Ø¨Ø­Ø« Ø¹Ù† Ø£ÙŠ session Ù…ÙØªÙˆØ­Ø© (ClockOut == null) Ù„Ù‡Ø°Ø§ Ø§Ù„Ù…ÙˆØ¸Ù
            // (Ù„ÙŠØ³ ÙÙ‚Ø· Ø§Ù„ÙŠÙˆÙ…ØŒ Ù„Ø£Ù† Ø¨Ø¹Ø¶ Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ† Ù†Ø³ÙˆØ§ Ø§Ù„Ù€ Clock Out Ù…Ù† Ø£ÙŠØ§Ù… Ø³Ø§Ø¨Ù‚Ø©)
            var attendance = await uow.Repository<Attendance>()
                                      .GetAllQueryable()
                                      .Include(a => a.Employee)
                                      .Where(a => a.EmployeeId == employeeId && a.ClockOut == null)
                                      .OrderByDescending(a => a.Date)  // Ø§Ù„Ø£Ø­Ø¯Ø« Ø£ÙˆÙ„Ø§Ù‹
                                      .FirstOrDefaultAsync()
                            ?? throw new KeyNotFoundException(
                                   "No open clock-in record found. You are not currently clocked in.");

            // ØªØ­Ù‚Ù‚ Ù…Ù† Ø£Ù† ÙˆÙ‚Øª Clock-out Ù…Ù†Ø·Ù‚ÙŠ (Ø¨Ø¹Ø¯ Clock-in)
            // Ø¥Ø°Ø§ ÙƒØ§Ù†Øª Ø§Ù„Ù€ session Ù…Ù† ÙŠÙˆÙ… Ø³Ø§Ø¨Ù‚ØŒ Ù†Ù‚Ø¨Ù„ Ø£ÙŠ ÙˆÙ‚Øª
            if (attendance.Date.Date == DateTime.UtcNow.Date)
            {
                if (dto.ClockOut <= attendance.ClockIn)
                    throw new ArgumentException(
                        "Clock-out time must be after clock-in time.");
            }

            attendance.ClockOut = dto.ClockOut;

            // âœ… Bug #1 Fix: Ø§Ø­Ø³Ø¨ TotalHours ÙˆØ§Ø­ÙØ¸Ù‡Ø§ ÙÙŠ Ø§Ù„Ù€ Entity Ø­ØªÙ‰ ØªÙØ®Ø²ÙŽÙ‘Ù† ÙÙŠ DB
            var duration = dto.ClockOut.ToTimeSpan() - attendance.ClockIn.ToTimeSpan();
            attendance.TotalHours = duration.TotalHours > 0 ? (int)Math.Round(duration.TotalHours) : 0;

            uow.Repository<Attendance>().Update(attendance);
            await uow.SaveChangesAsync();

            // â”€â”€ Ø¥Ø±Ø³Ø§Ù„ Ø§Ù„Ø¥Ø´Ø¹Ø§Ø± ÙˆØ§Ù„Ø¥ÙŠÙ…ÙŠÙ„
            var user = await uow.Repository<User>()
                                .GetAllQueryable()
                                .Include(u => u.Employee)
                                .FirstOrDefaultAsync(u => u.EmployeeId == employeeId);

            if (user is not null)
            {
                var employeeName = user.Employee is not null
                    ? $"{user.Employee.FirstName} {user.Employee.LastName}"
                    : user.Username;

                var total = dto.ClockOut.ToTimeSpan() - attendance.ClockIn.ToTimeSpan();

                await notificationService.CreateAsync(
                    userId: user.Id,
                    title: "Clock Out Recorded",
                    message: $"You clocked out at {dto.ClockOut:HH:mm}. " +
                             $"Total: {(int)total.TotalHours}h {total.Minutes}m",
                    type: NotificationType.ClockOut);

                try
                {
                    await emailService.SendClockOutAsync(
                        user.Email, employeeName,
                        attendance.ClockIn, dto.ClockOut);
                }
                catch { /* Log if needed */ }
            }

            return mapper.Map<AttendanceDto>(attendance);
        }
    }
}

```

## File: D:\HRMS-Team\Application\Services\Implementations\AuthService.cs


```csharp

using Application.DTOs.Auth;
using Application.Interfaces;
using Application.Services.Interfaces;
using BCrypt.Net;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.Implementations
{
    public class AuthService(IUnitOfWork uow, IJwtService jwtService, IEmailService emailService) : IAuthService
    {

        public async Task<AuthResponseDto?> LoginAsync(LoginDto dto)
        {
            var user = await uow.Repository<User>()
                                .GetAllQueryable()
                                .Include(u => u.Employee)
                                .FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (user is null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            {
                return null;
            }

            return new AuthResponseDto
            {
                Token = jwtService.GenerateToken(user),
                Username = user.Username,
                Email = user.Email,
                Role = user.Role.ToString(),
                ExpiresAt = jwtService.GetExpiration()
            };
        }
        public async Task<bool> RegisterAsync(RegisterDto dto)
        {
            var exists = await uow.Repository<User>()
                                  .GetAllQueryable()
                                  .AnyAsync(u => u.Email == dto.Email);
            if (exists)
            {
                return false;
            }
            var user = new User
            {
                Username = dto.Username,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = dto.Role.ToString(),
                EmployeeId = dto.EmployeeId
            };

            await uow.Repository<User>().AddAsync(user);
            await uow.SaveChangesAsync();

            await emailService.SendWelcomeAsync(user.Email, user.Username);

            return true;
        }

        public async Task<bool> ChangePasswordAsync(int userId, ChangePasswordDto dto)
        {
            var user = await uow.Repository<User>()
                                .GetAllQueryable()
                                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user is null || !BCrypt.Net.BCrypt.Verify(dto.CurrentPassword, user.PasswordHash))
            {
                return false;
            }
            // validate
            if (dto.NewPassword != dto.ConfirmNewPassword)
            {
                return false;
            }
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            uow.Repository<User>().Update(user);
            await uow.SaveChangesAsync();
            return true;
        }









    }
    }

```

## File: D:\HRMS-Team\Application\Services\Implementations\DepartmentService.cs


```csharp

using Application.DTOs.Department;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.Implementations;

public class DepartmentService(IUnitOfWork uow, IMapper mapper) : IDepartmentService
{
    public async Task<List<DepartmentDto>> GetAllAsync()
    {
        var departments = await uow.Repository<Department>()
                                   .GetAllQueryable()
                                   .Include(d => d.Employees)
                                   .ToListAsync();

        return mapper.Map<List<DepartmentDto>>(departments);
    }

    public async Task<DepartmentDto?> GetByIdAsync(int id)
    {
        var department = await uow.Repository<Department>()
                                  .GetAllQueryable()
                                  .Include(d => d.Employees)
                                  .FirstOrDefaultAsync(d => d.Id == id);

        return department is null ? null : mapper.Map<DepartmentDto>(department);
    }

    public async Task<DepartmentDto> CreateAsync(CreateDepartmentDto dto)
    {
        var exists = await uow.Repository<Department>()
                              .GetAllQueryable()
                              .AnyAsync(d => d.Name == dto.Name);

        if (exists)
            throw new InvalidOperationException("Department name already exists");

        var department = mapper.Map<Department>(dto);
        await uow.Repository<Department>().AddAsync(department);
        await uow.SaveChangesAsync();

        return mapper.Map<DepartmentDto>(department);
    }

    public async Task<DepartmentDto?> UpdateAsync(int id, UpdateDepartmentDto dto)
    {
        var department = await uow.Repository<Department>()
                                  .GetAllQueryable()
                                  .FirstOrDefaultAsync(d => d.Id == id);

        if (department is null) return null;

        mapper.Map(dto, department);
        uow.Repository<Department>().Update(department);
        await uow.SaveChangesAsync();

        return mapper.Map<DepartmentDto>(department);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var department = await uow.Repository<Department>()
                                  .GetAllQueryable()
                                  .Include(d => d.Employees)
                                  .FirstOrDefaultAsync(d => d.Id == id);

        if (department is null) return false;

        if (department.Employees.Any())
            throw new InvalidOperationException("Cannot delete department with employees");

        uow.Repository<Department>().Delete(department);
        await uow.SaveChangesAsync();
        return true;
    }
}

```

## File: D:\HRMS-Team\Application\Services\Implementations\EmployeeService.cs


```csharp

using Application.Common;
using Application.DTOs.Employee;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.Implementations;


public class EmployeeService(IUnitOfWork uow, IMapper mapper) : IEmployeeService
{
   
    //   2026010001  
    private async Task<int> GenerateEmployeeIdAsync(int departmentId, DateTime hireDate)
    {
        var year = hireDate.Year;

        // Ø¢Ø®Ø± ID Ù…ÙˆØ¬ÙˆØ¯ Ù„Ù†ÙØ³ Ø§Ù„Ù‚Ø³Ù… ÙˆÙ†ÙØ³ Ø§Ù„Ø³Ù†Ø©
        var prefix = int.Parse($"{year}{departmentId:D2}");
        var prefixMin = prefix * 10000;       // 2026010000
        var prefixMax = prefixMin + 9999;     // 2026019999

        var lastId = await uow.Repository<Employee>()
                              .GetAllQueryable()
                              .Where(e => e.Id >= prefixMin && e.Id <= prefixMax)
                              .OrderByDescending(e => e.Id)
                              .Select(e => e.Id)
                              .FirstOrDefaultAsync();

        // Ù„Ùˆ Ù…Ø§ ÙÙŠ Ù…ÙˆØ¸ÙÙŠÙ† Ù‚Ø¨Ù„ â†’ ÙŠØ¨Ø¯Ø£ Ù…Ù† 0001
        var nextSeq = lastId == 0
            ? 1
            : (lastId % 10000) + 1;

        if (nextSeq > 9999)
            throw new InvalidOperationException(
                $"Employee limit reached for dept {departmentId} in {year}");

        return int.Parse($"{year}{departmentId:D2}{nextSeq:D4}");
        // â† 2026 + 01 + 0001 = 2026010001
    }

    
    public async Task<PagedResult<EmployeeDto>> GetAllAsync(int pageNumber, int pageSize)
    {
        var query = uow.Repository<Employee>()
                       .GetAllQueryable()
                       .Include(e => e.Department)
                       .OrderBy(e => e.DepartmentId)
                       .ThenBy(e => e.Id);

        var total = await query.CountAsync();
        var items = await query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return PagedResult<EmployeeDto>.Create(
            mapper.Map<List<EmployeeDto>>(items), total, pageNumber, pageSize);
    }

    public async Task<EmployeeDto?> GetByIdAsync(int id)
    {
        var employee = await uow.Repository<Employee>()
                                .GetAllQueryable()
                                .Include(e => e.Department)
                                .FirstOrDefaultAsync(e => e.Id == id);

        return employee is null ? null : mapper.Map<EmployeeDto>(employee);
    }

    public async Task<EmployeeDto> CreateAsync(CreateEmployeeDto dto)
    {
        var emailExists = await uow.Repository<Employee>()
                                   .GetAllQueryable()
                                   .AnyAsync(e => e.Email == dto.Email);
        if (emailExists)
            throw new InvalidOperationException("Email already used");

        var deptExists = await uow.Repository<Department>()
                                  .GetAllQueryable()
                                  .AnyAsync(d => d.Id == dto.DepartmentId);
        if (!deptExists)
            throw new KeyNotFoundException($"Department {dto.DepartmentId} not found");

        var employee = mapper.Map<Employee>(dto);
        employee.IsActive = true;

        // â† ØªÙˆÙ„ÙŠØ¯ Ø§Ù„Ù€ ID Ù‚Ø¨Ù„ Ø§Ù„Ø­ÙØ¸
        employee.Id = await GenerateEmployeeIdAsync(dto.DepartmentId, dto.HireDate);

        await uow.Repository<Employee>().AddAsync(employee);
        await uow.SaveChangesAsync();

        return (await GetByIdAsync(employee.Id))!;
    }

    public async Task<EmployeeDto?> UpdateAsync(int id, UpdateEmployeeDto dto)
    {
        var employee = await uow.Repository<Employee>()
                                .GetAllQueryable()
                                .FirstOrDefaultAsync(e => e.Id == id);

        if (employee is null) return null;

        mapper.Map(dto, employee);
        uow.Repository<Employee>().Update(employee);
        await uow.SaveChangesAsync();

        return await GetByIdAsync(id);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var employee = await uow.Repository<Employee>()
                                .GetAllQueryable()
                                .FirstOrDefaultAsync(e => e.Id == id);

        if (employee is null) return false;

        uow.Repository<Employee>().Delete(employee);
        await uow.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<EmployeeDto>> GetByDepartmentAsync(int departmentId)
    {
        var employees = await uow.Repository<Employee>()
                                 .GetAllQueryable()
                                 .Where(e => e.DepartmentId == departmentId)
                                 .Include(e => e.Department)
                                 .OrderBy(e => e.Id)
                                 .ToListAsync();

        return mapper.Map<IEnumerable<EmployeeDto>>(employees);
    }

    public async Task<EmployeeProfileDto?> GetProfileAsync(int id)
    {
        var employee = await uow.Repository<Employee>()
                                .GetAllQueryable()
                                .Include(e => e.Department)
                                .Include(e => e.Position)
                                .FirstOrDefaultAsync(e => e.Id == id);

        return employee is null ? null : mapper.Map<EmployeeProfileDto>(employee);
    }
}

```

## File: D:\HRMS-Team\Application\Services\Implementations\JwtService.cs


```csharp

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Application.Interfaces;
using Domain.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Application.Services.Implementations
{
    public class JwtService(IConfiguration config) : IJwtService
    {
        public string GenerateToken(User user)
        {
            var Key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]!));

            var Clims= new[]
            {

            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role,  user.Role.ToString()),
            new Claim("employeeId", user.Employee?.Id.ToString() ?? "")

            };

            var token = new JwtSecurityToken(

                issuer: config["Jwt:Issuer"],
                audience: config["Jwt:Audience"],
                claims: Clims,
                expires : GetExpiration(),
                signingCredentials: new SigningCredentials(Key, SecurityAlgorithms.HmacSha256)

                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }



        public DateTime GetExpiration() =>
       DateTime.UtcNow.AddHours(
           double.Parse(config["Jwt:ExpiryHours"] ?? "24"));

    }
}

```

## File: D:\HRMS-Team\Application\Services\Implementations\LeaveService.cs


```csharp

using Application.Common;
using Application.DTOs.Leave;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;


namespace Application.Services.Implementations
{

    // Application/Services/Implementations/LeaveService.cs
    public class LeaveService(
        IUnitOfWork uow,
        IMapper mapper,
        INotificationService notificationService,
        IEmailService emailService,
        ILogger<LeaveService> logger) : ILeaveService
    {
        public async Task<PagedResult<LeaveDto>> GetAllAsync(int pageNumber, int pageSize)
        {
            var query = uow.Repository<Leave>()
                           .GetAllQueryable()
                           .Include(l => l.Employee)
                           .OrderByDescending(l => l.StartDate);

            var total = await query.CountAsync();
            var items = await query
                            .Skip((pageNumber - 1) * pageSize)
                            .Take(pageSize)
                            .ToListAsync();

            return PagedResult<LeaveDto>.Create(
                mapper.Map<List<LeaveDto>>(items), total, pageNumber, pageSize);
        }

        public async Task<PagedResult<LeaveDto>> GetMyLeavesAsync(
            int employeeId, int pageNumber, int pageSize)
        {
            var query = uow.Repository<Leave>()
                           .GetAllQueryable()
                           .Include(l => l.Employee)
                           .Where(l => l.EmployeeId == employeeId)
                           .OrderByDescending(l => l.StartDate);

            var total = await query.CountAsync();
            var items = await query
                            .Skip((pageNumber - 1) * pageSize)
                            .Take(pageSize)
                            .ToListAsync();

            return PagedResult<LeaveDto>.Create(
                mapper.Map<List<LeaveDto>>(items), total, pageNumber, pageSize);
        }

        public async Task<LeaveDto?> GetByIdAsync(int id)
        {
            var leave = await uow.Repository<Leave>()
                                 .GetAllQueryable()
                                 .Include(l => l.Employee)
                                 .FirstOrDefaultAsync(l => l.Id == id);

            return leave is null ? null : mapper.Map<LeaveDto>(leave);
        }

        public async Task<LeaveDto> CreateAsync(int employeeId, CreateLeaveDto dto)
        {
            // ✅ معالجة التواريخ بشكل صحيح مع UTC
            var startDate = DateTime.SpecifyKind(dto.StartDate.Date, DateTimeKind.Utc);
            var endDate = DateTime.SpecifyKind(dto.EndDate.Date, DateTimeKind.Utc);
            var today = DateTime.SpecifyKind(DateTime.UtcNow.Date, DateTimeKind.Utc);

            // ✅ التحقق من الصحة
            if (startDate < today)
                throw new ArgumentException("Start date cannot be in the past");

            if (endDate < startDate)
                throw new ArgumentException("End date cannot be before start date");

            // ✅ التحقق من التداخل
            var hasOverlap = await uow.Repository<Leave>()
                              .GetAllQueryable()
                              .AnyAsync(l =>
                                  l.EmployeeId == employeeId &&
                                  l.Status != LeaveStatus.Rejected &&
                                  l.StartDate <= endDate &&
                                  l.EndDate >= startDate);

            if (hasOverlap)
                throw new InvalidOperationException(
                    "You already have a leave request overlapping these dates");

            // ✅ إنشاء طلب الإجازة
            var leave = new Leave
            {
                EmployeeId = employeeId,
                LeaveType = dto.LeaveType,
                StartDate = startDate,
                EndDate = endDate,
                TotalDays = (int)(endDate - startDate).TotalDays + 1,
                Reason = dto.Reason,
                Status = LeaveStatus.Pending,
                RequestedAt = DateTime.UtcNow
            };

            await uow.Repository<Leave>().AddAsync(leave);
            await uow.SaveChangesAsync();

            // ✅ جلب بيانات الموظف
            var employee = await uow.Repository<Employee>()
                            .GetByIdAsync(employeeId);

            var employeeName = employee is not null
                ? $"{employee.FirstName} {employee.LastName}"
                : "Unknown";

            // ✅ جلب HR و Admin - بدون مشاكل Role
            var hrAdmins = await uow.Repository<User>()
                            .GetAllQueryable()
                            .Where(u => u.Role == UserRole.HR.ToString() || 
                                        u.Role == UserRole.Admin.ToString())
                            .ToListAsync();

            // ✅ إرسال الإشعارات والبريد بشكل آمن
            foreach (var user in hrAdmins)
            {
                try
                {
                    // Notification
                    await notificationService.CreateAsync(
                        userId: user.Id,
                        title: "New Leave Request",
                        message: $"{employeeName} submitted a {dto.LeaveType} leave request " +
                                 $"from {startDate:yyyy-MM-dd} to {endDate:yyyy-MM-dd}",
                        type: NotificationType.LeaveRequested);

                    // Email
                    await emailService.SendLeaveRequestedAsync(
                        user.Email, employeeName,
                        dto.LeaveType.ToString(),
                        startDate, endDate);
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, 
                        "Error sending leave notification to user {UserId}", user.Id);
                }
            }

            return (await GetByIdAsync(leave.Id))!;
        }

        public async Task<LeaveDto> UpdateStatusAsync(
            int leaveId, int reviewerUserId, UpdateLeaveStatusDto dto)
        {
            var leave = await uow.Repository<Leave>()
                                 .GetAllQueryable()
                                 .Include(l => l.Employee)
                                 .FirstOrDefaultAsync(l => l.Id == leaveId)
                    ?? throw new KeyNotFoundException($"Leave {leaveId} not found");

            if (leave.Status != LeaveStatus.Pending)
                throw new InvalidOperationException(
                    "Only Pending leave requests can be reviewed");

            if (dto.Status == LeaveStatus.Rejected &&
                string.IsNullOrWhiteSpace(dto.RejectionReason))
                throw new ArgumentException(
                    "Rejection reason is required when rejecting a leave");

            // ✅ تحديث الحالة
            leave.Status = dto.Status;
            leave.ReviewedByUserId = reviewerUserId;
            leave.RejectionReason = dto.Status == LeaveStatus.Rejected
                ? dto.RejectionReason
                : string.Empty;  // بدل null
            leave.ReviewedAt = DateTime.UtcNow;

            uow.Repository<Leave>().Update(leave);
            await uow.SaveChangesAsync();

            // ✅ جلب الموظف مع بياناته
            var employee = await uow.Repository<Employee>()
                            .GetAllQueryable()
                            .Include(e => e.User)
                            .FirstOrDefaultAsync(e => e.Id == leave.EmployeeId);

            if (employee?.User is not null)
            {
                var employeeUser = employee.User;
                var isApproved = dto.Status == LeaveStatus.Approved;
                var employeeName = $"{employee.FirstName} {employee.LastName}";

                try
                {
                    // Notification
                    await notificationService.CreateAsync(
                        userId: employeeUser.Id,
                        title: isApproved ? "Leave Approved" : "Leave Rejected",
                        message: isApproved
                            ? $"Your {leave.LeaveType} leave request has been approved"
                            : $"Your {leave.LeaveType} leave request was rejected. " +
                              $"Reason: {dto.RejectionReason}",
                        type: isApproved
                            ? NotificationType.LeaveApproved
                            : NotificationType.LeaveRejected);

                    // Email
                    await emailService.SendLeaveStatusAsync(
                        employeeUser.Email,
                        employeeName,
                        leave.LeaveType.ToString(),
                        isApproved,
                        dto.RejectionReason);
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, 
                        "Error sending leave status notification to employee {EmployeeId}", 
                        leave.EmployeeId);
                }
            }

            return mapper.Map<LeaveDto>(leave);
        }

        public async Task DeleteAsync(int leaveId, int employeeId)
        {
            var leave = await uow.Repository<Leave>()
                                 .GetAllQueryable()
                                 .FirstOrDefaultAsync(l => l.Id == leaveId)
                        ?? throw new KeyNotFoundException($"Leave {leaveId} not found");

            if (leave.EmployeeId != employeeId)
                throw new UnauthorizedAccessException(
                    "You can only delete your own leave requests");

            if (leave.Status != LeaveStatus.Pending)
                throw new InvalidOperationException(
                    "Only Pending leave requests can be deleted");

            uow.Repository<Leave>().Delete(leave);
            await uow.SaveChangesAsync();

            // ✅ جلب بيانات الموظف
            var employee = await uow.Repository<Employee>()
                                    .GetByIdAsync(employeeId);

            var employeeName = employee is not null
                ? $"{employee.FirstName} {employee.LastName}"
                : "Unknown";

            // ✅ جلب HR و Admin
            var hrAdmins = await uow.Repository<User>()
                                    .GetAllQueryable()
                                    .Where(u => u.Role == UserRole.HR.ToString() || 
                                                u.Role == UserRole.Admin.ToString())
                                    .ToListAsync();

            // ✅ إرسال الإشعارات والبريد بشكل آمن
            foreach (var user in hrAdmins)
            {
                try
                {
                    // Notification
                    await notificationService.CreateAsync(
                        userId: user.Id,
                        title: "Leave Request Cancelled",
                        message: $"{employeeName} cancelled their {leave.LeaveType} leave request",
                        type: NotificationType.LeaveCancelled);

                    // Email
                    await emailService.SendLeaveCancelledAsync(
                        user.Email, employeeName, leave.LeaveType.ToString());
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, 
                        "Error sending leave cancellation notification to user {UserId}", 
                        user.Id);
                }
            }
        }
    }
}

```

## File: D:\HRMS-Team\Application\Services\Implementations\NotificationService.cs


```csharp

using Application.DTOs.Notification;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace Application.Services.Implementations
{
    
    public class NotificationService(IUnitOfWork uow, IMapper mapper) : INotificationService
    {
        public async Task<List<NotificationDto>> GetMyNotificationsAsync(int userId)
        {
            var items = await uow.Repository<Notification>()
                                 .GetAllQueryable()
                                 .Where(n => n.UserId == userId)
                                 .OrderByDescending(n => n.CreatedAt)
                                 .ToListAsync();

            return mapper.Map<List<NotificationDto>>(items);
        }

        public async Task<int> GetUnreadCountAsync(int userId)
        {
            return await uow.Repository<Notification>()
                            .GetAllQueryable()
                            .CountAsync(n => n.UserId == userId && !n.IsRead);
        }

        public async Task MarkAsReadAsync(int notificationId, int userId)
        {
            var notification = await uow.Repository<Notification>()
                                        .GetAllQueryable()
                                        .FirstOrDefaultAsync(n =>
                                            n.Id == notificationId &&
                                            n.UserId == userId)
                              ?? throw new KeyNotFoundException(
                                     $"Notification {notificationId} not found");

            if (notification.IsRead) return;

            notification.IsRead = true;
            uow.Repository<Notification>().Update(notification);
            await uow.SaveChangesAsync();
        }

        public async Task MarkAllAsReadAsync(int userId)
        {
            var unread = await uow.Repository<Notification>()
                                  .GetAllQueryable()
                                  .Where(n => n.UserId == userId && !n.IsRead)
                                  .ToListAsync();

            if (!unread.Any()) return;

            foreach (var n in unread)
            {
                n.IsRead = true;
                uow.Repository<Notification>().Update(n);
            }

            await uow.SaveChangesAsync();
        }

        public async Task DeleteAsync(int notificationId, int userId)
        {
            var notification = await uow.Repository<Notification>()
                                        .GetAllQueryable()
                                        .FirstOrDefaultAsync(n =>
                                            n.Id == notificationId &&
                                            n.UserId == userId)
                              ?? throw new KeyNotFoundException(
                                     $"Notification {notificationId} not found");

            uow.Repository<Notification>().Delete(notification);
            await uow.SaveChangesAsync();
        }

        // ✅ Internal Method — تُحقن بالـ Services الثانية
        public async Task CreateAsync(
            int userId, string title, string message, NotificationType type)
        {
            var notification = new Notification
            {
                UserId = userId,
                Title = title,
                Message = message,
                Type = type,
                CreatedAt = DateTime.UtcNow
            };

            await uow.Repository<Notification>().AddAsync(notification);
            await uow.SaveChangesAsync();
        }
    }
}

```

## File: D:\HRMS-Team\Application\Services\Implementations\PositionService.cs


```csharp

using Application.DTOs.Position;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.Implementations;

public class PositionService(IUnitOfWork uow, IMapper mapper) : IPositionService
{
    public async Task<List<PositionDto>> GetAllAsync()
    {
        var positions = await uow.Repository<Position>()
                                 .GetAllQueryable()
                                 .Include(p => p.Department)
                                 .Include(p => p.Employees)
                                 .ToListAsync();

        return mapper.Map<List<PositionDto>>(positions);
    }

    public async Task<List<PositionDto>> GetByDepartmentAsync(int departmentId)
    {
        var positions = await uow.Repository<Position>()
                                 .GetAllQueryable()
                                 .Include(p => p.Department)
                                 .Include(p => p.Employees)
                                 .Where(p => p.DepartmentId == departmentId)
                                 .ToListAsync();

        return mapper.Map<List<PositionDto>>(positions);
    }

    public async Task<PositionDto?> GetByIdAsync(int id)
    {
        var position = await uow.Repository<Position>()
                                .GetAllQueryable()
                                .Include(p => p.Department)
                                .Include(p => p.Employees)
                                .FirstOrDefaultAsync(p => p.Id == id);

        return position is null ? null : mapper.Map<PositionDto>(position);
    }

    public async Task<PositionDto> CreateAsync(CreatePositionDto dto)
    {
        var departmentExists = await uow.Repository<Department>()
                                        .GetAllQueryable()
                                        .AnyAsync(d => d.Id == dto.DepartmentId);

        if (!departmentExists)
        {
            throw new KeyNotFoundException($"Department {dto.DepartmentId} not found");
        }




        var exists = await uow.Repository<Position>()
                              .GetAllQueryable()
                              .AnyAsync(p => p.Title == dto.Title &&
                                             p.DepartmentId == dto.DepartmentId);

        if (dto.SalaryMin > dto.SalaryMax)
        {
            throw new ArgumentException("SalaryMin cannot be greater than SalaryMax");
        }


        if (exists)
        {
            throw new InvalidOperationException("Position already exists in this department");
        }

        var position = mapper.Map<Position>(dto);

        await uow.Repository<Position>().AddAsync(position);

        await uow.SaveChangesAsync();

        return await GetByIdAsync(position.Id) ?? mapper.Map<PositionDto>(position);
    }

    public async Task<PositionDto?> UpdateAsync(int id, UpdatePositionDto dto)
    {
        var position = await uow.Repository<Position>()
                                .GetAllQueryable()
                                .FirstOrDefaultAsync(p => p.Id == id);

        if (position is null)
        {
            return null;
        }

        if (dto.SalaryMin > dto.SalaryMax) 
        { 

        throw new ArgumentException("SalaryMin cannot be greater than SalaryMax");
    
        
        }
        mapper.Map(dto, position);

        uow.Repository<Position>().Update(position);

        await uow.SaveChangesAsync();

        return await GetByIdAsync(id);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var position = await uow.Repository<Position>()
                                .GetAllQueryable()
                                .Include(p => p.Employees)
                                .FirstOrDefaultAsync(p => p.Id == id);


        if (position is null)
        {
            return false;
        }

        if (position.Employees.Any())
        {
            throw new InvalidOperationException("Cannot delete position with assigned employees");
        }

        uow.Repository<Position>().Delete(position);

        await uow.SaveChangesAsync();
        return true;
    }
}

```

## File: D:\HRMS-Team\Application\Services\Implementations\SalaryService.cs


```csharp

using Application.Common;
using Application.DTOs.Salary;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace Application.Services.Implementations
{

    // Application/Services/Implementations/SalaryService.cs
    public class SalaryService(
        IUnitOfWork uow,
        IMapper mapper,
        INotificationService notificationService,
        IEmailService emailService) : ISalaryService
    {
        public async Task<PagedResult<SalaryDto>> GetAllAsync(int pageNumber, int pageSize)
        {
            var query = uow.Repository<Salary>()
                           .GetAllQueryable()
                           .Include(s => s.Employee)
                           .OrderByDescending(s => s.Year)
                           .ThenByDescending(s => s.Month);

            var total = await query.CountAsync();
            var items = await query
                            .Skip((pageNumber - 1) * pageSize)
                            .Take(pageSize)
                            .ToListAsync();

            return PagedResult<SalaryDto>.Create(
                mapper.Map<List<SalaryDto>>(items), total, pageNumber, pageSize);
        }

        public async Task<PagedResult<SalaryDto>> GetMyAsync(
            int employeeId, int pageNumber, int pageSize)
        {
            var query = uow.Repository<Salary>()
                           .GetAllQueryable()
                           .Include(s => s.Employee)
                           .Where(s => s.EmployeeId == employeeId)
                           .OrderByDescending(s => s.Year)
                           .ThenByDescending(s => s.Month);

            var total = await query.CountAsync();
            var items = await query
                            .Skip((pageNumber - 1) * pageSize)
                            .Take(pageSize)
                            .ToListAsync();

            return PagedResult<SalaryDto>.Create(
                mapper.Map<List<SalaryDto>>(items), total, pageNumber, pageSize);
        }

        public async Task<SalaryDto?> GetByIdAsync(int id)
        {
            var salary = await uow.Repository<Salary>()
                                  .GetAllQueryable()
                                  .Include(s => s.Employee)
                                  .FirstOrDefaultAsync(s => s.Id == id);

            return salary is null ? null : mapper.Map<SalaryDto>(salary);
        }

        public async Task<SalaryDto> CreateAsync(CreateSalaryDto dto)
        {
            var employeeExists = await uow.Repository<Employee>()
                                          .GetAllQueryable()
                                          .AnyAsync(e => e.Id == dto.EmployeeId);

            if (!employeeExists)
                throw new KeyNotFoundException($"Employee {dto.EmployeeId} not found");

            var duplicate = await uow.Repository<Salary>()
                                     .GetAllQueryable()
                                     .AnyAsync(s =>
                                         s.EmployeeId == dto.EmployeeId &&
                                         s.Month == dto.Month &&
                                         s.Year == dto.Year);

            if (duplicate)
                throw new InvalidOperationException(
                    $"Salary for this employee in {dto.Month}/{dto.Year} already exists");

            var gross = dto.BaseAmount + dto.Allowances;
            var net = gross - dto.Deductions;

            if (net < 0)
                throw new ArgumentException(
                    "Deductions cannot exceed the gross amount");

            var salary = new Salary
            {
                EmployeeId = dto.EmployeeId,
                BaseAmount = dto.BaseAmount,
                Allowances = dto.Allowances,
                Deductions = dto.Deductions,
                GrossAmount = gross,
                NetAmount = net,
                Month = dto.Month,
                Year = dto.Year,
                // ✅ Fix DateTime Kind
                EffectiveDate = DateTime.SpecifyKind(
                                    dto.EffectiveDate, DateTimeKind.Utc)
            };

            await uow.Repository<Salary>().AddAsync(salary);
            await uow.SaveChangesAsync();

            // جيب الـ User المرتبط بالموظف
            var user = await uow.Repository<User>()
                                .GetAllQueryable()
                                .Include(u => u.Employee)
                                .FirstOrDefaultAsync(u =>
                                    u.EmployeeId == dto.EmployeeId);

            if (user is not null)
            {
                var employeeName = user.Employee is not null
                    ? $"{user.Employee.FirstName} {user.Employee.LastName}"
                    : user.Username;

                // Notification
                await notificationService.CreateAsync(
                    userId: user.Id,
                    title: "Salary Statement Available",
                    message: $"Your salary for {dto.Month}/{dto.Year} has been added. " +
                             $"Net Amount: {net:N2} JD",
                    type: NotificationType.SalaryCreated);

                // ✅ Email
                try
                {
                    await emailService.SendSalaryCreatedAsync(
                        user.Email, employeeName,
                        dto.Month, dto.Year, net);
                }
                catch { /* Log if needed */ }
            }

            return (await GetByIdAsync(salary.Id))!;
        }

        public async Task<SalaryDto> UpdateAsync(int id, UpdateSalaryDto dto)
        {
            var salary = await uow.Repository<Salary>()
                                  .GetAllQueryable()
                                  .Include(s => s.Employee)
                                  .FirstOrDefaultAsync(s => s.Id == id)
                        ?? throw new KeyNotFoundException($"Salary {id} not found");

            if (dto.BaseAmount.HasValue) salary.BaseAmount = dto.BaseAmount.Value;
            if (dto.Allowances.HasValue) salary.Allowances = dto.Allowances.Value;
            if (dto.Deductions.HasValue) salary.Deductions = dto.Deductions.Value;
            if (dto.EffectiveDate.HasValue) salary.EffectiveDate =
                // ✅ Fix DateTime Kind
                DateTime.SpecifyKind(dto.EffectiveDate.Value, DateTimeKind.Utc);

            salary.GrossAmount = salary.BaseAmount + salary.Allowances;
            salary.NetAmount = salary.GrossAmount - salary.Deductions;

            if (salary.NetAmount < 0)
                throw new ArgumentException(
                    "Deductions cannot exceed the gross amount");

            uow.Repository<Salary>().Update(salary);
            await uow.SaveChangesAsync();

            // جيب الـ User المرتبط بالموظف
            var user = await uow.Repository<User>()
                                .GetAllQueryable()
                                .Include(u => u.Employee)
                                .FirstOrDefaultAsync(u =>
                                    u.EmployeeId == salary.EmployeeId);

            if (user is not null)
            {
                var employeeName = user.Employee is not null
                    ? $"{user.Employee.FirstName} {user.Employee.LastName}"
                    : user.Username;

                // Notification
                await notificationService.CreateAsync(
                    userId: user.Id,
                    title: "Salary Updated",
                    message: $"Your salary for {salary.Month}/{salary.Year} " +
                             $"has been updated. Net Amount: {salary.NetAmount:N2} JD",
                    type: NotificationType.SalaryUpdated);

                // ✅ Email
                try
                {
                    await emailService.SendSalaryUpdatedAsync(
                        user.Email, employeeName,
                        salary.Month, salary.Year, salary.NetAmount);
                }
                catch { /* Log if needed */ }
            }

            return mapper.Map<SalaryDto>(salary);
        }

        public async Task DeleteAsync(int id)
        {
            var salary = await uow.Repository<Salary>()
                                  .GetAllQueryable()
                                  .FirstOrDefaultAsync(s => s.Id == id)
                        ?? throw new KeyNotFoundException($"Salary {id} not found");

            uow.Repository<Salary>().Delete(salary);
            await uow.SaveChangesAsync();
        }
    }
}

```

## File: D:\HRMS-Team\Application\Services\Implementations\UserService.cs


```csharp

using Application.Common;
using Application.DTOs.User;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.Implementations
{
    public class UserService(IUnitOfWork uow, IMapper mapper) : IUserService
    {
        public async Task<PagedResult<UserDto>> GetAllEmployeesAsync(int pageNumber, int pageSize)
        {
            // ✅ اجلب فقط Users اللذين لهم Employee مرتبطين
            var query = uow.Repository<User>()
                           .GetAllQueryable()
                           .Where(u => u.Employee != null)  // فقط Users مع Employee
                           .Include(u => u.Employee)
                           .OrderByDescending(u => u.CreatedAt);

            var total = await query.CountAsync();
            var items = await query
                            .Skip((pageNumber - 1) * pageSize)
                            .Take(pageSize)
                            .ToListAsync();

            var dtos = items.Select(u => new UserDto
            {
                Id = u.Id,
                Username = u.Username,
                Email = u.Email,
                Role = u.Role,
                IsActive = u.IsActive,
                CreatedAt = u.CreatedAt,
                EmployeeName = u.Employee != null
                    ? $"{u.Employee.FirstName} {u.Employee.LastName}"
                    : null
            }).ToList();

            return PagedResult<UserDto>.Create(dtos, total, pageNumber, pageSize);
        }

        public async Task<UserDto?> GetByIdAsync(int id)
        {
            var user = await uow.Repository<User>()
                                .GetAllQueryable()
                                .Include(u => u.Employee)
                                .FirstOrDefaultAsync(u => u.Id == id);

            if (user is null) return null;

            return new UserDto
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                Role = user.Role,
                IsActive = user.IsActive,
                CreatedAt = user.CreatedAt,
                EmployeeName = user.Employee != null
                    ? $"{user.Employee.FirstName} {user.Employee.LastName}"
                    : null
            };
        }

        public async Task<PagedResult<UserDto>> GetUnassignedEmployeeUsersAsync(int pageNumber, int pageSize)
        {
            var query = uow.Repository<User>()
                           .GetAllQueryable()
                           .Where(u => u.Role == "Employee" && u.Employee == null)  // Employee users بدون ربط
                           .OrderByDescending(u => u.CreatedAt);

            var total = await query.CountAsync();
            var items = await query
                            .Skip((pageNumber - 1) * pageSize)
                            .Take(pageSize)
                            .ToListAsync();

            var dtos = items.Select(u => new UserDto
            {
                Id = u.Id,
                Username = u.Username,
                Email = u.Email,
                Role = u.Role,
                IsActive = u.IsActive,
                CreatedAt = u.CreatedAt
                
            }).ToList();

            return PagedResult<UserDto>.Create(dtos, total, pageNumber, pageSize);
        }


    }
}


```

## File: D:\HRMS-Team\Application\Services\Interfaces\IAttendanceService.cs


```csharp

using Application.Common;
using Application.DTOs.Attendance;


namespace Application.Services.Interfaces
{
    
    public interface IAttendanceService
    {
        Task<PagedResult<AttendanceDto>> GetAllAsync(int pageNumber, int pageSize);
        Task<PagedResult<AttendanceDto>> GetMyAttendanceAsync(int employeeId, int pageNumber, int pageSize);
        Task<AttendanceDto?> GetByIdAsync(int id);
        Task<AttendanceDto> ClockInAsync(int employeeId, ClockInDto dto);
        Task<AttendanceDto> ClockOutAsync(int employeeId, ClockOutDto dto);
    }
}

```

## File: D:\HRMS-Team\Application\Services\Interfaces\IAuthServices.cs


```csharp

using Application.DTOs.Auth;

namespace Application.Interfaces;

public interface IAuthService
{
    Task<AuthResponseDto?> LoginAsync(LoginDto dto);
    Task<bool> RegisterAsync(RegisterDto dto);
    Task<bool> ChangePasswordAsync(int userId, ChangePasswordDto dto);
}

```

## File: D:\HRMS-Team\Application\Services\Interfaces\IDepartmentService.cs


```csharp

using Application.DTOs.Department;

namespace Application.Services.Interfaces;

public interface IDepartmentService
{
    Task<List<DepartmentDto>> GetAllAsync();
    Task<DepartmentDto?> GetByIdAsync(int id);
    Task<DepartmentDto> CreateAsync(CreateDepartmentDto dto);
    Task<DepartmentDto?> UpdateAsync(int id, UpdateDepartmentDto dto);
    Task<bool> DeleteAsync(int id);
}

```

## File: D:\HRMS-Team\Application\Services\Interfaces\IEmailService.cs


```csharp

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
    }
}

```

## File: D:\HRMS-Team\Application\Services\Interfaces\IEmployeeService.cs


```csharp

// Aother : Abedalqader Alfaqeeh
// last Edit : 2026/04/12
  

using Application.Common;
using Application.DTOs.Employee;

namespace Application.Services.Interfaces;

public interface IEmployeeService
{
    Task<PagedResult<EmployeeDto>> GetAllAsync(int pageNumber, int pageSize);
    Task<EmployeeProfileDto?> GetProfileAsync(int id);
    Task<EmployeeDto?> GetByIdAsync(int id);
    Task<EmployeeDto> CreateAsync(CreateEmployeeDto dto);
    Task<EmployeeDto?> UpdateAsync(int id, UpdateEmployeeDto dto);
    Task<bool> DeleteAsync(int id);
    Task<IEnumerable<EmployeeDto>> GetByDepartmentAsync(int departmentId);
}

```

## File: D:\HRMS-Team\Application\Services\Interfaces\IJwtService.cs


```csharp

using Domain.Entities;

namespace Application.Interfaces;

public interface IJwtService
{
    string GenerateToken(User user);
    DateTime GetExpiration();
}

```

## File: D:\HRMS-Team\Application\Services\Interfaces\ILeaveService.cs


```csharp

using Application.Common;
using Application.DTOs.Leave;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.Interfaces
{
    public interface ILeaveService
    {
        Task<PagedResult<LeaveDto>> GetAllAsync(int pageNumber, int pageSize);
        Task<PagedResult<LeaveDto>> GetMyLeavesAsync(int employeeId, int pageNumber, int pageSize);
        Task<LeaveDto?> GetByIdAsync(int id);
        Task<LeaveDto> CreateAsync(int employeeId, CreateLeaveDto dto);
        Task<LeaveDto> UpdateStatusAsync(int leaveId, int reviewerUserId, UpdateLeaveStatusDto dto);
        Task DeleteAsync(int leaveId, int employeeId);
    }
}

```

## File: D:\HRMS-Team\Application\Services\Interfaces\INotificationService.cs


```csharp

using Application.DTOs.Notification;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.Interfaces
{
   
    public interface INotificationService
    {
        Task<List<NotificationDto>> GetMyNotificationsAsync(int userId);
        Task<int> GetUnreadCountAsync(int userId);
        Task MarkAsReadAsync(int notificationId, int userId);
        Task MarkAllAsReadAsync(int userId);
        Task DeleteAsync(int notificationId, int userId);

        // Internal — تُستخدم جوا الـ Services
        Task CreateAsync(int userId, string title, string message, NotificationType type);
    }
}

```

## File: D:\HRMS-Team\Application\Services\Interfaces\IPositionService.cs


```csharp

using Application.DTOs.Position;

namespace Application.Services.Interfaces;

public interface IPositionService
{
    Task<List<PositionDto>> GetAllAsync();
    Task<List<PositionDto>> GetByDepartmentAsync(int departmentId);
    Task<PositionDto?> GetByIdAsync(int id);
    Task<PositionDto> CreateAsync(CreatePositionDto dto);
    Task<PositionDto?> UpdateAsync(int id, UpdatePositionDto dto);
    Task<bool> DeleteAsync(int id);
}

```

## File: D:\HRMS-Team\Application\Services\Interfaces\ISalaryService.cs


```csharp

using Application.Common;
using Application.DTOs.Salary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.Interfaces
{
   
    public interface ISalaryService
    {
        Task<PagedResult<SalaryDto>> GetAllAsync(int pageNumber, int pageSize);
        Task<PagedResult<SalaryDto>> GetMyAsync(int employeeId, int pageNumber, int pageSize);
        Task<SalaryDto?> GetByIdAsync(int id);
        Task<SalaryDto> CreateAsync(CreateSalaryDto dto);
        Task<SalaryDto> UpdateAsync(int id, UpdateSalaryDto dto);
        Task DeleteAsync(int id);
    }
}

```

## File: D:\HRMS-Team\Application\Services\Interfaces\IUserService.cs


```csharp



using Application.Common;
using Application.DTOs.User;

namespace Application.Services.Interfaces
{
    public interface IUserService
    {
        Task<PagedResult<UserDto>> GetAllEmployeesAsync(int pageNumber, int pageSize);
        Task<UserDto?> GetByIdAsync(int id);
        Task<PagedResult<UserDto>> GetUnassignedEmployeeUsersAsync(int pageNumber, int pageSize);


    }

}

```

## File: D:\HRMS-Team\Application\Settings\EmailSettings.cs


```csharp



namespace Application.Settings
{
    public class EmailSettings
    {
        public string Host { get; set; } = string.Empty;
        public int Port { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string FromName { get; set; } = string.Empty;
        public string FromEmail { get; set; } = string.Empty;
    }
}

```

## File: D:\HRMS-Team\Domain\Domain.csproj


```csproj

<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="MailKit" Version="4.16.0" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Analyzers" Version="9.0.6" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="9.0.6">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
    <PackageReference Include="Microsoft.EntityFrameworkCore.Relational" Version="9.0.6" />
    <PackageReference Include="MimeKit" Version="4.16.0" />
  </ItemGroup>

</Project>

```

## File: D:\HRMS-Team\Domain\Entities\Attendance.cs


```csharp

namespace Domain.Entities;

public class Attendance
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public TimeOnly ClockIn { get; set; }
    public TimeOnly? ClockOut { get; set; }
    public int TotalHours { get; set; }

    public int EmployeeId { get; set; }
    public Employee Employee { get; set; } = null!;
}

```

## File: D:\HRMS-Team\Domain\Entities\Department.cs


```csharp

namespace Domain.Entities;

public class Department
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;

    public ICollection<Employee> Employees { get; set; } = new List<Employee>();
    public ICollection<Position> Positions { get; set; } = new List<Position>();
}

```

## File: D:\HRMS-Team\Domain\Entities\Employee.cs


```csharp

using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

public class Employee
{
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public int Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public DateTime HireDate { get; set; }
    public bool IsActive { get; set; } = true;

    // Foreign Keys
    public int DepartmentId { get; set; }
    public int UserId { get; set; }
    public int PositionId { get; set; }


    // Navigation Properties
    public Department Department { get; set; } = null!;
    public User User { get; set; } = null!;
    public Position Position { get; set; } = null!;
    public ICollection<Attendance> Attendances { get; set; } = new List<Attendance>();
    public ICollection<Salary> Salaries { get; set; } = new List<Salary>();
    public ICollection<Leave> LeaveRequests { get; set; } = new List<Leave>();
}

```

## File: D:\HRMS-Team\Domain\Entities\Leave.cs


```csharp

using Domain.Entities;
using Domain.Enums;

namespace Domain.Entities;

public class Leave
{
    public int Id { get; set; }

    public int EmployeeId { get; set; }
    public Employee Employee { get; set; } = null!;

    public LeaveType LeaveType { get; set; }
    public LeaveStatus Status { get; set; } = LeaveStatus.Pending;

    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int TotalDays { get; set; }

    public string Reason { get; set; } = string.Empty;

    public DateTime RequestedAt { get; set; } = DateTime.UtcNow;

    public int? ReviewedByUserId { get; set; }
    public User? ReviewedBy { get; set; }

    public DateTime? ReviewedAt { get; set; }
    public string RejectionReason { get; set; } = string.Empty;
}

```

## File: D:\HRMS-Team\Domain\Entities\Notification.cs


```csharp

using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    
    public class Notification
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public bool IsRead { get; set; } = false;
        public NotificationType Type { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public int UserId { get; set; }
        public User User { get; set; } = null!;
    }
}

```

## File: D:\HRMS-Team\Domain\Entities\Position.cs


```csharp

namespace Domain.Entities;

public class Position
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;  // ENG , Dev 
    public decimal SalaryMin { get; set; }              
    public decimal SalaryMax { get; set; }
    public int DepartmentId { get; set; }

    // Navigation Properties
    public Department Department { get; set; } = null!;
    public ICollection<Employee> Employees { get; set; } = new List<Employee>();
}

```

## File: D:\HRMS-Team\Domain\Entities\Salary.cs


```csharp

namespace Domain.Entities;

public class Salary
{
    public int Id { get; set; }
    public decimal BaseAmount { get; set; }
    public decimal Allowances { get; set; }
    public decimal Deductions { get; set; }
    public decimal GrossAmount { get; set; }
    public decimal NetAmount { get; set; }
    public int Month { get; set; }
    public int Year { get; set; }
    public DateTime EffectiveDate { get; set; }  // ← DateTime مش decimal

    public int EmployeeId { get; set; }
    public Employee Employee { get; set; } = null!;
}

```

## File: D:\HRMS-Team\Domain\Entities\User.cs


```csharp

namespace Domain.Entities;

public class User
{
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public  string Username { get; set; } = string.Empty; 
    public string Role { get; set; } = "Employee"; 
    public int? EmployeeId { get; set; }          
    public Employee? Employee { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public bool IsActive { get; set; } = true;

    // Navigation properties

        public ICollection<Notification> Notifications { get; set; } = new List<Notification>();


}

```

## File: D:\HRMS-Team\Domain\Enums\LeaveStatus.cs


```csharp

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Enums
{
    public enum LeaveStatus
    {
        Pending,
        Approved,
        Rejected
    }

}

```

## File: D:\HRMS-Team\Domain\Enums\LeaveType.cs


```csharp

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Enums
{
    
    public enum LeaveType
    {
        Annual,
        Sick,
        Emergency,
        Unpaid
    }

}

```

## File: D:\HRMS-Team\Domain\Enums\NotificationType.cs


```csharp

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Enums
{
    
    public enum NotificationType
    {
        // Leave
        LeaveRequested,
        LeaveApproved,
        LeaveRejected,
        LeaveCancelled,

        // Attendance
        ClockIn,
        ClockOut,

        // Salary
        SalaryCreated,
        SalaryUpdated,

        // General
        General
    }
}

```

## File: D:\HRMS-Team\Domain\Enums\UserRole.cs


```csharp

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Enums
{
    public enum UserRole { Admin, HR, Employee }
    
}

```

## File: D:\HRMS-Team\Domain\Interfaces\IGenericRepository.cs


```csharp


// Author: Abedalqader Alfaqeeh 
// last edit : 2026-04-10
// /<summary> this interface is used to define the basic CRUD operations for a generic repository pattern.
// It provides methods for retrieving, updating, and deleting entities of type T, where T is a class.
// The methods include options for including related entities when retrieving data, as well as checking for the existence of an entity by its ID.
// The SaveChangesAsync method is used to persist changes to the database asynchronously.</summary>


using System.Linq.Expressions;

namespace Domain.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync(
            params Expression<Func<T, object>>[] includes);

        Task<T?> GetAsync(
            Expression<Func<T, bool>> predicate,
            params Expression<Func<T, object>>[] includes);

        IQueryable<T> GetAllQueryable();

        Task<T?> GetByIdAsync(params object[] keyValues);

        Task<bool> ExistsAsync(Expression<Func<T, bool>> predicate);

        Task AddAsync(T entity);
        void Update(T entity);
        void Delete(T entity);
    }
}

```

## File: D:\HRMS-Team\Domain\Interfaces\IUnitOfWork.cs


```csharp

namespace Domain.Interfaces;

public interface IUnitOfWork : IDisposable
{
    IGenericRepository<T> Repository<T>() where T : class;
    Task<int> SaveChangesAsync();
}

```

## File: D:\HRMS-Team\Infrastructure\DependencyInjection.cs


```csharp

using Application.Mappings;
using Application.Services.Implementations;
using Application.Services.Interfaces;
using Application.Settings;
using Domain.Interfaces;
using Infrastructure.Data;
using Infrastructure.Data.Repositories;
using Infrastructure.Repositories;
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
        services.AddScoped<IAttendanceService, AttendanceService>();
        
        services.AddScoped<ISalaryService, SalaryService>();
        services.AddScoped<IUserService, UserService>();

        services.AddScoped<INotificationService, NotificationService>();
        // أضف هاد
        // obtain IConfiguration from the service collection to avoid missing 'configuration' variable
        
        services.Configure<EmailSettings>(configuration.GetSection("EmailSettings"));
        services.AddScoped<IEmailService, EmailService>();

        return services;
    }
}

```

## File: D:\HRMS-Team\Infrastructure\Infrastructure.csproj


```csproj

<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="AutoMapper" Version="16.1.1" />
    <PackageReference Include="BCrypt.Net-Next" Version="4.1.0" />
    <PackageReference Include="MailKit" Version="4.16.0" />
    <PackageReference Include="Microsoft.AspNetCore.Authentication.JwtBearer" Version="8.0.26" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="9.0.6">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
    <PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="9.0.6" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="9.0.6">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
    <PackageReference Include="MimeKit" Version="4.16.0" />
    <PackageReference Include="Npgsql.EntityFrameworkCore.PostgreSQL" Version="9.0.4" />
    <PackageReference Include="Portable.BouncyCastle" Version="1.9.0" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\Application\Application.csproj" />
    <ProjectReference Include="..\Domain\Domain.csproj" />
  </ItemGroup>

</Project>

```

## File: D:\HRMS-Team\Infrastructure\Data\AppContext\AppDbContext.cs


```csharp

using Domain.Entities;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;


namespace Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
    {
    
    }

    public DbSet<Employee> Employees { get; set; }
    public DbSet<Department> Departments { get; set; }
    public DbSet<Position> Positions { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Leave> Leaves => Set<Leave>();
    public DbSet<Attendance> Attendances { get; set; } 
    public DbSet<Salary> Salaries { get; set; }
    
    public DbSet<Notification> Notifications => Set<Notification>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Employee>()
            .HasOne(e => e.Department)
            .WithMany(d => d.Employees)
            .HasForeignKey(e => e.DepartmentId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Employee>()
            .HasOne(e => e.User)
            .WithOne(u => u.Employee)
            .HasForeignKey<Employee>(e => e.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        //modelBuilder.Entity<Employee>()
        //   .HasOne(e => e.User)
        //   .WithOne(u => u.Employee)
        //   .HasForeignKey<Employee>(e => e.Email)
        //   .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Employee>()
             .Property(e => e.Id)
             .ValueGeneratedNever();


        modelBuilder.Entity<Position>()
            .HasOne(p => p.Department)
            .WithMany(d => d.Positions)
            .HasForeignKey(p => p.DepartmentId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Leave>()
            .HasOne(l => l.Employee)
            .WithMany(e => e.LeaveRequests)
            .HasForeignKey(l => l.EmployeeId)
            .OnDelete(DeleteBehavior.Cascade);

    


        modelBuilder.Entity<Attendance>()
            .HasOne(a => a.Employee)
            .WithMany(e => e.Attendances)
            .HasForeignKey(a => a.EmployeeId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Salary>()
            .HasOne(s => s.Employee)
            .WithMany(e => e.Salaries)
            .HasForeignKey(s => s.EmployeeId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Notification>()
            .HasOne(n => n.User)
            .WithMany(u => u.Notifications)
            .HasForeignKey(n => n.UserId)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<Leave>()
            .Property(l => l.RejectionReason)
            .IsRequired(false)  // يقبل null
            .HasMaxLength(500);



        modelBuilder.Entity<Department>().HasData(
           new Department { Id = 1, Name = "HR" },
           new Department { Id = 2, Name = "IT" },
           new Department { Id = 3, Name = "Finance" },
           new Department { Id = 4, Name = "Operations" });

        modelBuilder.Entity<Position>().HasData(
    new Position { Id = 1, Title = "HR Manager", DepartmentId = 1 },
    new Position { Id = 2, Title = "HR Specialist", DepartmentId = 1 },
    new Position { Id = 3, Title = "Software Engineer", DepartmentId = 2 },
    new Position { Id = 4, Title = "IT Manager", DepartmentId = 2 },
    new Position { Id = 5, Title = "Accountant", DepartmentId = 3 },
    new Position { Id = 6, Title = "Finance Manager", DepartmentId = 3 },
    new Position { Id = 7, Title = "Operations Manager", DepartmentId = 4 }
);


    }
}

```

## File: D:\HRMS-Team\Infrastructure\Data\Repositories\GenericRepository.cs


```csharp

// Author : Abedalqader Alfaqeeh
// last Edit : 2026-04-11 
// / <summary> this class is an implementation of the IGenericRepository interface,
// which provides basic CRUD operations for a generic repository pattern. 


using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using Infrastructure.Data;

namespace Infrastructure.Data.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly AppDbContext context;
        private readonly DbSet<T> dbSet;

        public GenericRepository(AppDbContext context)
        {
            this.context = context;
            this.dbSet = context.Set<T>();
           
        }

        public async Task<IEnumerable<T>> GetAllAsync(params Expression<Func<T, object>>[] includes) 
        {

            IQueryable<T> query = dbSet;
            if (includes != null && includes.Length > 0)
            {
                foreach (var include in includes)
                {
                    query = query.Include(include);
                }
            }
            return await query.ToListAsync();


        }

        public IQueryable<T> GetAllQueryable() => context.Set<T>().AsQueryable();
        public async Task<T?> GetByIdAsync(params object[] keyValues)
        {
            return await dbSet.FindAsync(keyValues);
        }

        public async Task<T?> GetAsync(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = dbSet;
            if (includes != null && includes.Length > 0)
            {
                foreach (var include in includes)
                {
                    query = query.Include(include);
                }
            }
            return await query.FirstOrDefaultAsync(predicate);
        }

        public async Task<bool> ExistsAsync(Expression<Func<T, bool>> predicate)
        {
            return await dbSet.AnyAsync(predicate);
        }   

        public async Task AddAsync(T entity)
        {
            await dbSet.AddAsync(entity);
        }
        public void Update(T entity)
        {
            dbSet.Update(entity);
        }
        public void Delete(T entity)
        {
            dbSet.Remove(entity);
        } 






    }
}

```

## File: D:\HRMS-Team\Infrastructure\Data\Repositories\UnitOfWork.cs


```csharp

using Domain.Interfaces;
using Infrastructure.Data;
using Infrastructure.Data.Repositories;

namespace Infrastructure.Repositories;

public class UnitOfWork(AppDbContext context) : IUnitOfWork
{
    private readonly Dictionary<Type, object> _repositories = [];

    public IGenericRepository<T> Repository<T>() where T : class
    {
        var type = typeof(T);

        if (!_repositories.ContainsKey(type))
            _repositories[type] = new GenericRepository<T>(context);

        return (IGenericRepository<T>)_repositories[type];
    }

    public async Task<int> SaveChangesAsync() =>
        await context.SaveChangesAsync();

    public void Dispose() => context.Dispose();
}

```

## File: D:\HRMS-Team\Infrastructure\Migrations\20260410202948_firstDesgin.cs


```csharp

using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable
// linq => query lang => C#
namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class firstDesgin : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Departments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Location = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Departments", x => x.Id); 
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Username = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: false),
                    Role = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Positions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: false),
                    SalaryMin = table.Column<decimal>(type: "numeric", nullable: false),
                    SalaryMax = table.Column<decimal>(type: "numeric", nullable: false),
                    DepartmentId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Positions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Positions_Departments_DepartmentId",
                        column: x => x.DepartmentId,
                        principalTable: "Departments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    PhoneNumber = table.Column<string>(type: "text", nullable: false),
                    HireDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    DepartmentId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    PositionId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Employees_Departments_DepartmentId",
                        column: x => x.DepartmentId,
                        principalTable: "Departments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Employees_Positions_PositionId",
                        column: x => x.PositionId,
                        principalTable: "Positions",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Employees_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Attendances",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ClockIn = table.Column<TimeOnly>(type: "time without time zone", nullable: false),
                    ClockOut = table.Column<TimeOnly>(type: "time without time zone", nullable: true),
                    EmployeeId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Attendances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Attendances_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "LeaveRequests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    LeaveType = table.Column<int>(type: "integer", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    RejectionReason = table.Column<string>(type: "text", nullable: true),
                    EmployeeId = table.Column<int>(type: "integer", nullable: false),
                    ApprovedBy = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LeaveRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LeaveRequests_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LeaveRequests_Users_ApprovedBy",
                        column: x => x.ApprovedBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Salaries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BaseAmount = table.Column<decimal>(type: "numeric", nullable: false),
                    Allowances = table.Column<decimal>(type: "numeric", nullable: false),
                    Deductions = table.Column<decimal>(type: "numeric", nullable: false),
                    GrossAmount = table.Column<decimal>(type: "numeric", nullable: false),
                    NetAmount = table.Column<decimal>(type: "numeric", nullable: false),
                    Month = table.Column<int>(type: "integer", nullable: false),
                    Year = table.Column<int>(type: "integer", nullable: false),
                    EffectiveDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EmployeeId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Salaries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Salaries_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "PasswordHash", "Role", "Username" },
                values: new object[] { 1, "Admin123@Gmail.com", "Admin123", 0, "Abood" });

            migrationBuilder.CreateIndex(
                name: "IX_Attendances_EmployeeId",
                table: "Attendances",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_DepartmentId",
                table: "Employees",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_PositionId",
                table: "Employees",
                column: "PositionId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_UserId",
                table: "Employees",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_LeaveRequests_ApprovedBy",
                table: "LeaveRequests",
                column: "ApprovedBy");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveRequests_EmployeeId",
                table: "LeaveRequests",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Positions_DepartmentId",
                table: "Positions",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Salaries_EmployeeId",
                table: "Salaries",
                column: "EmployeeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Attendances");

            migrationBuilder.DropTable(
                name: "LeaveRequests");

            migrationBuilder.DropTable(
                name: "Salaries");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "Positions");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Departments");
        }
    }
}

```

## File: D:\HRMS-Team\Infrastructure\Migrations\20260423144214_EditUser.cs


```csharp

using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class EditUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.AlterColumn<string>(
                name: "Role",
                table: "Users",
                type: "text",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Users",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "EmployeeId",
                table: "Users",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Users",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "EmployeeId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Users");

            migrationBuilder.AlterColumn<int>(
                name: "Role",
                table: "Users",
                type: "integer",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "PasswordHash", "Role", "Username" },
                values: new object[] { 1, "Admin123@Gmail.com", "Admin123", 0, "Abood" });
        }
    }
}

```

## File: D:\HRMS-Team\Infrastructure\Migrations\20260424181829_SeedData.cs


```csharp

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class SeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Positions_PositionId",
                table: "Employees");

            migrationBuilder.AlterColumn<int>(
                name: "PositionId",
                table: "Employees",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "Departments",
                columns: new[] { "Id", "Location", "Name" },
                values: new object[,]
                {
                    { 1, "", "Human Resources" },
                    { 2, "", "Information Technology" },
                    { 3, "", "Finance" },
                    { 4, "", "Operations" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Positions_PositionId",
                table: "Employees",
                column: "PositionId",
                principalTable: "Positions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Positions_PositionId",
                table: "Employees");

            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.AlterColumn<int>(
                name: "PositionId",
                table: "Employees",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Positions_PositionId",
                table: "Employees",
                column: "PositionId",
                principalTable: "Positions",
                principalColumn: "Id");
        }
    }
}

```

## File: D:\HRMS-Team\Infrastructure\Migrations\20260424190651_SeedData2.cs


```csharp

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class SeedData2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Positions",
                columns: new[] { "Id", "DepartmentId", "SalaryMax", "SalaryMin", "Title" },
                values: new object[,]
                {
                    { 1, 1, 0m, 0m, "HR Manager" },
                    { 2, 1, 0m, 0m, "HR Specialist" },
                    { 3, 2, 0m, 0m, "Software Engineer" },
                    { 4, 2, 0m, 0m, "IT Manager" },
                    { 5, 3, 0m, 0m, "Accountant" },
                    { 6, 3, 0m, 0m, "Finance Manager" },
                    { 7, 4, 0m, 0m, "Operations Manager" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Positions",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Positions",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Positions",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Positions",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Positions",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Positions",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Positions",
                keyColumn: "Id",
                keyValue: 7);
        }
    }
}

```

## File: D:\HRMS-Team\Infrastructure\Migrations\20260430214833_leave.cs


```csharp

using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class leave : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LeaveRequests");

            migrationBuilder.CreateTable(
                name: "Leaves",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<int>(type: "integer", nullable: false),
                    LeaveType = table.Column<int>(type: "integer", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    TotalDays = table.Column<int>(type: "integer", nullable: false),
                    Reason = table.Column<string>(type: "text", nullable: false),
                    RequestedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ReviewedByUserId = table.Column<int>(type: "integer", nullable: true),
                    ReviewedById = table.Column<int>(type: "integer", nullable: true),
                    ReviewedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    RejectionReason = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Leaves", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Leaves_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Leaves_Users_ReviewedById",
                        column: x => x.ReviewedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Leaves_EmployeeId",
                table: "Leaves",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Leaves_ReviewedById",
                table: "Leaves",
                column: "ReviewedById");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Leaves");

            migrationBuilder.CreateTable(
                name: "LeaveRequests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ApprovedBy = table.Column<int>(type: "integer", nullable: true),
                    EmployeeId = table.Column<int>(type: "integer", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    LeaveType = table.Column<int>(type: "integer", nullable: false),
                    RejectionReason = table.Column<string>(type: "text", nullable: true),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LeaveRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LeaveRequests_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LeaveRequests_Users_ApprovedBy",
                        column: x => x.ApprovedBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LeaveRequests_ApprovedBy",
                table: "LeaveRequests",
                column: "ApprovedBy");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveRequests_EmployeeId",
                table: "LeaveRequests",
                column: "EmployeeId");
        }
    }
}

```

## File: D:\HRMS-Team\Infrastructure\Migrations\20260506191126_Notification.cs


```csharp

using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Notification : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Message = table.Column<string>(type: "text", nullable: false),
                    IsRead = table.Column<bool>(type: "boolean", nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Notifications_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_UserId",
                table: "Notifications",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Notifications");
        }
    }
}

```

## File: D:\HRMS-Team\Infrastructure\Migrations\20260507195327_EditNot.cs


```csharp

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class EditNot : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Users_UserId",
                table: "Notifications");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Users_UserId",
                table: "Notifications",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Users_UserId",
                table: "Notifications");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Users_UserId",
                table: "Notifications",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

```

## File: D:\HRMS-Team\Infrastructure\Migrations\20260507201628_EditAtt.cs


```csharp

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class EditAtt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TolalHours",
                table: "Attendances",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TolalHours",
                table: "Attendances");
        }
    }
}

```

## File: D:\HRMS-Team\Infrastructure\Migrations\20260508144002_Editleave.cs


```csharp

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Editleave : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "RejectionReason",
                table: "Leaves",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "RejectionReason",
                table: "Leaves",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");
        }
    }
}

```

## File: D:\HRMS-Team\Infrastructure\Migrations\20260508171334_FinalEdit.cs


```csharp

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class FinalEdit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TolalHours",
                table: "Attendances",
                newName: "TotalHours");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TotalHours",
                table: "Attendances",
                newName: "TolalHours");
        }
    }
}

```

## File: D:\HRMS-Team\Infrastructure\Migrations\20260508185056_2FinalEdit.cs


```csharp

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class _2FinalEdit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "RejectionReason",
                table: "Leaves",
                type: "character varying(500)",
                maxLength: 500,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "RejectionReason",
                table: "Leaves",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "character varying(500)",
                oldMaxLength: 500,
                oldNullable: true);
        }
    }
}

```

## File: D:\HRMS-Team\Infrastructure\Migrations\20260508192900_3FinalEdit.cs


```csharp

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class _3FinalEdit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Leaves_Employees_EmployeeId",
                table: "Leaves");

            migrationBuilder.AddForeignKey(
                name: "FK_Leaves_Employees_EmployeeId",
                table: "Leaves",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Leaves_Employees_EmployeeId",
                table: "Leaves");

            migrationBuilder.AddForeignKey(
                name: "FK_Leaves_Employees_EmployeeId",
                table: "Leaves",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

```

## File: D:\HRMS-Team\Infrastructure\Migrations\20260508194943_4FinalEdit.cs


```csharp

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class _4FinalEdit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attendances_Employees_EmployeeId",
                table: "Attendances");

            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Departments_DepartmentId",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Users_UserId",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_Positions_Departments_DepartmentId",
                table: "Positions");

            migrationBuilder.DropForeignKey(
                name: "FK_Salaries_Employees_EmployeeId",
                table: "Salaries");

            migrationBuilder.AddForeignKey(
                name: "FK_Attendances_Employees_EmployeeId",
                table: "Attendances",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Departments_DepartmentId",
                table: "Employees",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Users_UserId",
                table: "Employees",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Positions_Departments_DepartmentId",
                table: "Positions",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Salaries_Employees_EmployeeId",
                table: "Salaries",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attendances_Employees_EmployeeId",
                table: "Attendances");

            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Departments_DepartmentId",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Users_UserId",
                table: "Employees");

            migrationBuilder.DropForeignKey(
                name: "FK_Positions_Departments_DepartmentId",
                table: "Positions");

            migrationBuilder.DropForeignKey(
                name: "FK_Salaries_Employees_EmployeeId",
                table: "Salaries");

            migrationBuilder.AddForeignKey(
                name: "FK_Attendances_Employees_EmployeeId",
                table: "Attendances",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Departments_DepartmentId",
                table: "Employees",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Users_UserId",
                table: "Employees",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Positions_Departments_DepartmentId",
                table: "Positions",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Salaries_Employees_EmployeeId",
                table: "Salaries",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

```

## File: D:\HRMS-Team\Infrastructure\Migrations\20260510182522_CustomEmployeeId.cs


```csharp

using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CustomEmployeeId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Employees",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .OldAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "HR");

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2,
                column: "Name",
                value: "IT");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Employees",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "Human Resources");

            migrationBuilder.UpdateData(
                table: "Departments",
                keyColumn: "Id",
                keyValue: 2,
                column: "Name",
                value: "Information Technology");
        }
    }
}

```

## File: D:\HRMS-Team\Infrastructure\Migrations\AppDbContextModelSnapshot.cs


```csharp

// <auto-generated />
using System;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infrastructure.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Domain.Entities.Attendance", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<TimeOnly>("ClockIn")
                        .HasColumnType("time without time zone");

                    b.Property<TimeOnly?>("ClockOut")
                        .HasColumnType("time without time zone");

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("EmployeeId")
                        .HasColumnType("integer");

                    b.Property<int>("TotalHours")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("EmployeeId");

                    b.ToTable("Attendances");
                });

            modelBuilder.Entity("Domain.Entities.Department", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Departments");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Location = "",
                            Name = "HR"
                        },
                        new
                        {
                            Id = 2,
                            Location = "",
                            Name = "IT"
                        },
                        new
                        {
                            Id = 3,
                            Location = "",
                            Name = "Finance"
                        },
                        new
                        {
                            Id = 4,
                            Location = "",
                            Name = "Operations"
                        });
                });

            modelBuilder.Entity("Domain.Entities.Employee", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("integer");

                    b.Property<int>("DepartmentId")
                        .HasColumnType("integer");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("HireDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<bool>("IsActive")
                        .HasColumnType("boolean");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("PositionId")
                        .HasColumnType("integer");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("DepartmentId");

                    b.HasIndex("PositionId");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Employees");
                });

            modelBuilder.Entity("Domain.Entities.Leave", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("EmployeeId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("LeaveType")
                        .HasColumnType("integer");

                    b.Property<string>("Reason")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("RejectionReason")
                        .HasMaxLength(500)
                        .HasColumnType("character varying(500)");

                    b.Property<DateTime>("RequestedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("ReviewedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int?>("ReviewedById")
                        .HasColumnType("integer");

                    b.Property<int?>("ReviewedByUserId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.Property<int>("TotalDays")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("EmployeeId");

                    b.HasIndex("ReviewedById");

                    b.ToTable("Leaves");
                });

            modelBuilder.Entity("Domain.Entities.Notification", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<bool>("IsRead")
                        .HasColumnType("boolean");

                    b.Property<string>("Message")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Type")
                        .HasColumnType("integer");

                    b.Property<int>("UserId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Notifications");
                });

            modelBuilder.Entity("Domain.Entities.Position", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("DepartmentId")
                        .HasColumnType("integer");

                    b.Property<decimal>("SalaryMax")
                        .HasColumnType("numeric");

                    b.Property<decimal>("SalaryMin")
                        .HasColumnType("numeric");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("DepartmentId");

                    b.ToTable("Positions");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            DepartmentId = 1,
                            SalaryMax = 0m,
                            SalaryMin = 0m,
                            Title = "HR Manager"
                        },
                        new
                        {
                            Id = 2,
                            DepartmentId = 1,
                            SalaryMax = 0m,
                            SalaryMin = 0m,
                            Title = "HR Specialist"
                        },
                        new
                        {
                            Id = 3,
                            DepartmentId = 2,
                            SalaryMax = 0m,
                            SalaryMin = 0m,
                            Title = "Software Engineer"
                        },
                        new
                        {
                            Id = 4,
                            DepartmentId = 2,
                            SalaryMax = 0m,
                            SalaryMin = 0m,
                            Title = "IT Manager"
                        },
                        new
                        {
                            Id = 5,
                            DepartmentId = 3,
                            SalaryMax = 0m,
                            SalaryMin = 0m,
                            Title = "Accountant"
                        },
                        new
                        {
                            Id = 6,
                            DepartmentId = 3,
                            SalaryMax = 0m,
                            SalaryMin = 0m,
                            Title = "Finance Manager"
                        },
                        new
                        {
                            Id = 7,
                            DepartmentId = 4,
                            SalaryMax = 0m,
                            SalaryMin = 0m,
                            Title = "Operations Manager"
                        });
                });

            modelBuilder.Entity("Domain.Entities.Salary", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<decimal>("Allowances")
                        .HasColumnType("numeric");

                    b.Property<decimal>("BaseAmount")
                        .HasColumnType("numeric");

                    b.Property<decimal>("Deductions")
                        .HasColumnType("numeric");

                    b.Property<DateTime>("EffectiveDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("EmployeeId")
                        .HasColumnType("integer");

                    b.Property<decimal>("GrossAmount")
                        .HasColumnType("numeric");

                    b.Property<int>("Month")
                        .HasColumnType("integer");

                    b.Property<decimal>("NetAmount")
                        .HasColumnType("numeric");

                    b.Property<int>("Year")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("EmployeeId");

                    b.ToTable("Salaries");
                });

            modelBuilder.Entity("Domain.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int?>("EmployeeId")
                        .HasColumnType("integer");

                    b.Property<bool>("IsActive")
                        .HasColumnType("boolean");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Domain.Entities.Attendance", b =>
                {
                    b.HasOne("Domain.Entities.Employee", "Employee")
                        .WithMany("Attendances")
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Employee");
                });

            modelBuilder.Entity("Domain.Entities.Employee", b =>
                {
                    b.HasOne("Domain.Entities.Department", "Department")
                        .WithMany("Employees")
                        .HasForeignKey("DepartmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Entities.Position", "Position")
                        .WithMany("Employees")
                        .HasForeignKey("PositionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Entities.User", "User")
                        .WithOne("Employee")
                        .HasForeignKey("Domain.Entities.Employee", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Department");

                    b.Navigation("Position");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain.Entities.Leave", b =>
                {
                    b.HasOne("Domain.Entities.Employee", "Employee")
                        .WithMany("LeaveRequests")
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Entities.User", "ReviewedBy")
                        .WithMany()
                        .HasForeignKey("ReviewedById");

                    b.Navigation("Employee");

                    b.Navigation("ReviewedBy");
                });

            modelBuilder.Entity("Domain.Entities.Notification", b =>
                {
                    b.HasOne("Domain.Entities.User", "User")
                        .WithMany("Notifications")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain.Entities.Position", b =>
                {
                    b.HasOne("Domain.Entities.Department", "Department")
                        .WithMany("Positions")
                        .HasForeignKey("DepartmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Department");
                });

            modelBuilder.Entity("Domain.Entities.Salary", b =>
                {
                    b.HasOne("Domain.Entities.Employee", "Employee")
                        .WithMany("Salaries")
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Employee");
                });

            modelBuilder.Entity("Domain.Entities.Department", b =>
                {
                    b.Navigation("Employees");

                    b.Navigation("Positions");
                });

            modelBuilder.Entity("Domain.Entities.Employee", b =>
                {
                    b.Navigation("Attendances");

                    b.Navigation("LeaveRequests");

                    b.Navigation("Salaries");
                });

            modelBuilder.Entity("Domain.Entities.Position", b =>
                {
                    b.Navigation("Employees");
                });

            modelBuilder.Entity("Domain.Entities.User", b =>
                {
                    b.Navigation("Employee");

                    b.Navigation("Notifications");
                });
#pragma warning restore 612, 618
        }
    }
}

```

## File: D:\HRMS-Team\Infrastructure\Services\EmailService.cs


```csharp

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

    // â”€â”€ Core Send â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

    // â”€â”€ Template Builder â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
              <p>HRMS â€” Human Resource Management System</p>
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

    // â”€â”€ Welcome â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

    // â”€â”€ Leave Requested â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
            $"New Leave Request â€” {employeeName}",
            BuildTemplate("New Leave Request", "#f59e0b", body));
    }

    // â”€â”€ Leave Status â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
            $"Leave Request {status} â€” {leaveType}",
            BuildTemplate($"Leave {status}", color, body));
    }

    // â”€â”€ Leave Cancelled â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
            $"Leave Request Cancelled â€” {employeeName}",
            BuildTemplate("Leave Cancelled", "#64748b", body));
    }

    // â”€â”€ Clock In â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

    // â”€â”€ Clock Out â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

    // â”€â”€ Salary Created â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
            $"Salary Statement â€” {month}/{year}",
            BuildTemplate("Salary Statement", "#10b981", body));
    }

    // â”€â”€ Salary Updated â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
            $"Salary Updated â€” {month}/{year}",
            BuildTemplate("Salary Updated", "#f59e0b", body));
    }
}

```

## File: D:\HRMS-Team\HRMS-GradProject\HRMS_API.csproj


```csproj

<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
    <RootNamespace>HRMS_GradProject</RootNamespace>
    <UserSecretsId>f6ddbb35-c8da-4f3f-a3e1-ac58e5975bcc</UserSecretsId>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="MailKit" Version="4.16.0" />
    <PackageReference Include="Microsoft.AspNetCore.Authentication.JwtBearer" Version="8.0.26" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Relational" Version="9.0.6" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="9.0.6" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="9.0.6">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
    <PackageReference Include="MimeKit" Version="4.16.0" />
    <PackageReference Include="Npgsql.EntityFrameworkCore.PostgreSQL" Version="9.0.4" />
    <PackageReference Include="Pomelo.EntityFrameworkCore.MySql" Version="9.0.0" />
    <PackageReference Include="Swashbuckle.AspNetCore" Version="6.6.2" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\Application\Application.csproj" />
    <ProjectReference Include="..\Infrastructure\Infrastructure.csproj" />
  </ItemGroup>

</Project>

```

## File: D:\HRMS-Team\HRMS-GradProject\Program.cs


```csharp

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
    options.AddPolicy("AllowAngular",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

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
}

app.UseHttpsRedirection();

app.UseCors("AllowAngular");

app.UseAuthentication();
app.UseAuthorization();
app.UseMiddleware<ExceptionHandlingMiddleware>();
app.MapControllers();

app.Run();

```

## File: D:\HRMS-Team\HRMS-GradProject\Controllers\AIInsightsController.cs


```csharp

using Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace HRMS_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AIInsightsController : ControllerBase
    {
        public class ChatRequest { public string Message { get; set; } = string.Empty; }

        private readonly ILeaveService _leaveService;
        private readonly IEmployeeService _employeeService;
        private readonly IAttendanceService _attendanceService;
        private readonly ISalaryService _salaryService;
        private readonly IDepartmentService _departmentService;
        private readonly IConfiguration _configuration;

        public AIInsightsController(
            ILeaveService leaveService,
            IEmployeeService employeeService,
            IAttendanceService attendanceService,
            ISalaryService salaryService,
            IDepartmentService departmentService,
            IConfiguration configuration)
        {
            _leaveService = leaveService;
            _employeeService = employeeService;
            _attendanceService = attendanceService;
            _salaryService = salaryService;
            _departmentService = departmentService;
            _configuration = configuration;
        }

        // â”€â”€â”€ Core Groq helper (OpenAI Compatible) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        private async Task<string> GetAIResponseAsync(string prompt)
        {
            string apiKey = _configuration["GeminiApiKey"];
            if (string.IsNullOrEmpty(apiKey)) return "ðŸ’¡ ÙŠØ±Ø¬Ù‰ Ø¥Ø¶Ø§ÙØ© Ù…ÙØªØ§Ø­ Gemini ÙÙŠ Ø§Ù„Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª.";

            string url = "https://api.groq.com/openai/v1/chat/completions";
            var requestBody = new
            {
                model = "llama-3.1-8b-instant",
                messages = new[]
                {
                    new { role = "user", content = prompt }
                },
                temperature = 0.5
            };

            using var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");

            var content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");
            
            try 
            {
                var response = await httpClient.PostAsync(url, content);

                if (response.IsSuccessStatusCode)
                {
                    var responseString = await response.Content.ReadAsStringAsync();
                    using var jsonDoc = JsonDocument.Parse(responseString);
                    var root = jsonDoc.RootElement;
                    string text = root.GetProperty("choices")[0]
                                     .GetProperty("message")
                                     .GetProperty("content").GetString() ?? "";
                    
                    text = text.Replace("**", "").Replace("\n", " ");
                    return "ðŸš€ " + text.Trim();
                }

                return "ðŸ’¡ Ø¹Ø°Ø±Ø§Ù‹ØŒ Ø®Ø¯Ù…Ø© Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ (Groq) ØºÙŠØ± Ù…ØªÙˆÙØ±Ø© Ø­Ø§Ù„ÙŠØ§Ù‹.";
            }
            catch 
            {
                return "ðŸ’¡ Ø­Ø¯Ø« Ø®Ø·Ø£ Ø£Ø«Ù†Ø§Ø¡ Ø§Ù„Ø§ØªØµØ§Ù„ Ø¨Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ.";
            }
        }

        // â”€â”€â”€ Build full admin context from ALL tables â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        private async Task<string> BuildAdminContextAsync()
        {
            try
            {
                var employees = await _employeeService.GetAllAsync(1, 200);
                var leaves = await _leaveService.GetAllAsync(1, 500);
                var attendance = await _attendanceService.GetAllAsync(1, 500);
                var salaries = await _salaryService.GetAllAsync(1, 500);
                var departments = await _departmentService.GetAllAsync();

                var empNames = string.Join(", ", employees.Items.Select(e => e.FullName));
                var pendingLeaves = leaves.Items.Count(l => l.Status == "Pending");
                var approvedLeaves = leaves.Items.Count(l => l.Status == "Approved");
                var workingNow = attendance.Items.Where(a => a.ClockIn != null).Select(a => a.EmployeeName).Distinct().ToList();
                var missingOut = attendance.Items.Where(a => a.ClockOut == null && a.ClockIn != null).Select(a => a.EmployeeName).Distinct().ToList();
                var totalSalaryNet = salaries.Items.Sum(s => s.NetAmount);
                var totalSalaryGross = salaries.Items.Sum(s => s.GrossAmount);
                var deptNames = string.Join(", ", departments.Select(d => d.Name));

                // Per-department employee count
                var deptBreakdown = employees.Items
                    .GroupBy(e => e.DepartmentName ?? "ØºÙŠØ± Ù…Ø­Ø¯Ø¯")
                    .Select(g => $"{g.Key}: {g.Count()} Ù…ÙˆØ¸Ù")
                    .ToList();

                return $@"
[Ù‚Ø§Ø¹Ø¯Ø© Ø¨ÙŠØ§Ù†Ø§Øª ÙƒØ§Ù…Ù„Ø© Ù…Ù† Ø§Ù„Ù†Ø¸Ø§Ù… - Kawadir HRMS - Ù„Ù„Ù…Ø¯ÙŠØ± ÙÙ‚Ø·]:
- Ø¥Ø¬Ù…Ø§Ù„ÙŠ Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ†: {employees.TotalCount}
- Ø£Ø³Ù…Ø§Ø¡ Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ†: {empNames}
- Ø§Ù„Ø£Ù‚Ø³Ø§Ù… ({departments.Count} Ù‚Ø³Ù…): {deptNames}
- ØªÙˆØ²ÙŠØ¹ Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ† Ø¹Ù„Ù‰ Ø§Ù„Ø£Ù‚Ø³Ø§Ù…: {string.Join(" | ", deptBreakdown)}
- Ø·Ù„Ø¨Ø§Øª Ø§Ù„Ø¥Ø¬Ø§Ø²Ø© Ø§Ù„Ù…Ø¹Ù„Ù‚Ø©: {pendingLeaves}
- Ø·Ù„Ø¨Ø§Øª Ø§Ù„Ø¥Ø¬Ø§Ø²Ø© Ø§Ù„Ù…ÙˆØ§ÙÙ‚ Ø¹Ù„ÙŠÙ‡Ø§: {approvedLeaves}
- Ø¥Ø¬Ù…Ø§Ù„ÙŠ Ø·Ù„Ø¨Ø§Øª Ø§Ù„Ø¥Ø¬Ø§Ø²Ø©: {leaves.Items.Count}
- Ø§Ù„Ù…ÙˆØ¸ÙÙˆÙ† Ø§Ù„Ø¹Ø§Ù…Ù„ÙˆÙ† Ø§Ù„Ø¢Ù† (Ø³Ø¬Ù„ÙˆØ§ Ø¯Ø®ÙˆÙ„Ø§Ù‹): {(workingNow.Any() ? string.Join(", ", workingNow) : "Ù„Ø§ ÙŠÙˆØ¬Ø¯")}
- Ù…ÙˆØ¸ÙÙˆÙ† Ù„Ù… ÙŠØ³Ø¬Ù„ÙˆØ§ Ø®Ø±ÙˆØ¬Ø§Ù‹ Ø¨Ø¹Ø¯: {(missingOut.Any() ? string.Join(", ", missingOut) : "Ù„Ø§ ÙŠÙˆØ¬Ø¯")}
- Ø¥Ø¬Ù…Ø§Ù„ÙŠ Ø§Ù„Ø±ÙˆØ§ØªØ¨ Ø§Ù„Ø¥Ø¬Ù…Ø§Ù„ÙŠØ© Ø§Ù„Ù…Ø¯ÙÙˆØ¹Ø©: {totalSalaryGross:F0} JD
- Ø¥Ø¬Ù…Ø§Ù„ÙŠ Ø§Ù„Ø±ÙˆØ§ØªØ¨ Ø§Ù„ØµØ§ÙÙŠØ© Ø§Ù„Ù…Ø¯ÙÙˆØ¹Ø©: {totalSalaryNet:F0} JD
";
            }
            catch
            {
                return "[ØªØ¹Ø°Ù‘Ø± Ø¬Ù„Ø¨ Ø¨Ø¹Ø¶ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ù…Ù† Ù‚Ø§Ø¹Ø¯Ø© Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª]";
            }
        }

        // â”€â”€â”€ Unified page-aware insight endpoint â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        [HttpGet("insight/{page}")]
        [Authorize]
        public async Task<IActionResult> GetPageInsight(string page, [FromQuery] string role = "employee")
        {
            bool isAdmin = User.IsInRole("Admin") || User.IsInRole("HR");
            string prompt;

            if (isAdmin)
            {
                string ctx = await BuildAdminContextAsync();
                prompt = page.ToLower() switch
                {
                    "employees" => $@"{ctx}
Ø£Ù†Øª Ø®Ø¨ÙŠØ± Ù…ÙˆØ§Ø±Ø¯ Ø¨Ø´Ø±ÙŠØ©. Ø¨Ù†Ø§Ø¡Ù‹ Ø¹Ù„Ù‰ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø£Ø¹Ù„Ø§Ù‡ØŒ Ø£Ø¹Ø· Ø§Ù„Ù…Ø¯ÙŠØ± Ù†ØµÙŠØ­Ø© ÙˆØ§Ø­Ø¯Ø© Ù…Ø®ØªØµØ±Ø© (Ø³Ø·Ø± ÙˆØ§Ø­Ø¯ ÙÙ‚Ø·) ØªØ®Øµ Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ† (Ù…Ø«Ù„: ØªÙˆØ²ÙŠØ¹ Ø§Ù„Ø£Ù‚Ø³Ø§Ù…ØŒ Ù…Ø¹Ø¯Ù„ Ø§Ù„Ø­Ø¶ÙˆØ±ØŒ Ø£Ùˆ Ø§Ù‚ØªØ±Ø§Ø­ Ø¥Ø¬Ø±Ø§Ø¡). Ù„Ø§ Ù…Ù‚Ø¯Ù…Ø§Øª.",

                    "leaves" => $@"{ctx}
Ø£Ù†Øª Ø®Ø¨ÙŠØ± Ù…ÙˆØ§Ø±Ø¯ Ø¨Ø´Ø±ÙŠØ©. Ø¨Ù†Ø§Ø¡Ù‹ Ø¹Ù„Ù‰ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø£Ø¹Ù„Ø§Ù‡ØŒ Ø£Ø¹Ø· Ø§Ù„Ù…Ø¯ÙŠØ± Ù†ØµÙŠØ­Ø© ÙˆØ§Ø­Ø¯Ø© Ù…Ø®ØªØµØ±Ø© (Ø³Ø·Ø± ÙˆØ§Ø­Ø¯) ØªØ®Øµ Ø¥Ø¯Ø§Ø±Ø© Ø·Ù„Ø¨Ø§Øª Ø§Ù„Ø¥Ø¬Ø§Ø²Ø© Ø§Ù„Ù…Ø¹Ù„Ù‚Ø© ÙˆØ§Ù„Ù…Ø¹ØªÙ…Ø¯Ø©. Ù„Ø§ Ù…Ù‚Ø¯Ù…Ø§Øª.",

                    "departments" => $@"{ctx}
Ø£Ù†Øª Ø®Ø¨ÙŠØ± Ù…ÙˆØ§Ø±Ø¯ Ø¨Ø´Ø±ÙŠØ©. Ø¨Ù†Ø§Ø¡Ù‹ Ø¹Ù„Ù‰ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø£Ø¹Ù„Ø§Ù‡ØŒ Ø£Ø¹Ø· Ø§Ù„Ù…Ø¯ÙŠØ± Ù†ØµÙŠØ­Ø© ÙˆØ§Ø­Ø¯Ø© Ù…Ø®ØªØµØ±Ø© (Ø³Ø·Ø± ÙˆØ§Ø­Ø¯) ØªØ®Øµ Ù‡ÙŠÙƒÙ„ Ø§Ù„Ø£Ù‚Ø³Ø§Ù… ÙˆØªÙˆØ²ÙŠØ¹ Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ†. Ù„Ø§ Ù…Ù‚Ø¯Ù…Ø§Øª.",

                    "salary" => $@"{ctx}
Ø£Ù†Øª Ø®Ø¨ÙŠØ± Ù…Ø§Ù„ÙŠ ÙÙŠ Ø§Ù„Ù…ÙˆØ§Ø±Ø¯ Ø§Ù„Ø¨Ø´Ø±ÙŠØ©. Ø¨Ù†Ø§Ø¡Ù‹ Ø¹Ù„Ù‰ Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø±ÙˆØ§ØªØ¨ Ø£Ø¹Ù„Ø§Ù‡ØŒ Ø£Ø¹Ø· Ø§Ù„Ù…Ø¯ÙŠØ± Ù†ØµÙŠØ­Ø© ÙˆØ§Ø­Ø¯Ø© Ù…Ø®ØªØµØ±Ø© (Ø³Ø·Ø± ÙˆØ§Ø­Ø¯) Ø­ÙˆÙ„ Ù…ÙŠØ²Ø§Ù†ÙŠØ© Ø§Ù„Ø±ÙˆØ§ØªØ¨ Ø£Ùˆ ØªÙˆØ²ÙŠØ¹Ù‡Ø§. Ù„Ø§ Ù…Ù‚Ø¯Ù…Ø§Øª.",

                    "attendance" => $@"{ctx}
Ø£Ù†Øª Ø®Ø¨ÙŠØ± Ù…ÙˆØ§Ø±Ø¯ Ø¨Ø´Ø±ÙŠØ©. Ø¨Ù†Ø§Ø¡Ù‹ Ø¹Ù„Ù‰ Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø­Ø¶ÙˆØ± Ø£Ø¹Ù„Ø§Ù‡ØŒ Ø£Ø¹Ø· Ø§Ù„Ù…Ø¯ÙŠØ± Ù†ØµÙŠØ­Ø© ÙˆØ§Ø­Ø¯Ø© Ù…Ø®ØªØµØ±Ø© (Ø³Ø·Ø± ÙˆØ§Ø­Ø¯) Ø­ÙˆÙ„ Ø§Ù„Ø§Ù„ØªØ²Ø§Ù… Ø¨Ù…ÙˆØ§Ø¹ÙŠØ¯ Ø§Ù„Ø­Ø¶ÙˆØ± ÙˆØ§Ù„ØºÙŠØ§Ø¨. Ù„Ø§ Ù…Ù‚Ø¯Ù…Ø§Øª.",

                    // dashboard default
                    _ => $@"{ctx}
Ø£Ù†Øª Ù…Ø³ØªØ´Ø§Ø± Ù…ÙˆØ§Ø±Ø¯ Ø¨Ø´Ø±ÙŠØ©. Ø¨Ù†Ø§Ø¡Ù‹ Ø¹Ù„Ù‰ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø´Ø§Ù…Ù„Ø© Ø£Ø¹Ù„Ø§Ù‡ØŒ Ø£Ø¹Ø· Ø§Ù„Ù…Ø¯ÙŠØ± Ù†ØµÙŠØ­Ø© Ø¥Ø¯Ø§Ø±ÙŠØ© ÙˆØ§Ø­Ø¯Ø© Ù…Ø®ØªØµØ±Ø© (Ø³Ø·Ø± ÙˆØ§Ø­Ø¯) ØªØµÙ„Ø­ Ù„Ù†Ø¸Ø±Ø© Ø¹Ø§Ù…Ø©. Ù„Ø§ Ù…Ù‚Ø¯Ù…Ø§Øª."
                };
            }
            else
            {
                // Employee - fetch personal data only
                var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                string personalCtx = "";
                if (int.TryParse(userIdStr, out int userId))
                {
                    try
                    {
                        var myLeaves = await _leaveService.GetMyLeavesAsync(userId, 1, 100);
                        var totalApproved = myLeaves.Items.Where(l => l.Status == "Approved" && l.LeaveType == "Annual").Sum(l => l.TotalDays);
                        var pending = myLeaves.Items.Count(l => l.Status == "Pending");
                        personalCtx = $"- Ø±ØµÙŠØ¯ Ø§Ù„Ø¥Ø¬Ø§Ø²Ø§Øª Ø§Ù„Ø³Ù†ÙˆÙŠØ© Ø§Ù„Ù…ØªØ¨Ù‚ÙŠ: {14 - totalApproved} ÙŠÙˆÙ…\n- Ø·Ù„Ø¨Ø§Øª Ø¥Ø¬Ø§Ø²Ø© Ù…Ø¹Ù„Ù‚Ø©: {pending}";
                    }
                    catch { }
                }

                prompt = page.ToLower() switch
                {
                    "leaves" => $@"Ø£Ù†Øª Ù…Ø±Ø´Ø¯ ÙˆØ¸ÙŠÙÙŠ. Ø¨ÙŠØ§Ù†Ø§ØªÙŠ: {personalCtx}. Ø£Ø¹Ø·Ù†ÙŠ Ù†ØµÙŠØ­Ø© Ù‚ØµÙŠØ±Ø© Ø¬Ø¯Ø§Ù‹ (Ø³Ø·Ø± ÙˆØ§Ø­Ø¯) Ø­ÙˆÙ„ ÙƒÙŠÙÙŠØ© Ø§Ù„ØªØ®Ø·ÙŠØ· Ù„Ù„Ø¥Ø¬Ø§Ø²Ø§Øª Ø¨Ø§Ø­ØªØ±Ø§ÙÙŠØ©. Ù„Ø§ Ù…Ù‚Ø¯Ù…Ø§Øª.",
                    "salary" => $@"Ø£Ù†Øª Ù…Ø±Ø´Ø¯ ÙˆØ¸ÙŠÙÙŠ. Ø£Ø¹Ø·Ù†ÙŠ Ù†ØµÙŠØ­Ø© Ù‚ØµÙŠØ±Ø© Ø¬Ø¯Ø§Ù‹ (Ø³Ø·Ø± ÙˆØ§Ø­Ø¯) Ø­ÙˆÙ„ Ø£Ù‡Ù…ÙŠØ© Ù…Ø±Ø§Ø¬Ø¹Ø© ÙƒØ´Ù Ø§Ù„Ø±Ø§ØªØ¨ Ø§Ù„Ø´Ù‡Ø±ÙŠ ÙˆØ§Ù„ØªØ£ÙƒØ¯ Ù…Ù† Ø¯Ù‚ØªÙ‡. Ù„Ø§ Ù…Ù‚Ø¯Ù…Ø§Øª.",
                    "attendance" => $@"Ø£Ù†Øª Ù…Ø±Ø´Ø¯ ÙˆØ¸ÙŠÙÙŠ. Ø£Ø¹Ø·Ù†ÙŠ Ù†ØµÙŠØ­Ø© Ù‚ØµÙŠØ±Ø© Ø¬Ø¯Ø§Ù‹ (Ø³Ø·Ø± ÙˆØ§Ø­Ø¯) Ø­ÙˆÙ„ Ø§Ù„Ø§Ù„ØªØ²Ø§Ù… Ø¨Ù…ÙˆØ§Ø¹ÙŠØ¯ Ø§Ù„Ø­Ø¶ÙˆØ± ÙˆØªØ£Ø«ÙŠØ±Ù‡ Ø¹Ù„Ù‰ Ø§Ù„ØªÙ‚ÙŠÙŠÙ… Ø§Ù„Ø³Ù†ÙˆÙŠ. Ù„Ø§ Ù…Ù‚Ø¯Ù…Ø§Øª.",
                    _ => $@"Ø£Ù†Øª Ù…Ø±Ø´Ø¯ ÙˆØ¸ÙŠÙÙŠ. Ø¨ÙŠØ§Ù†Ø§ØªÙŠ: {personalCtx}. Ø£Ø¹Ø·Ù†ÙŠ Ù†ØµÙŠØ­Ø© ÙˆØ¸ÙŠÙÙŠØ© Ù‚ØµÙŠØ±Ø© Ø¬Ø¯Ø§Ù‹ (Ø³Ø·Ø± ÙˆØ§Ø­Ø¯) ØªÙ†Ø§Ø³Ø¨Ù†ÙŠ. Ù„Ø§ Ù…Ù‚Ø¯Ù…Ø§Øª."
                };
            }

            string advice = await GetAIResponseAsync(prompt);
            return Ok(new { data = advice, success = true });
        }

        // â”€â”€â”€ Legacy admin endpoint (kept for backward compat) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        [HttpGet("admin")]
        [Authorize(Roles = "Admin,HR")]
        public async Task<IActionResult> GetAdminInsight()
        {
            return await GetPageInsight("dashboard", "admin");
        }

        // â”€â”€â”€ Legacy employee endpoint â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        [HttpGet("employee")]
        [Authorize]
        public async Task<IActionResult> GetEmployeeInsight()
        {
            return await GetPageInsight("dashboard", "employee");
        }

        // â”€â”€â”€ Specific employee insight (for Employees table button) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        [HttpGet("employee-insight/{employeeId}")]
        [Authorize(Roles = "Admin,HR")]
        public async Task<IActionResult> GetSpecificEmployeeInsight(int employeeId)
        {
            try
            {
                var employee = await _employeeService.GetByIdAsync(employeeId);
                if (employee == null) return NotFound("Ø§Ù„Ù…ÙˆØ¸Ù ØºÙŠØ± Ù…ÙˆØ¬ÙˆØ¯");

                var attendance = await _attendanceService.GetMyAttendanceAsync(employeeId, 1, 100);
                var leaves = await _leaveService.GetMyLeavesAsync(employeeId, 1, 100);

                var totalLeaves = leaves.Items.Count;
                var missingPunches = attendance.Items.Count(a => a.ClockOut == null);
                var approvedLeaves = leaves.Items.Count(l => l.Status == "Approved");

                string prompt = $@"Ø£Ù†Øª Ø®Ø¨ÙŠØ± Ù…ÙˆØ§Ø±Ø¯ Ø¨Ø´Ø±ÙŠØ©. Ø£Ø¹Ø·Ù†ÙŠ ØªÙ‚ÙŠÙŠÙ…Ø§Ù‹ Ø³Ø±ÙŠØ§Ù‹ ÙˆÙ…Ø®ØªØµØ±Ø§Ù‹ Ø¬Ø¯Ø§Ù‹ (Ø³Ø·Ø± Ø£Ùˆ Ø³Ø·Ø±ÙŠÙ†) Ø­ÙˆÙ„ ÙƒÙŠÙÙŠØ© Ø§Ù„ØªØ¹Ø§Ù…Ù„ Ù…Ø¹ Ù‡Ø°Ø§ Ø§Ù„Ù…ÙˆØ¸Ù.
Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª: Ø§Ù„Ø§Ø³Ù…: {employee.FullName}ØŒ Ø§Ù„Ù…Ù†ØµØ¨: {employee.PositionTitle}ØŒ Ø§Ù„Ù‚Ø³Ù…: {employee.DepartmentName}.
Ø¥Ø¬Ù…Ø§Ù„ÙŠ Ø·Ù„Ø¨Ø§Øª Ø§Ù„Ø¥Ø¬Ø§Ø²Ø©: {totalLeaves}ØŒ Ø§Ù„Ø¥Ø¬Ø§Ø²Ø§Øª Ø§Ù„Ù…ÙˆØ§ÙÙ‚ Ø¹Ù„ÙŠÙ‡Ø§: {approvedLeaves}ØŒ Ø­Ø§Ù„Ø§Øª Ù†Ø³ÙŠØ§Ù† Ø¨ØµÙ…Ø© Ø§Ù„Ø®Ø±ÙˆØ¬: {missingPunches}.
Ø§Ù‚ØªØ±Ø­ Ø¥Ø¬Ø±Ø§Ø¡Ù‹ (ØªØ±Ù‚ÙŠØ© / ØªØ­ÙÙŠØ² / Ù„ÙØª Ù†Ø¸Ø±) Ø¨Ù†Ø§Ø¡Ù‹ Ø¹Ù„Ù‰ Ù‡Ø°Ù‡ Ø§Ù„Ø£Ø±Ù‚Ø§Ù…. ÙƒÙ† Ù…Ø¨Ø§Ø´Ø±Ø§Ù‹ ÙˆØ§Ø­ØªØ±Ø§ÙÙŠØ§Ù‹ Ø¨Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©.";

                string advice = await GetAIResponseAsync(prompt);
                advice = advice.Replace("âœ¨ ", "").Replace("ðŸ’¡ ", "").Replace("ðŸš€ ", "");
                return Ok(new { data = advice, success = true });
            }
            catch
            {
                return Ok(new { data = "Ù„Ø§ ØªÙˆØ¬Ø¯ Ø¨ÙŠØ§Ù†Ø§Øª ÙƒØ§ÙÙŠØ© Ù„Ù‡Ø°Ø§ Ø§Ù„Ù…ÙˆØ¸Ù Ù„Ø¥Ø¹Ø·Ø§Ø¡ Ù†ØµÙŠØ­Ø© Ø¯Ù‚ÙŠÙ‚Ø©.", success = true });
            }
        }

        // â”€â”€â”€ Secure Chat endpoint â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        [HttpPost("chat")]
        [Authorize]
        public async Task<IActionResult> ChatWithAI([FromBody] ChatRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Message))
                return BadRequest("Ø§Ù„Ø±Ø³Ø§Ù„Ø© ÙØ§Ø±ØºØ©.");

            bool isAdmin = User.IsInRole("Admin") || User.IsInRole("HR");
            string contextData = "";
            string roleConstraints;

            if (isAdmin)
            {
                roleConstraints = "Ø£Ù†Øª ØªØªØ­Ø¯Ø« Ù…Ø¹ Ù…Ø¯ÙŠØ± Ø§Ù„Ù†Ø¸Ø§Ù… Ø£Ùˆ Ù…Ø³Ø¤ÙˆÙ„ Ø§Ù„Ù…ÙˆØ§Ø±Ø¯ Ø§Ù„Ø¨Ø´Ø±ÙŠØ©. ÙŠØ­Ù‚ Ù„Ùƒ Ø§Ù„ÙˆØµÙˆÙ„ Ù„Ø¬Ù…ÙŠØ¹ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ù…Ø±ÙÙ‚Ø© ÙˆØ§Ù„Ø¥Ø¬Ø§Ø¨Ø© Ø¨Ø´ÙƒÙ„ Ø´Ø§Ù…Ù„ ÙˆØ¯Ù‚ÙŠÙ‚.";
                contextData = await BuildAdminContextAsync();
            }
            else
            {
                roleConstraints = "Ø£Ù†Øª ØªØªØ­Ø¯Ø« Ù…Ø¹ Ù…ÙˆØ¸Ù Ø¹Ø§Ø¯ÙŠ. ÙŠÙÙ…Ù†Ø¹ Ø§Ù„Ø¥ÙØµØ§Ø­ Ø¹Ù† Ø¨ÙŠØ§Ù†Ø§Øª Ø£ÙŠ Ù…ÙˆØ¸Ù Ø¢Ø®Ø± Ø£Ùˆ Ø±ÙˆØ§ØªØ¨Ù‡Ù…. Ø£Ø¬Ø¨ ÙÙ‚Ø· Ø¹Ù„Ù‰ Ø£Ø³Ø¦Ù„ØªÙ‡ Ø§Ù„Ø´Ø®ØµÙŠØ© Ø£Ùˆ Ø§Ø´Ø±Ø­ Ù„Ù‡ ÙƒÙŠÙÙŠØ© Ø§Ø³ØªØ®Ø¯Ø§Ù… Ø§Ù„Ù†Ø¸Ø§Ù…. Ø¥Ø°Ø§ Ø·Ù„Ø¨ Ø¨ÙŠØ§Ù†Ø§Øª Ø®Ø§Ø±Ø¬ ØµÙ„Ø§Ø­ÙŠØ§ØªÙ‡ØŒ Ø§Ø¹ØªØ°Ø± Ø¨Ù„Ø¨Ø§Ù‚Ø©.";
                var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (int.TryParse(userIdStr, out int userId))
                {
                    try
                    {
                        var myLeaves = await _leaveService.GetMyLeavesAsync(userId, 1, 100);
                        var totalApproved = myLeaves.Items.Where(l => l.Status == "Approved" && l.LeaveType == "Annual").Sum(l => l.TotalDays);
                        contextData = $"\n[Ø¨ÙŠØ§Ù†Ø§ØªÙƒ Ø§Ù„Ø´Ø®ØµÙŠØ©]:\n- Ø¥Ø¬Ø§Ø²Ø§Øª Ø³Ù†ÙˆÙŠØ© Ù…Ø³ØªÙ‡Ù„ÙƒØ©: {totalApproved} Ø£ÙŠØ§Ù…\n- Ø§Ù„Ø±ØµÙŠØ¯ Ø§Ù„Ù…ØªØ¨Ù‚ÙŠ: {14 - totalApproved} Ø£ÙŠØ§Ù…\n";
                    }
                    catch { }
                }
            }

            string systemPrompt = $@"Ø£Ù†Øª Ù…Ø³Ø§Ø¹Ø¯ Ø°ÙƒÙŠ ÙˆÙ…Ø­ØªØ±Ù Ù…Ø®ØµØµ Ù„Ù†Ø¸Ø§Ù… Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„Ù…ÙˆØ§Ø±Ø¯ Ø§Ù„Ø¨Ø´Ø±ÙŠØ© Kawadir HRMS.
{roleConstraints}
Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ù…ØªÙˆÙØ±Ø©:
{contextData}
Ø§Ù„ØªØ¹Ù„ÙŠÙ…Ø§Øª:
1. Ø£Ø¬Ø¨ Ø¨Ø¥ÙŠØ¬Ø§Ø² Ø´Ø¯ÙŠØ¯ Ø¬Ø¯Ø§Ù‹ ÙˆØ¨Ø´ÙƒÙ„ Ù…Ø¨Ø§Ø´Ø± Ø¹Ù„Ù‰ Ù‚Ø¯Ø± Ø§Ù„Ø³Ø¤Ø§Ù„ (Ø¬Ù…Ù„Ø© Ø£Ùˆ Ø¬Ù…Ù„ØªÙŠÙ† ÙƒØ­Ø¯ Ø£Ù‚ØµÙ‰).
2. Ù„Ø§ ØªÙ‚Ù… Ø¨Ø³Ø±Ø¯ ØªÙØ§ØµÙŠÙ„ Ø£Ùˆ Ø´Ø±ÙˆØ­Ø§Øª Ø¥Ø¶Ø§ÙÙŠØ© Ø¥Ù„Ø§ Ø¥Ø°Ø§ Ø·Ù„Ø¨ Ù…Ù†Ùƒ Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù… Ø°Ù„Ùƒ ØµØ±Ø§Ø­Ø©Ù‹ (Ù„ØªÙˆÙÙŠØ± Ø§Ù„Ø§Ø³ØªÙ‡Ù„Ø§Ùƒ).
3. Ø£Ø¬Ø¨ ÙƒØ£Ù†Ùƒ Ø¬Ø²Ø¡ Ù…Ù† Ø§Ù„Ù†Ø¸Ø§Ù… Ù†ÙØ³Ù‡ ÙˆÙ„ÙŠØ³ ÙƒØ°ÙƒØ§Ø¡ Ø§ØµØ·Ù†Ø§Ø¹ÙŠ Ø®Ø§Ø±Ø¬ÙŠ.
Ø±Ø³Ø§Ù„Ø© Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…: {request.Message}";

            string response = await GetAIResponseAsync(systemPrompt);
            response = response.Replace("âœ¨ ", "").Replace("ðŸ’¡ ", "").Replace("ðŸš€ ", "");
            return Ok(new { data = response, success = true });
        }
    }
}

```

## File: D:\HRMS-Team\HRMS-GradProject\Controllers\AttendanceController.cs


```csharp

using Application.Common;
using Application.DTOs.Attendance;
using Application.Services.Interfaces;
using HRMS_API.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HRMS_GradProject.Controllers
{
    
    [ApiController]
    [Route("api/attendance")]
    [Authorize]
    public class AttendanceController(IAttendanceService attendanceService) : ControllerBase
    {
        // GET /api/attendance → HR · Admin
        [HttpGet]
        [Authorize(Roles = "Admin,HR")]
        public async Task<IActionResult> GetAll(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10)
        {
            var result = await attendanceService.GetAllAsync(pageNumber, pageSize);
            return Ok(ApiResponse<PagedResult<AttendanceDto>>.Ok(result));
        }

        // GET /api/attendance/my → Employee
        [HttpGet("my")]
        public async Task<IActionResult> GetMyAttendance( [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var employeeIdClaim = User.FindFirstValue("employeeId");

            if (string.IsNullOrWhiteSpace(employeeIdClaim) || !int.TryParse(employeeIdClaim, out int employeeId))
            {
                return BadRequest(ApiResponse.Fail("Your account is not linked to an employee profile"));
            }
            var result = await attendanceService.GetMyAttendanceAsync(  employeeId, pageNumber, pageSize);

            return Ok(ApiResponse<PagedResult<AttendanceDto>>.Ok(result));
        }

        // GET /api/attendance/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await attendanceService.GetByIdAsync(id) ?? throw new KeyNotFoundException($"Attendance {id} not found");

            return Ok(ApiResponse<AttendanceDto>.Ok(result));
        }

        // POST /api/attendance/clockin → Employee
        [HttpPost("clockin")]
        [ValidateModel]
        public async Task<IActionResult> ClockIn([FromBody] ClockInDto dto)
        {
            var employeeIdClaim = User.FindFirstValue("employeeId");

            if (string.IsNullOrWhiteSpace(employeeIdClaim) ||
                !int.TryParse(employeeIdClaim, out int employeeId))
                return BadRequest(ApiResponse.Fail(
                    "Your account is not linked to an employee profile"));

            var result = await attendanceService.ClockInAsync(employeeId, dto);
            return CreatedAtAction(nameof(GetById), new { id = result.Id },
                ApiResponse<AttendanceDto>.Ok(result, "Clocked in successfully"));
        }

        [HttpPut("clockout")]
        [ValidateModel]
        public async Task<IActionResult> ClockOut([FromBody] ClockOutDto dto)
        {
            var employeeIdClaim = User.FindFirstValue("employeeId");

            if (string.IsNullOrWhiteSpace(employeeIdClaim) ||
                !int.TryParse(employeeIdClaim, out int employeeId))
                return BadRequest(ApiResponse.Fail(
                    "Your account is not linked to an employee profile"));

            var result = await attendanceService.ClockOutAsync(employeeId, dto);
            return Ok(ApiResponse<AttendanceDto>.Ok(result, "Clocked out successfully"));
        }
    }
}

```

## File: D:\HRMS-Team\HRMS-GradProject\Controllers\AuthController.cs


```csharp

using Application.Common;
using Application.DTOs.Auth;
using Application.DTOs.User;
using Application.Interfaces;
using Application.Services;
using Application.Services.Interfaces;
using Domain.Entities;
using Domain.Interfaces;
using HRMS_API.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace HRMS_API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController(IAuthService authService, IUserService userService, IUnitOfWork uow) : ControllerBase
{
    // POST api/auth/login
    [HttpPost("login")]
    [ValidateModel]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var result = await authService.LoginAsync(dto);

        return result is null
            ? Unauthorized(ApiResponse.Fail("Invalid email or password"))
            : Ok(ApiResponse<AuthResponseDto>.Ok(result, "Login successful"));
    }

    // POST api/auth/register — Admin only
    [HttpPost("register")]
    [Authorize(Roles = "Admin")]
    [ValidateModel]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        var success = await authService.RegisterAsync(dto);

        return success
            ? Ok(ApiResponse.Ok("User registered successfully"))
            : BadRequest(ApiResponse.Fail("Email already exists"));
    }

    // POST api/auth/change-password
    [HttpPost("change-password")]
    [Authorize]
    [ValidateModel]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var success = await authService.ChangePasswordAsync(userId, dto);

        return success
            ? Ok(ApiResponse.Ok("Password changed successfully"))
            : BadRequest(ApiResponse.Fail("Current password is incorrect"));
    }

    // GET api/auth/me
    [HttpGet("me")]
    [Authorize]
    public IActionResult Me()
    {
        var result = new MeDto
        {
            Id = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!),
            Email = User.FindFirstValue(ClaimTypes.Email)!,
            Role = User.FindFirstValue(ClaimTypes.Role)!,
            EmployeeId = User.FindFirstValue("employeeId")
        };

        return Ok(ApiResponse<MeDto>.Ok(result));
    }

    [HttpGet("users")]
    [Authorize(Roles = "Admin,HR")]
    public async Task<IActionResult> GetAllUsers([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
    {
        var result = await userService.GetAllEmployeesAsync(pageNumber, pageSize);
        return Ok(ApiResponse<PagedResult<UserDto>>.Ok(result, "Users retrieved successfully"));
    }

    [HttpGet("unassigned-employees")]
    [Authorize(Roles = "Admin,HR")]
    public async Task<IActionResult> GetUnassignedEmployeeUsers([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
    {
        var result = await userService.GetUnassignedEmployeeUsersAsync(pageNumber, pageSize);
        return Ok(ApiResponse<PagedResult<UserDto>>.Ok(result, "Unassigned Employee Users retrieved successfully"));
    }

    // GET api/auth/get-user-id-by-email/{email}
    [HttpGet("get-user-id-by-email/{email}")]
    [Authorize(Roles = "Admin,HR")]
    public async Task<IActionResult> GetUserIdByEmail(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
            return BadRequest(ApiResponse.Fail("Email is required"));

        var user = await uow.Repository<User>()
                            .GetAllQueryable()
                            .FirstOrDefaultAsync(u => u.Email == email);

        if (user is null)
            return NotFound(ApiResponse.Fail("User not found"));

        return Ok(ApiResponse<int>.Ok(user.Id, "User ID retrieved successfully"));
    }
}

```

## File: D:\HRMS-Team\HRMS-GradProject\Controllers\DepartmentController.cs


```csharp

using Application.Common;
using Application.DTOs.Department;
using Application.Services.Interfaces;
using HRMS_API.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HRMS_API.Controllers;

[ApiController]
[Route("api/departments")]
[Authorize]
public class DepartmentController(IDepartmentService departmentService) : ControllerBase
{
    // GET api/departments
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var departments = await departmentService.GetAllAsync();
        return Ok(ApiResponse<List<DepartmentDto>>.Ok(departments));
    }

    // GET api/departments/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var department = await departmentService.GetByIdAsync(id);

        return department is null
            ? NotFound(ApiResponse.Fail($"Department {id} not found"))
            : Ok(ApiResponse<DepartmentDto>.Ok(department));
    }

    // POST api/departments
    [HttpPost]
    [Authorize(Roles = "Admin")]
    [ValidateModel]
    public async Task<IActionResult> Create([FromBody] CreateDepartmentDto dto)
    {
        var department = await departmentService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = department.Id },
            ApiResponse<DepartmentDto>.Ok(department, "Department created successfully"));
    }

    // PUT api/departments/5
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    [ValidateModel]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateDepartmentDto dto)
    {
        var department = await departmentService.UpdateAsync(id, dto);

        return department is null
            ? NotFound(ApiResponse.Fail($"Department {id} not found"))
            : Ok(ApiResponse<DepartmentDto>.Ok(department, "Department updated successfully"));
    }

    // DELETE api/departments/5
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await departmentService.DeleteAsync(id);

        return !result
            ? NotFound(ApiResponse.Fail($"Department {id} not found"))
            : Ok(ApiResponse.Ok("Department deleted successfully"));
    }
}

```

## File: D:\HRMS-Team\HRMS-GradProject\Controllers\EmployeeController.cs


```csharp

using Application.Common;
using Application.DTOs.Employee;
using Application.Services.Interfaces;
using HRMS_API.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HRMS_API.Controllers;

[ApiController]
[Route("api/employees")]
public class EmployeeController(IEmployeeService employeeService) : ControllerBase
{
    // GET api/employees?pageNumber=1&pageSize=10
    [HttpGet]
    public async Task<IActionResult> GetAll( [FromQuery] int pageNumber = 1,[FromQuery] int pageSize = 10)
    {
        var employees = await employeeService.GetAllAsync(pageNumber, pageSize);

        return Ok(ApiResponse<PagedResult<EmployeeDto>>.Ok(employees));
    }

    // GET api/employees/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var employee = await employeeService.GetByIdAsync(id);


        return employee is null
            ? NotFound(ApiResponse.Fail($"Employee {id} not found"))
            : Ok(ApiResponse<EmployeeDto>.Ok(employee));
    }

    // GET api/employees/5/profile
    [HttpGet("{id}/profile")]
    public async Task<IActionResult> GetProfile(int id)
    {
        var profile = await employeeService.GetProfileAsync(id);



        return profile is null
            ? NotFound(ApiResponse.Fail($"Employee {id} not found"))
            : Ok(ApiResponse<EmployeeProfileDto>.Ok(profile));
    }

    // GET api/employees/me
    [HttpGet("me")]
    [Authorize]
    public async Task<IActionResult> Me()
    {
        var employeeId = User.FindFirstValue("employeeId");

        if (string.IsNullOrEmpty(employeeId))
        {
            return NotFound(ApiResponse.Fail("No employee linked to this account"));
        }

        var employee = await employeeService.GetProfileAsync(int.Parse(employeeId));


        return employee is null
            ? NotFound(ApiResponse.Fail("Employee not found"))
            : Ok(ApiResponse<EmployeeProfileDto>.Ok(employee));
    }

    // POST api/employees
    [HttpPost]
    [ValidateModel]
    public async Task<IActionResult> Create([FromBody] CreateEmployeeDto dto)
    {
        var employee = await employeeService.CreateAsync(dto);


        return CreatedAtAction(nameof(GetById), new { id = employee.Id },
            ApiResponse<EmployeeDto>.Ok(employee, "Employee created successfully"));
    }

    // PUT api/employees/5
    [HttpPut("{id}")]
    [ValidateModel]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateEmployeeDto dto)
    {
        var employee = await employeeService.UpdateAsync(id, dto);


        return employee is null
            ? NotFound(ApiResponse.Fail($"Employee {id} not found"))
            : Ok(ApiResponse<EmployeeDto>.Ok(employee, "Employee updated successfully"));
    }

    // DELETE api/employees/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {

        var result = await employeeService.DeleteAsync(id);


        return !result
            ? NotFound(ApiResponse.Fail($"Employee {id} not found"))
            : Ok(ApiResponse.Ok("Employee deleted successfully"));
    }
}



//repository pattern 
// Generic repository => CRUD operations for all entities  => Clean Artitecture 
// Auto Mapper => DTOs => Data Transfer Objects => Avoid exposing internal data structures => Security and flexibility



```

## File: D:\HRMS-Team\HRMS-GradProject\Controllers\LeaveController.cs


```csharp

using Application.Common;
using Application.DTOs.Leave;
using Application.Services.Interfaces;
using HRMS_API.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HRMS_GradProject.Controllers
{
    [ApiController]
    [Route("api/leaves")]
    [Authorize]
    public class LeaveController(ILeaveService leaveService) : ControllerBase
    {
        // GET /api/leaves?pageNumber=1&pageSize=10 
        [HttpGet]
        [Authorize(Roles = "Admin,HR")]
        public async Task<IActionResult> GetAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var result = await leaveService.GetAllAsync(pageNumber, pageSize);
            return Ok(ApiResponse<PagedResult<LeaveDto>>.Ok(result));
        }

        // GET /api/leaves/my     Employee
        [HttpGet("my")]
        public async Task<IActionResult> GetMyLeaves([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            // âœ… Bug #9 Fix: Ø­Ù…Ø§ÙŠØ© Ù…Ù† NullReferenceException Ù„Ùˆ Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù… Ù„ÙŠØ³ Ù…ÙˆØ¸ÙØ§Ù‹
            var employeeIdClaim = User.FindFirstValue("employeeId");
            if (string.IsNullOrWhiteSpace(employeeIdClaim) ||
                !int.TryParse(employeeIdClaim, out int employeeId))
            {
                return BadRequest(ApiResponse.Fail("Your account is not linked to an employee profile"));
            }
            var result = await leaveService.GetMyLeavesAsync(employeeId, pageNumber, pageSize);
            return Ok(ApiResponse<PagedResult<LeaveDto>>.Ok(result));
        }

        // GET /api/leaves/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await leaveService.GetByIdAsync(id)
                         ?? throw new KeyNotFoundException($"Leave {id} not found");
            return Ok(ApiResponse<LeaveDto>.Ok(result));
        }

        // POST /api/leaves â†’ Employee
        [HttpPost]
        [ValidateModel]
        public async Task<IActionResult> Create([FromBody] CreateLeaveDto dto)
        {
            var employeeIdClaim = User.FindFirstValue("employeeId");

            if (string.IsNullOrWhiteSpace(employeeIdClaim) ||
                !int.TryParse(employeeIdClaim, out int employeeId))
            {
                return BadRequest(ApiResponse.Fail(
                    "Your account is not linked to an employee profile"));
            }

            var result = await leaveService.CreateAsync(employeeId, dto);
            return CreatedAtAction(nameof(GetById), new { id = result.Id },
                ApiResponse<LeaveDto>.Ok(result, "Leave request submitted successfully"));
        }

        // PUT /api/leaves/{id}/status â†’ HR Â· Admin
        [HttpPut("{id}/status")]
        [Authorize(Roles = "Admin,HR")]
        [ValidateModel]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateLeaveStatusDto dto)
        {
            var reviewerUserId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var result = await leaveService.UpdateStatusAsync(id, reviewerUserId, dto);
            return Ok(ApiResponse<LeaveDto>.Ok(result, "Leave status updated successfully"));
        }

        // DELETE /api/leaves/{id} â†’ Employee (Pending only)
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            // âœ… Bug #9 Fix: Ø­Ù…Ø§ÙŠØ© Ù…Ù† NullReferenceException
            var employeeIdClaim = User.FindFirstValue("employeeId");
            if (string.IsNullOrWhiteSpace(employeeIdClaim) ||
                !int.TryParse(employeeIdClaim, out int employeeId))
            {
                return BadRequest(ApiResponse.Fail("Your account is not linked to an employee profile"));
            }
            await leaveService.DeleteAsync(id, employeeId);
            return Ok(ApiResponse.Ok("Leave request deleted successfully"));
        }
    }
}

```

## File: D:\HRMS-Team\HRMS-GradProject\Controllers\NotificationController.cs


```csharp

using Application.Common;
using Application.DTOs.Notification;
using Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HRMS_GradProject.Controllers
{
    // HRMS_API/Controllers/NotificationController.cs
    [ApiController]
    [Route("api/notifications")]
    [Authorize]
    public class NotificationController(
        INotificationService notificationService) : ControllerBase
    {
        private int GetUserId() =>
            int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        // GET /api/notifications
        [HttpGet]
        public async Task<IActionResult> GetMy()
        {
            var result = await notificationService
                             .GetMyNotificationsAsync(GetUserId());
            return Ok(ApiResponse<List<NotificationDto>>.Ok(result));
        }

        // GET /api/notifications/unread-count
        [HttpGet("unread-count")]
        public async Task<IActionResult> GetUnreadCount()
        {
            var count = await notificationService.GetUnreadCountAsync(GetUserId());
            return Ok(ApiResponse<int>.Ok(count));
        }

        // PUT /api/notifications/{id}/read
        [HttpPut("{id}/read")]
        public async Task<IActionResult> MarkAsRead(int id)
        {
            await notificationService.MarkAsReadAsync(id, GetUserId());
            return Ok(ApiResponse.Ok("Notification marked as read"));
        }

        // PUT /api/notifications/read-all
        [HttpPut("read-all")]
        public async Task<IActionResult> MarkAllAsRead()
        {
            await notificationService.MarkAllAsReadAsync(GetUserId());
            return Ok(ApiResponse.Ok("All notifications marked as read"));
        }

        // DELETE /api/notifications/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await notificationService.DeleteAsync(id, GetUserId());
            return Ok(ApiResponse.Ok("Notification deleted"));
        }
    }
}

```

## File: D:\HRMS-Team\HRMS-GradProject\Controllers\PositionController.cs


```csharp

using Application.Common;
using Application.DTOs.Position;
using Application.Services.Interfaces;
using HRMS_API.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HRMS_API.Controllers;

[ApiController]
[Route("api/positions")]
[Authorize]
public class PositionController(IPositionService positionService) : ControllerBase
{
    // GET api/positions
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var positions = await positionService.GetAllAsync();

        return Ok(ApiResponse<List<PositionDto>>.Ok(positions));
    }

    // GET api/positions/department/2
    [HttpGet("department/{departmentId}")]
    public async Task<IActionResult> GetByDepartment(int departmentId)
    {
        var positions = await positionService.GetByDepartmentAsync(departmentId);

        return Ok(ApiResponse<List<PositionDto>>.Ok(positions));
    }

    // GET api/positions/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var position = await positionService.GetByIdAsync(id);

        return position is null
            ? NotFound(ApiResponse.Fail($"Position {id} not found"))
            : Ok(ApiResponse<PositionDto>.Ok(position));
    }

    // POST api/positions
    [HttpPost]
    [Authorize(Roles = "Admin")]
    [ValidateModel]
    public async Task<IActionResult> Create([FromBody] CreatePositionDto dto)
    {
        var position = await positionService.CreateAsync(dto);

        return CreatedAtAction(nameof(GetById), new { id = position.Id },
            ApiResponse<PositionDto>.Ok(position, "Position created successfully"));
    }

    // PUT api/positions/5
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    [ValidateModel]
    public async Task<IActionResult> Update(int id, [FromBody] UpdatePositionDto dto)
    {
        var position = await positionService.UpdateAsync(id, dto);

        return position is null
            ? NotFound(ApiResponse.Fail($"Position {id} not found"))
            : Ok(ApiResponse<PositionDto>.Ok(position, "Position updated successfully"));
    }

    // DELETE api/positions/5
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await positionService.DeleteAsync(id);

        return !result
            ? NotFound(ApiResponse.Fail($"Position {id} not found"))
            : Ok(ApiResponse.Ok("Position deleted successfully"));
    }
}

```

## File: D:\HRMS-Team\HRMS-GradProject\Controllers\SalaryController.cs


```csharp

using Application.Common;
using Application.DTOs.Salary;
using Application.Services.Interfaces;
using HRMS_API.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HRMS_GradProject.Controllers
{
    // HRMS_API/Controllers/SalaryController.cs
    [ApiController]
    [Route("api/salaries")]
    [Authorize]
    public class SalaryController(ISalaryService salaryService) : ControllerBase
    {
        // GET /api/salaries → Admin · HR
        [HttpGet]
        [Authorize(Roles = "Admin,HR")]
        public async Task<IActionResult> GetAll(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10)
        {
            var result = await salaryService.GetAllAsync(pageNumber, pageSize);
            return Ok(ApiResponse<PagedResult<SalaryDto>>.Ok(result));
        }

        // GET /api/salaries/my → Employee
        [HttpGet("my")]
        public async Task<IActionResult> GetMy(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10)
        {
            var employeeIdClaim = User.FindFirstValue("employeeId");

            if (string.IsNullOrWhiteSpace(employeeIdClaim) ||
                !int.TryParse(employeeIdClaim, out int employeeId))
                return BadRequest(ApiResponse.Fail(
                    "Your account is not linked to an employee profile"));

            var result = await salaryService.GetMyAsync(employeeId, pageNumber, pageSize);
            return Ok(ApiResponse<PagedResult<SalaryDto>>.Ok(result));
        }

        // GET /api/salaries/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await salaryService.GetByIdAsync(id)
                         ?? throw new KeyNotFoundException($"Salary {id} not found");

            return Ok(ApiResponse<SalaryDto>.Ok(result));
        }

        // POST /api/salaries → Admin
        [HttpPost]
        [Authorize(Roles = "Admin")]
        [ValidateModel]
        public async Task<IActionResult> Create([FromBody] CreateSalaryDto dto)
        {
            var result = await salaryService.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = result.Id },
                ApiResponse<SalaryDto>.Ok(result, "Salary created successfully"));
        }

        // PUT /api/salaries/{id} → Admin
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        [ValidateModel]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateSalaryDto dto)
        {
            var result = await salaryService.UpdateAsync(id, dto);
            return Ok(ApiResponse<SalaryDto>.Ok(result, "Salary updated successfully"));
        }

        // DELETE /api/salaries/{id} → Admin
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            await salaryService.DeleteAsync(id);
            return Ok(ApiResponse.Ok("Salary deleted successfully"));
        }
    }
}

```

## File: D:\HRMS-Team\HRMS-GradProject\Filters\ValidateModelAttribute.cs


```csharp

using Application.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace HRMS_API.Filters;

public class ValidateModelAttribute : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        if (!context.ModelState.IsValid)
        {
            var errors = context.ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();

            context.Result = new BadRequestObjectResult(
                ApiResponse.Fail("Validation failed", errors));
        }
    }
}

```

## File: D:\HRMS-Team\HRMS-GradProject\Middleware\ExceptionHandlingMiddleware.cs


```csharp

using System.Net;
using System.Text.Json;
using Application.Common;

namespace HRMS_API.Middleware;

public class ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Unhandled exception: {Message}", ex.Message);
            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception ex)
    {
        context.Response.ContentType = "application/json";

        var (statusCode, message) = ex switch
        {
            KeyNotFoundException => (HttpStatusCode.NotFound, ex.Message),
            UnauthorizedAccessException => (HttpStatusCode.Unauthorized, ex.Message),
            ArgumentException => (HttpStatusCode.BadRequest, ex.Message),
            InvalidOperationException => (HttpStatusCode.BadRequest, ex.Message),
            _  => (HttpStatusCode.InternalServerError, ex.InnerException?.Message ?? ex.Message)
        };

        context.Response.StatusCode = (int) statusCode;

        var response = ApiResponse.Fail(message);
        var json = JsonSerializer.Serialize(response, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        });

        return context.Response.WriteAsync(json);
    }
}

```
