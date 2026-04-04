using HRMS_GradProject.Entity;
using Microsoft.EntityFrameworkCore;

namespace HRMS_GradProject.AppContext
{
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions<DBContext> options  ) : base(options)
        {

        }


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







        }





    }
}
