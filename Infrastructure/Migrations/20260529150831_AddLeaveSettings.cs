using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddLeaveSettings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LeaveSettings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ResetMonth = table.Column<int>(type: "integer", nullable: false),
                    ResetDay = table.Column<int>(type: "integer", nullable: false),
                    DefaultAnnualLeave = table.Column<int>(type: "integer", nullable: false),
                    DefaultSickLeave = table.Column<int>(type: "integer", nullable: false),
                    DefaultEmergencyLeave = table.Column<int>(type: "integer", nullable: false),
                    LastResetDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LeaveSettings", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "LeaveSettings",
                columns: new[] { "Id", "DefaultAnnualLeave", "DefaultEmergencyLeave", "DefaultSickLeave", "LastResetDate", "ResetDay", "ResetMonth" },
                values: new object[] { 1, 14, 3, 14, null, 1, 1 });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LeaveSettings");
        }
    }
}
