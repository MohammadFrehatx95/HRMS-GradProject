

using Domain.Interfaces;


namespace Infrastructure.Data.Repositories
{
    public  class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext context;



        public IEmployeeRepository Employees { get; }
        //public ILeaveRepository Leaves { get; }
        //public IAttendanceRepository Attendances { get; }
        //public ISalaryRepository Salaries { get; }

        public UnitOfWork(AppDbContext context,
            IEmployeeRepository Employees
            //ILeaveRepository leaves,
            //IAttendanceRepository attendances,
            //ISalaryRepository salaries)
        )
        {
            this.context = context;
            this.Employees = Employees;
            //Leaves = leaves;
            //Attendances = attendances;
            //Salaries = salaries;
        }

      
        public async Task<int> SaveChangesAsync()
        {
            return await context.SaveChangesAsync();
        }

        public void Dispose()
        {
            context.Dispose();
        }
    }
}



