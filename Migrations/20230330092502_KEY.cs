using Microsoft.EntityFrameworkCore.Migrations;

namespace Elaborate.Migrations
{
    public partial class KEY : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            /*migrationBuilder.DropForeignKey(
                name: "FK_InvestmentCryptoCurrencies_TypeCryptoCurrencies_TypeCryptoCu~",
                table: "InvestmentCryptoCurrencies");*/

           /* migrationBuilder.DropForeignKey(
                name: "FK_InvestmentsPreciousMetals_TypesPreciousMetals_TypePreciousMe~",
                table: "InvestmentsPreciousMetals");*/

            /*migrationBuilder.DropForeignKey(
                name: "FK_InvestmentStocks_TypeStocks_TypeStockId",
                table: "InvestmentStocks");*/

            /*migrationBuilder.DropIndex(
                name: "IX_InvestmentStocks_TypeStockId",
                table: "InvestmentStocks");*/

            /*migrationBuilder.DropIndex(
                name: "IX_InvestmentsPreciousMetals_TypePreciousMetalId",
                table: "InvestmentsPreciousMetals");*/

            /*migrationBuilder.DropIndex(
                name: "IX_InvestmentCryptoCurrencies_TypeCryptoCurrencyId",
                table: "InvestmentCryptoCurrencies");*/

            /*migrationBuilder.DropColumn(
                name: "TypeStockId",
                table: "InvestmentStocks");*/

           /* migrationBuilder.DropColumn(
                name: "TypePreciousMetalId",
                table: "InvestmentsPreciousMetals");

           /* migrationBuilder.DropColumn(
                name: "TypeCryptoCurrencyId",
                table: "InvestmentCryptoCurrencies");*/

            migrationBuilder.CreateIndex(
                name: "IX_InvestmentStocks_TypeId",
                table: "InvestmentStocks",
                column: "TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_InvestmentsPreciousMetals_TypeId",
                table: "InvestmentsPreciousMetals",
                column: "TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_InvestmentCryptoCurrencies_TypeId",
                table: "InvestmentCryptoCurrencies",
                column: "TypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_InvestmentCryptoCurrencies_TypeCryptoCurrencies_TypeId",
                table: "InvestmentCryptoCurrencies",
                column: "TypeId",
                principalTable: "TypeCryptoCurrencies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_InvestmentsPreciousMetals_TypesPreciousMetals_TypeId",
                table: "InvestmentsPreciousMetals",
                column: "TypeId",
                principalTable: "TypesPreciousMetals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_InvestmentStocks_TypeStocks_TypeId",
                table: "InvestmentStocks",
                column: "TypeId",
                principalTable: "TypeStocks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InvestmentCryptoCurrencies_TypeCryptoCurrencies_TypeId",
                table: "InvestmentCryptoCurrencies");

            migrationBuilder.DropForeignKey(
                name: "FK_InvestmentsPreciousMetals_TypesPreciousMetals_TypeId",
                table: "InvestmentsPreciousMetals");

            migrationBuilder.DropForeignKey(
                name: "FK_InvestmentStocks_TypeStocks_TypeId",
                table: "InvestmentStocks");

            migrationBuilder.DropIndex(
                name: "IX_InvestmentStocks_TypeId",
                table: "InvestmentStocks");

            migrationBuilder.DropIndex(
                name: "IX_InvestmentsPreciousMetals_TypeId",
                table: "InvestmentsPreciousMetals");

            migrationBuilder.DropIndex(
                name: "IX_InvestmentCryptoCurrencies_TypeId",
                table: "InvestmentCryptoCurrencies");

            migrationBuilder.AddColumn<int>(
                name: "TypeStockId",
                table: "InvestmentStocks",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TypePreciousMetalId",
                table: "InvestmentsPreciousMetals",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TypeCryptoCurrencyId",
                table: "InvestmentCryptoCurrencies",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_InvestmentStocks_TypeStockId",
                table: "InvestmentStocks",
                column: "TypeStockId");

            migrationBuilder.CreateIndex(
                name: "IX_InvestmentsPreciousMetals_TypePreciousMetalId",
                table: "InvestmentsPreciousMetals",
                column: "TypePreciousMetalId");

            migrationBuilder.CreateIndex(
                name: "IX_InvestmentCryptoCurrencies_TypeCryptoCurrencyId",
                table: "InvestmentCryptoCurrencies",
                column: "TypeCryptoCurrencyId");

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
    }
}
