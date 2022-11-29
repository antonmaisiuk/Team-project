using Microsoft.EntityFrameworkCore.Migrations;

namespace Elaborate.Migrations
{
    public partial class t1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "image",
                table: "Transactions");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Transactions",
                type: "varchar(30)",
                maxLength: 30,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "image",
                table: "Transactions",
                type: "text",
                nullable: true);
        }
    }
}
