using Microsoft.EntityFrameworkCore.Migrations;

namespace Elaborate.Migrations
{
    public partial class IndexColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Index",
                table: "TypesPreciousMetals",
                nullable: false);

            migrationBuilder.AddColumn<string>(
                name: "Index",
                table: "TypeCryptoCurrencies",
                nullable: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Index",
                table: "TypesPreciousMetals");

            migrationBuilder.DropColumn(
                name: "Index",
                table: "TypeCryptoCurrencies");
        }
    }
}
