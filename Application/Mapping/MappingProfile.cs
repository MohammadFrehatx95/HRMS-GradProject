// Aother : Abedalqader Alfaqeeh
// last Edit : 2026-04-12
// </sammer> the MappingProfile class defines how to map between domain entities and data transfer objects (DTOs) using AutoMapper.
// It includes mappings for the Employee entity, allowing for both retrieval (mapping to EmployeeDto) and creation/update (mapping from CreateEmployeeDto and UpdateEmployeeDto).
// The update mapping is configured to ignore null values, enabling partial updates without overwriting existing data with nulls.

using Application.DTOs.Attendance;
using Application.DTOs.Department;
using Application.DTOs.Employee;
using Application.DTOs.Leave;
using Application.DTOs.Meeting;
using Application.DTOs.Notification;
using Application.DTOs.Position;
using Application.DTOs.Salary;
using Application.DTOs.User;
using AutoMapper;
using Domain.Entities;
using Domain.Enums;

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
            // ✅ W1/I4 Fix: map PositionId وPositionTitle وUserId
            .ForMember(dest => dest.PositionId,
                opt => opt.MapFrom(src => src.PositionId))
            .ForMember(dest => dest.PositionTitle,
                opt => opt.MapFrom(src => src.Position != null ? src.Position.Title : string.Empty))
            .ForMember(dest => dest.UserId,
                opt => opt.MapFrom(src => src.UserId))
            .ForMember(dest => dest.ProfilePictureUrl,
                opt => opt.MapFrom(src => src.User != null ? src.User.ProfilePictureUrl : null));


        // For creation, we want to map from CreateEmployeeDto to Employee
        CreateMap<CreateEmployeeDto, Employee>();

        // For update, we want to ignore null values to allow partial updates
        CreateMap<UpdateEmployeeDto, Employee>()
            .ForAllMembers(opt => opt.Condition(
                (src, dest, srcMember) => srcMember != null));  // Ignore null values during update

        CreateMap<Employee, EmployeeProfileDto>()
            .ForMember(d => d.FullName, o => o.MapFrom(s => $"{s.FirstName} {s.LastName}"))
            .ForMember(d => d.Phone, o => o.MapFrom(s => s.PhoneNumber))  // ✅ PhoneNumber → Phone
            .ForMember(dest => dest.DepartmentName,
                    opt => opt.MapFrom(src => src.Department != null ? src.Department.Name : string.Empty))
          .ForMember(d => d.PositionTitle, o => o.MapFrom(s => s.Position != null ? s.Position.Title : string.Empty))
          .ForMember(d => d.ProfilePictureUrl, o => o.MapFrom(s => s.User != null ? s.User.ProfilePictureUrl : null));

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
            .ForMember(d => d.EmployeeProfilePictureUrl,
                o => o.MapFrom(s => s.Employee != null && s.Employee.User != null ? s.Employee.User.ProfilePictureUrl : null))
            .ForMember(d => d.LeaveType, o => o.MapFrom(s => s.LeaveType.ToString()))
            .ForMember(d => d.Status, o => o.MapFrom(s => s.Status.ToString()))
            .ForMember(d => d.Reason, o => o.MapFrom(s => s.Reason))
            .ForMember(d => d.RejectionReason, o => o.MapFrom(s => s.RejectionReason))
            .ForMember(d => d.ReviewedById, o => o.MapFrom(s => s.ReviewedById))
            .ForMember(d => d.ReviewedAt, o => o.MapFrom(s => s.ReviewedAt));

       
        CreateMap<Meeting, MeetingDto>()
            .ForMember(d => d.Status,
                o => o.MapFrom(s => s.Status.ToString()))
            .ForMember(d => d.OrganizerName,
                o => o.MapFrom(s => s.Organizer != null
                    ? s.Organizer.Username : string.Empty))
            .ForMember(d => d.EmployeeName,
                o => o.MapFrom(s => s.Employee != null
                    ? $"{s.Employee.FirstName} {s.Employee.LastName}"
                    : string.Empty))
            .ForMember(d => d.EmployeeProfilePictureUrl,
                o => o.MapFrom(s => s.Employee != null && s.Employee.User != null ? s.Employee.User.ProfilePictureUrl : null));







        CreateMap<Attendance, AttendanceDto>()
            .ForMember(d => d.EmployeeName,
                o => o.MapFrom(s => s.Employee != null
                    ? $"{s.Employee.FirstName} {s.Employee.LastName}"
                    : string.Empty))
            .ForMember(d => d.EmployeeProfilePictureUrl,
                o => o.MapFrom(s => s.Employee != null && s.Employee.User != null ? s.Employee.User.ProfilePictureUrl : null))
            
            .ForMember(d => d.TotalHours,
                o => o.MapFrom(s => s.ClockOut.HasValue
                    ? FormatHours(s.ClockIn, s.ClockOut.Value)
                    : string.Empty));


        CreateMap<Salary, SalaryDto>()
            .ForMember(d => d.EmployeeName,
                o => o.MapFrom(s => s.Employee != null
                    ? $"{s.Employee.FirstName} {s.Employee.LastName}"
                    : string.Empty))
            .ForMember(d => d.EmployeeProfilePictureUrl,
                o => o.MapFrom(s => s.Employee != null && s.Employee.User != null ? s.Employee.User.ProfilePictureUrl : null))
            .ForMember(d => d.Status, o => o.MapFrom(s => s.Status.ToString()));

       
        CreateMap<Notification, NotificationDto>()
            .ForMember(d => d.Type,
                o => o.MapFrom(s => s.Type.ToString()));

        CreateMap<User, UserDto>()
    .ForMember(d => d.EmployeeName,
        o => o.MapFrom(s => s.Employee != null
            ? $"{s.Employee.FirstName} {s.Employee.LastName}"
            : null));
        CreateMap<LeaveSetting, LeaveSettingDto>();
        CreateMap<UpdateLeaveSettingDto, LeaveSetting>();
        
        // Company Events
        CreateMap<CompanyEvent, Application.DTOs.CompanyEvent.CompanyEventDto>()
            .ForMember(d => d.EmployeeName, 
                o => o.MapFrom(s => s.Employee != null ? $"{s.Employee.FirstName} {s.Employee.LastName}" : string.Empty));
        CreateMap<Application.DTOs.CompanyEvent.CreateCompanyEventDto, CompanyEvent>();
    }

// Helper method في نفس الـ MappingProfile
private static string FormatHours(TimeOnly clockIn, TimeOnly clockOut)
    {
        var duration = clockOut.ToTimeSpan() - clockIn.ToTimeSpan();
        return $"{(int)duration.TotalHours}h {duration.Minutes}m";
    }





}
