using Microsoft.EntityFrameworkCore.Migrations;

namespace Elaborate.Migrations
{
    public partial class wicia : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InvestmentCryptoCurrencies_TypeCryptoCurrencies_TypeCryptoCu~",
                table: "InvestmentCryptoCurrencies");

            migrationBuilder.DropForeignKey(
                name: "FK_InvestmentsPreciousMetals_TypesPreciousMetals_TypePreciousMe~",
                table: "InvestmentsPreciousMetals");

            migrationBuilder.DropForeignKey(
                name: "FK_InvestmentStocks_TypeStocks_TypeStockId",
                table: "InvestmentStocks");

            migrationBuilder.AlterColumn<int>(
                name: "TypeStockId",
                table: "InvestmentStocks",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "TypeId",
                table: "InvestmentStocks",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "TypePreciousMetalId",
                table: "InvestmentsPreciousMetals",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "TypeId",
                table: "InvestmentsPreciousMetals",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "TypeCryptoCurrencyId",
                table: "InvestmentCryptoCurrencies",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "TypeId",
                table: "InvestmentCryptoCurrencies",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_InvestmentCryptoCurrencies_TypeCryptoCurrencies_TypeCryptoCu~",
                table: "InvestmentCryptoCurrencies",
                column: "TypeCryptoCurrencyId",
                principalTable: "TypeCryptoCurrencies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_InvestmentsPreciousMetals_TypesPreciousMetals_TypePreciousMe~",
                table: "InvestmentsPreciousMetals",
                column: "TypePreciousMetalId",
                principalTable: "TypesPreciousMetals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_InvestmentStocks_TypeStocks_TypeStockId",
                table: "InvestmentStocks",
                column: "TypeStockId",
                principalTable: "TypeStocks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InvestmentCryptoCurrencies_TypeCryptoCurrencies_TypeCryptoCu~",
                table: "InvestmentCryptoCurrencies");

            migrationBuilder.DropForeignKey(
                name: "FK_InvestmentsPreciousMetals_TypesPreciousMetals_TypePreciousMe~",
                table: "InvestmentsPreciousMetals");

            migrationBuilder.DropForeignKey(
                name: "FK_InvestmentStocks_TypeStocks_TypeStockId",
                table: "InvestmentStocks");

            migrationBuilder.DropColumn(
                name: "TypeId",
                table: "InvestmentStocks");

            migrationBuilder.DropColumn(
                name: "TypeId",
                table: "InvestmentsPreciousMetals");

            migrationBuilder.DropColumn(
                name: "TypeId",
                table: "InvestmentCryptoCurrencies");

            migrationBuilder.AlterColumn<int>(
                name: "TypeStockId",
                table: "InvestmentStocks",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "TypePreciousMetalId",
                table: "InvestmentsPreciousMetals",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "TypeCryptoCurrencyId",
                table: "InvestmentCryptoCurrencies",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_InvestmentCryptoCurrencies_TypeCryptoCurrencies_TypeCryptoCu~",
                table: "InvestmentCryptoCurrencies",
                column: "TypeCryptoCurrencyId",
                principalTable: "TypeCryptoCurrencies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_InvestmentsPreciousMetals_TypesPreciousMetals_TypePreciousMe~",
                table: "InvestmentsPreciousMetals",
                column: "TypePreciousMetalId",
                principalTable: "TypesPreciousMetals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_InvestmentStocks_TypeStocks_TypeStockId",
                table: "InvestmentStocks",
                column: "TypeStockId",
                principalTable: "TypeStocks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
