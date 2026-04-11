using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IEmployeeRepository Employees { get; }
        //ILeaveRepository Leaves { get; }
        //IAttendanceRepository Attendances { get; }
        //ISalaryRepository Salaries { get; }
        Task<int> SaveChangesAsync();
    }
}
