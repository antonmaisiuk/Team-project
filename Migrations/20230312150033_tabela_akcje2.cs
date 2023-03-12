using Microsoft.EntityFrameworkCore.Migrations;

namespace Elaborate.Migrations
{
    public partial class tabela_akcje2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Value",
                table: "InvestmentStocks");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Value",
                table: "InvestmentStocks",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
