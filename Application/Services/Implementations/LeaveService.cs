using Application.Common;
using Application.DTOs.Leave;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Enums;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace Application.Services.Implementations
{
    // Application/Services/Implementations/LeaveService.cs
    public class LeaveService(IUnitOfWork uow, IMapper mapper) : ILeaveService
    {
        public async Task<PagedResult<LeaveDto>> GetAllAsync(int pageNumber, int pageSize)
        {
            var query = uow.Repository<Leave>()
                           .GetAllQueryable()
                           .Include(l => l.Employee)
                           .OrderByDescending(l => l.RequestedAt);

            var total = await query.CountAsync();
            var items = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

            return PagedResult<LeaveDto>.Create(
                mapper.Map<List<LeaveDto>>(items), total, pageNumber, pageSize);
        }

        public async Task<PagedResult<LeaveDto>> GetMyLeavesAsync(int employeeId, int pageNumber, int pageSize)
        {
            var query = uow.Repository<Leave>()
                           .GetAllQueryable()
                           .Include(l => l.Employee)
                           .Where(l => l.EmployeeId == employeeId)
                           .OrderByDescending(l => l.RequestedAt);

            var total = await query.CountAsync();
            var items = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

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
            // Validate dates
            if (dto.StartDate.Date < DateTime.UtcNow.Date)
                throw new ArgumentException("Start date cannot be in the past");

            if (dto.EndDate.Date < dto.StartDate.Date)
                throw new ArgumentException("End date cannot be before start date");

            // Check for overlapping leaves
            var hasOverlap = await uow.Repository<Leave>()
                                      .GetAllQueryable()
                                      .AnyAsync(l =>
                                          l.EmployeeId == employeeId &&
                                          l.Status != LeaveStatus.Rejected &&
                                          l.StartDate.Date <= dto.EndDate.Date &&
                                          l.EndDate.Date >= dto.StartDate.Date);

            if (hasOverlap)
                throw new InvalidOperationException("You already have a leave request overlapping these dates");

            var leave = new Leave
            {
                EmployeeId = employeeId,
                LeaveType = dto.LeaveType,
                StartDate = dto.StartDate.Date,
                EndDate = dto.EndDate.Date,
                TotalDays = (int)(dto.EndDate.Date - dto.StartDate.Date).TotalDays + 1,
                Reason = dto.Reason,
                Status = LeaveStatus.Pending,
                RequestedAt = DateTime.UtcNow
            };

            await uow.Repository<Leave>().AddAsync(leave);
            await uow.SaveChangesAsync();

            // Reload with Employee for mapping
            return (await GetByIdAsync(leave.Id))!;
        }

        public async Task<LeaveDto> UpdateStatusAsync(int leaveId, int reviewerUserId, UpdateLeaveStatusDto dto)
        {
            var leave = await uow.Repository<Leave>()
                                 .GetAllQueryable()
                                 .Include(l => l.Employee)
                                 .FirstOrDefaultAsync(l => l.Id == leaveId)
                       ?? throw new KeyNotFoundException($"Leave {leaveId} not found");

            if (leave.Status != LeaveStatus.Pending)
                throw new InvalidOperationException("Only Pending leave requests can be reviewed");

            if (dto.Status == LeaveStatus.Rejected && string.IsNullOrWhiteSpace(dto.RejectionReason))
                throw new ArgumentException("Rejection reason is required when rejecting a leave");

            leave.Status = dto.Status;
            leave.ReviewedByUserId = reviewerUserId;
            leave.ReviewedAt = DateTime.UtcNow;
            leave.RejectionReason = dto.Status == LeaveStatus.Rejected ? dto.RejectionReason : null;

            uow.Repository<Leave>().Update(leave);
            await uow.SaveChangesAsync();

            return mapper.Map<LeaveDto>(leave);
        }

        public async Task DeleteAsync(int leaveId, int employeeId)
        {
            var leave = await uow.Repository<Leave>()
                                 .GetAllQueryable()
                                 .FirstOrDefaultAsync(l => l.Id == leaveId)
                       ?? throw new KeyNotFoundException($"Leave {leaveId} not found");

            if (leave.EmployeeId != employeeId)
                throw new UnauthorizedAccessException("You can only delete your own leave requests");

            if (leave.Status != LeaveStatus.Pending)
                throw new InvalidOperationException("Only Pending leave requests can be deleted");

            uow.Repository<Leave>().Delete(leave);
            await uow.SaveChangesAsync();
        }
    }
}
