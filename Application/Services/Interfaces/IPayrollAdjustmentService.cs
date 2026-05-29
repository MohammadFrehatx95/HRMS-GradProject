using Application.Common;
using Application.DTOs.PayrollAdjustment;

namespace Application.Services.Interfaces;

public interface IPayrollAdjustmentService
{
    Task<PagedResult<PayrollAdjustmentDto>> GetAllAsync(int pageNumber = 1, int pageSize = 10, int? month = null, int? year = null);
    Task<PagedResult<PayrollAdjustmentDto>> GetByEmployeeIdAsync(int employeeId, int pageNumber = 1, int pageSize = 10, int? month = null, int? year = null);
    Task<bool> AddAdjustmentAsync(CreatePayrollAdjustmentDto dto);
    Task<int> CreateBulkAsync(CreateBulkPayrollAdjustmentDto dto);
    Task<bool> DeleteAdjustmentAsync(int id);
}
