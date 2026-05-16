using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "comments",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    parent_id = table.Column<Guid>(type: "uuid", nullable: true),
                    nickname = table.Column<string>(type: "varchar(100)", nullable: false),
                    avatar_url = table.Column<string>(type: "varchar(255)", nullable: false),
                    text = table.Column<string>(type: "text", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_comments", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "ix_comments_created_at",
                table: "comments",
                column: "created_at");

            migrationBuilder.CreateIndex(
                name: "ix_comments_parent_id",
                table: "comments",
                column: "parent_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "comments");
        }
    }
}
