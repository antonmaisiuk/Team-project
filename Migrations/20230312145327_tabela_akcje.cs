using Microsoft.EntityFrameworkCore.Migrations;
using MySql.Data.EntityFrameworkCore.Metadata;

namespace Elaborate.Migrations
{
    public partial class tabela_akcje : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ValueOfInvestment",
                table: "InvestmentsPreciousMetals");

            migrationBuilder.DropColumn(
                name: "ValueOfInvestment",
                table: "InvestmentCryptoCurrencies");

            migrationBuilder.CreateTable(
                name: "TypeStocks",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 30, nullable: false),
                    image = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeStocks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "InvestmentStocks",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Value = table.Column<int>(nullable: false),
                    Amount = table.Column<double>(nullable: false),
                    AccountId = table.Column<int>(type: "int", nullable: false),
                    TypeStockId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InvestmentStocks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InvestmentStocks_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InvestmentStocks_TypeStocks_TypeStockId",
                        column: x => x.TypeStockId,
                        principalTable: "TypeStocks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_InvestmentStocks_AccountId",
                table: "InvestmentStocks",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_InvestmentStocks_TypeStockId",
                table: "InvestmentStocks",
                column: "TypeStockId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InvestmentStocks");

            migrationBuilder.DropTable(
                name: "TypeStocks");

            migrationBuilder.AddColumn<decimal>(
                name: "ValueOfInvestment",
                table: "InvestmentsPreciousMetals",
                type: "decimal(18, 2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "ValueOfInvestment",
                table: "InvestmentCryptoCurrencies",
                type: "decimal(18, 2)",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
