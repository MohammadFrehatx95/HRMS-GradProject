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
        Task<PagedResult<SalaryDto>> GetAllAsync(int pageNumber, int pageSize, int? month = null, int? year = null, string? searchQuery = null);
        Task<PagedResult<SalaryDto>> GetMyAsync(int employeeId, int pageNumber, int pageSize, int? month = null, int? year = null, string? searchQuery = null);
        Task<SalaryDto?> GetByIdAsync(int id);
        Task<SalaryDto> CreateAsync(CreateSalaryDto dto);
        Task<SalaryDto> UpdateAsync(int id, UpdateSalaryDto dto);
        Task DeleteAsync(int id);
        Task<PayrollPreviewResultDto> PreviewBatchAsync(GeneratePayrollDto dto);
        Task<int> GenerateBatchAsync(GeneratePayrollDto dto);
        Task<int> MarkAsPaidAsync(int month, int year);
    }
}
