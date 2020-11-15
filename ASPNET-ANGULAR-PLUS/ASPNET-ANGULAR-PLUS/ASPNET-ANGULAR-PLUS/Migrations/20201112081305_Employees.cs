using Microsoft.EntityFrameworkCore.Migrations;

namespace ASPNET_ANGULAR_PLUS.Migrations
{
    public partial class Employees : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Employee",
                columns: table => new
                {
                    EmployeeId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Dni = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Surnames = table.Column<string>(nullable: false),
                    Job = table.Column<string>(nullable: false),
                    Email = table.Column<string>(nullable: false),
                    Salary = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employee", x => x.EmployeeId);
                });

            migrationBuilder.CreateTable(
                name: "Address",
                columns: table => new
                {
                    IdAddress = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StreetAddress = table.Column<string>(nullable: false),
                    City = table.Column<string>(nullable: false),
                    Province = table.Column<string>(nullable: false),
                    PostalCode = table.Column<string>(nullable: false),
                    Country = table.Column<string>(nullable: false),
                    EmployeeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Address", x => x.IdAddress);
                    table.ForeignKey(
                        name: "FK_Address_Employee_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employee",
                        principalColumn: "EmployeeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Employee",
                columns: new[] { "EmployeeId", "Dni", "Email", "Job", "Name", "Salary", "Surnames" },
                values: new object[] { 1, "12345678A", "elenito@gmail.com", "Developer", "Elena", 30000, "Nito del Bosque" });

            migrationBuilder.InsertData(
                table: "Address",
                columns: new[] { "IdAddress", "City", "Country", "EmployeeId", "PostalCode", "Province", "StreetAddress" },
                values: new object[] { 1, "Cerdanyola del Vallès", "Catalunya", 1, "08290", "Barcelona", "Carrer Mare de Déu de les Feixes, 36" });

            migrationBuilder.CreateIndex(
                name: "IX_Address_EmployeeId",
                table: "Address",
                column: "EmployeeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Address");

            migrationBuilder.DropTable(
                name: "Employee");
        }
    }
}
