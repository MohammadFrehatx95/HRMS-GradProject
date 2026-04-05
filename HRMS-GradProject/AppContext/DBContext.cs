using HRMS_GradProject.Entity;
using Microsoft.EntityFrameworkCore;

namespace HRMS_GradProject.AppContext
{
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions<DBContext> options  ) : base(options)
        {

        }
       
        DbSet<Position> Positions { get; set; }

        DbSet<LeaveRequest> LeaveRequests { get; set; }

        DbSet<Attendance> Attendances { get; set; }
        DbSet<Salary> Salaries { get; set; }

        DbSet<Employee> Employees { get; set; }

        DbSet<Department> Departments { get; set; }

        DbSet<User> Users { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Employee>()
                .HasOne(e => e.Department)
                .WithMany(d => d.Employees)
                .HasForeignKey(e => e.DepartmentId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<User>()
                .HasOne(u=>u.Employee)
                .WithOne(e=>e.User)
                .HasForeignKey<Employee>(e => e.userId)

                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Employee>()
               .HasOne(u => u.User)
               .WithOne(e => e.Employee)
               .HasForeignKey<User>(u => u.EmployeeId)
               .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Position>()
               .HasOne(p => p.Department)
               .WithMany(e => e.Positions)
               .HasForeignKey(e => e.DepartmentId)
               .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<LeaveRequest>()
               .HasOne(l => l.employee)
               .WithMany(e => e.leaveRequests)
               .HasForeignKey(e =>e.employeeId)
               .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<LeaveRequest>()
               .HasOne(l => l.user)
               .WithMany(u => u.LeaveRequests)
               .HasForeignKey(e => e.approved_by)
               .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Attendance>()
               .HasOne(a => a.employee)
               .WithMany(e => e.Attendances)
               .HasForeignKey(e => e.employeeId)
               .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Salary>()
               .HasOne(s => s.employee)
               .WithMany(e => e.Salaries)
               .HasForeignKey(e => e.employeeId)
               .OnDelete(DeleteBehavior.Restrict);

            






        }





    }
}
