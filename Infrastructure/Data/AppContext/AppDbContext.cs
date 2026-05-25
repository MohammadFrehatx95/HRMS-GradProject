using Domain.Entities;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;


namespace Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) 
    {
    
    }

    public DbSet<Employee> Employees { get; set; }
    public DbSet<Department> Departments { get; set; }
    public DbSet<Position> Positions { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Leave> Leaves => Set<Leave>();
    public DbSet<Attendance> Attendances { get; set; } 
    public DbSet<Salary> Salaries { get; set; }
    public DbSet<PayrollAdjustment> PayrollAdjustments { get; set; }
    
    public DbSet<Notification> Notifications => Set<Notification>();
    public DbSet<Meeting> Meetings { get; set; }
    public DbSet<Announcement> Announcements { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Announcement>()
            .HasOne(a => a.Author)
            .WithMany()
            .HasForeignKey(a => a.AuthorId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Employee>()
            .HasOne(e => e.Department)
            .WithMany(d => d.Employees)
            .HasForeignKey(e => e.DepartmentId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Employee>()
            .HasOne(e => e.User)
            .WithOne(u => u.Employee)
            .HasForeignKey<Employee>(e => e.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        //modelBuilder.Entity<Employee>()
        //   .HasOne(e => e.User)
        //   .WithOne(u => u.Employee)
        //   .HasForeignKey<Employee>(e => e.Email)
        //   .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Employee>()
             .Property(e => e.Id)
             .ValueGeneratedNever();


        modelBuilder.Entity<Position>()
            .HasOne(p => p.Department)
            .WithMany(d => d.Positions)
            .HasForeignKey(p => p.DepartmentId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Leave>()
            .HasOne(l => l.Employee)
            .WithMany(e => e.LeaveRequests)
            .HasForeignKey(l => l.EmployeeId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Leave>()
            .HasOne(l => l.ReviewedBy)
            .WithMany()
            .HasForeignKey(l => l.ReviewedById)
            .OnDelete(DeleteBehavior.NoAction);




        modelBuilder.Entity<Attendance>()
            .HasOne(a => a.Employee)
            .WithMany(e => e.Attendances)
            .HasForeignKey(a => a.EmployeeId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Salary>()
            .HasOne(s => s.Employee)
            .WithMany(e => e.Salaries)
            .HasForeignKey(s => s.EmployeeId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Notification>()
            .HasOne(n => n.User)
            .WithMany(u => u.Notifications)
            .HasForeignKey(n => n.UserId)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<Meeting>()
    .HasOne(m => m.Employee)
    .WithMany()
    .HasForeignKey(m => m.EmployeeId)
    .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Meeting>()
     .HasOne(m => m.Organizer)
     .WithMany()
     .HasForeignKey(m => m.OrganizerId)
     .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<Leave>()
            .Property(l => l.RejectionReason)
            .IsRequired(false)  
            .HasMaxLength(500);

        modelBuilder.Entity<User>()
        .HasIndex(u => u.Email)
        .IsUnique();

        modelBuilder.Entity<User>()
          .Property(u => u.Role)
          .HasConversion<string>();

        modelBuilder.Entity<User>()
         .ToTable(t => t.HasCheckConstraint("CK_User_Role", "\"Role\" IN ('Admin', 'HR', 'Employee')"));

        modelBuilder.Entity<Salary>()
          .HasIndex(s => new { s.EmployeeId, s.Month, s.Year })
          .IsUnique()
          .HasDatabaseName("IX_Salaries_Employee_Month_Year_Unique");


        modelBuilder.Entity<Department>().HasData(
           new Department { Id = 1, Name = "HR" },
           new Department { Id = 2, Name = "IT" },
           new Department { Id = 3, Name = "Finance" },
           new Department { Id = 4, Name = "Operations" });

        modelBuilder.Entity<Position>().HasData(
    new Position { Id = 1, Title = "HR Manager", DepartmentId = 1 },
    new Position { Id = 2, Title = "HR Specialist", DepartmentId = 1 },
    new Position { Id = 3, Title = "Software Engineer", DepartmentId = 2 },
    new Position { Id = 4, Title = "IT Manager", DepartmentId = 2 },
    new Position { Id = 5, Title = "Accountant", DepartmentId = 3 },
    new Position { Id = 6, Title = "Finance Manager", DepartmentId = 3 },
    new Position { Id = 7, Title = "Operations Manager", DepartmentId = 4 }
);


    }
}