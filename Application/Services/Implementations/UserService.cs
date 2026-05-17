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
            // اجلب جميع اليوزرز (سواء لهم موظف أو لا)
            var query = uow.Repository<User>()
                           .GetAllQueryable()
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
                           .Where(u => u.Employee == null)  // Users بدون ربط
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

