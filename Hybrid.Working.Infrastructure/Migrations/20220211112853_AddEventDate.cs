﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hybrid.Working.Infrastructure.Migrations
{
    public partial class AddEventDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "CalendarEvents",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Date",
                table: "CalendarEvents");
        }
    }
}
