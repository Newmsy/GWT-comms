using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hybrid.Working.Infrastructure.Migrations
{
    public partial class UpdateCalendarTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Json",
                table: "CalendarEvents",
                newName: "Description");

            migrationBuilder.AddColumn<Guid>(
                name: "FileId",
                table: "CalendarEvents",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "CalendarEvents",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileId",
                table: "CalendarEvents");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "CalendarEvents");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "CalendarEvents",
                newName: "Json");
        }
    }
}
