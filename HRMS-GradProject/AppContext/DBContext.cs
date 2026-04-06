using HRMS_GradProject.Entity;
using Microsoft.EntityFrameworkCore;

namespace HRMS_GradProject.AppContext
{
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions<DBContext> options  ) : base(options)
        {

        }
       
        public DbSet<Position> Positions { get; set; }
        public DbSet<LeaveRequest> LeaveRequests { get; set; }
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<Salary> Salaries { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<User> Users { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


           
            // Employee-Department relationship (One to Many)
            modelBuilder.Entity<Employee>()
                .HasOne(e => e.Department)
                .WithMany(d => d.Employees)
                .HasForeignKey(e => e.DepartmentId)
                .OnDelete(DeleteBehavior.Restrict);

            // Employee-User relationship (One to One)
            modelBuilder.Entity<Employee>()
                .HasOne(e => e.User)
                .WithOne(u => u.Employee)
                .HasForeignKey<Employee>(e => e.userId)
                .OnDelete(DeleteBehavior.Restrict);



            // Position-Department relationship (One to Many)
            modelBuilder.Entity<Position>()
               .HasOne(p => p.Department)
               .WithMany(e => e.Positions)
               .HasForeignKey(e => e.DepartmentId)
               .OnDelete(DeleteBehavior.Restrict);

            // LeaveRequest-Employee relationship (Many to One)
            modelBuilder.Entity<LeaveRequest>()
               .HasOne(l => l.employee)
               .WithMany(e => e.leaveRequests)
               .HasForeignKey(e => e.employeeId)
               .OnDelete(DeleteBehavior.Restrict);

            // LeaveRequest-User relationship (Many to One for approver)
            modelBuilder.Entity<LeaveRequest>()
                .HasOne(l => l.user)
                .WithMany(u => u.LeaveRequests)
                .HasForeignKey(l => l.approved_by)
                .OnDelete(DeleteBehavior.Restrict);

            // Attendance-Employee relationship (Many to One)
            modelBuilder.Entity<Attendance>()
               .HasOne(a => a.employee)
               .WithMany(e => e.Attendances)
               .HasForeignKey(e => e.employeeId)
               .OnDelete(DeleteBehavior.Restrict);

            // Salary-Employee relationship (Many to One)
            modelBuilder.Entity<Salary>()
               .HasOne(s => s.employee)
               .WithMany(e => e.Salaries)
               .HasForeignKey(e => e.employeeId)
               .OnDelete(DeleteBehavior.Restrict);


            modelBuilder.Entity<User>()
                .HasData(
                    new User
                    {
                        Id = 1,
                        Username = "Abood",
                        Email = "Admin123@Gmail.com",
                        PasswordHash = "Admin123",
                        Role = "Admin"
                      
                    });

         











        }
    }
}
