using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class SeedDefaultLeaveBalances : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("UPDATE \"Employees\" SET \"AnnualLeaveBalance\" = 14 WHERE \"AnnualLeaveBalance\" = 0;");
            migrationBuilder.Sql("UPDATE \"Employees\" SET \"SickLeaveBalance\" = 14 WHERE \"SickLeaveBalance\" = 0;");
            migrationBuilder.Sql("UPDATE \"Employees\" SET \"EmergencyLeaveBalance\" = 3 WHERE \"EmergencyLeaveBalance\" = 0;");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
