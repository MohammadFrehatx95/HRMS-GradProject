using Domain.Entities;

namespace Domain.Interfaces;

public interface IEmployeeRepository : IGenericRepository<Employee>
{
    Task<IEnumerable<Employee>> GetByDepartmentAsync(int departmentId);
    Task<bool> IsEmailUniqueAsync(string email);
}