using Microsoft.EntityFrameworkCore.Migrations;
using MySql.Data.EntityFrameworkCore.Metadata;

namespace Elaborate.Migrations
{
    public partial class debesta : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Logins");

            migrationBuilder.AlterColumn<string>(
                name: "PasswordHash",
                table: "Accounts",
                maxLength: 60,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(50)",
                oldMaxLength: 50);

            migrationBuilder.CreateTable(
                name: "TypesPreciousMetal",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 30, nullable: false),
                    image = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypesPreciousMetal", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "InvestmentsPreciousMetals",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Amount = table.Column<double>(nullable: false),
                    AccountId = table.Column<int>(type: "int", nullable: false),
                    TypePreciousMetalId = table.Column<int>(type: "int", nullable: false),
                    ValueOfInvestment = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InvestmentsPreciousMetals", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InvestmentsPreciousMetals_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InvestmentsPreciousMetals_TypesPreciousMetal_TypePreciousMet~",
                        column: x => x.TypePreciousMetalId,
                        principalTable: "TypesPreciousMetal",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_InvestmentsPreciousMetals_AccountId",
                table: "InvestmentsPreciousMetals",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_InvestmentsPreciousMetals_TypePreciousMetalId",
                table: "InvestmentsPreciousMetals",
                column: "TypePreciousMetalId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InvestmentsPreciousMetals");

            migrationBuilder.DropTable(
                name: "TypesPreciousMetal");

            migrationBuilder.AlterColumn<string>(
                name: "PasswordHash",
                table: "Accounts",
                type: "varchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 60);

            migrationBuilder.CreateTable(
                name: "Logins",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    Password = table.Column<string>(type: "text", nullable: false),
                    RepeatPassword = table.Column<string>(type: "text", nullable: false),
                    UserLogin = table.Column<string>(type: "varchar(30)", maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Logins", x => x.Id);
                });
        }
    }
}
