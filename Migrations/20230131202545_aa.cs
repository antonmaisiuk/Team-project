using Microsoft.EntityFrameworkCore.Migrations;
using MySql.Data.EntityFrameworkCore.Metadata;

namespace Elaborate.Migrations
{
    public partial class aa : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InvestmentsPreciousMetals_TypesPreciousMetal_TypePreciousMet~",
                table: "InvestmentsPreciousMetals");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TypesPreciousMetal",
                table: "TypesPreciousMetal");

            migrationBuilder.DropColumn(
                name: "Comment",
                table: "Transactions");

            migrationBuilder.RenameTable(
                name: "TypesPreciousMetal",
                newName: "TypesPreciousMetals");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Transactions",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(30)",
                oldMaxLength: 30);

            migrationBuilder.AddPrimaryKey(
                name: "PK_TypesPreciousMetals",
                table: "TypesPreciousMetals",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "TypeCryptoCurrencies",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 30, nullable: false),
                    image = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeCryptoCurrencies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "InvestmentCryptoCurrencies",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Amount = table.Column<decimal>(nullable: false),
                    AccountId = table.Column<int>(type: "int", nullable: false),
                    TypeCryptoCurrencyId = table.Column<int>(type: "int", nullable: false),
                    ValueOfInvestment = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InvestmentCryptoCurrencies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InvestmentCryptoCurrencies_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InvestmentCryptoCurrencies_TypeCryptoCurrencies_TypeCryptoCu~",
                        column: x => x.TypeCryptoCurrencyId,
                        principalTable: "TypeCryptoCurrencies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_InvestmentCryptoCurrencies_AccountId",
                table: "InvestmentCryptoCurrencies",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_InvestmentCryptoCurrencies_TypeCryptoCurrencyId",
                table: "InvestmentCryptoCurrencies",
                column: "TypeCryptoCurrencyId");

            migrationBuilder.AddForeignKey(
                name: "FK_InvestmentsPreciousMetals_TypesPreciousMetals_TypePreciousMe~",
                table: "InvestmentsPreciousMetals",
                column: "TypePreciousMetalId",
                principalTable: "TypesPreciousMetals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InvestmentsPreciousMetals_TypesPreciousMetals_TypePreciousMe~",
                table: "InvestmentsPreciousMetals");

            migrationBuilder.DropTable(
                name: "InvestmentCryptoCurrencies");

            migrationBuilder.DropTable(
                name: "TypeCryptoCurrencies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TypesPreciousMetals",
                table: "TypesPreciousMetals");

            migrationBuilder.RenameTable(
                name: "TypesPreciousMetals",
                newName: "TypesPreciousMetal");

            migrationBuilder.AlterColumn<string>(
                name: "Title",
                table: "Transactions",
                type: "varchar(30)",
                maxLength: 30,
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AddColumn<string>(
                name: "Comment",
                table: "Transactions",
                type: "text",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_TypesPreciousMetal",
                table: "TypesPreciousMetal",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_InvestmentsPreciousMetals_TypesPreciousMetal_TypePreciousMet~",
                table: "InvestmentsPreciousMetals",
                column: "TypePreciousMetalId",
                principalTable: "TypesPreciousMetal",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
