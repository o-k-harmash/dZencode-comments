using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class CommentConfiguration : IEntityTypeConfiguration<Comment>
{
    public void Configure(EntityTypeBuilder<Comment> builder)
    {
        builder.ToTable("comments");

        builder.HasKey(a => a.Id);

        builder.Property(a => a.Id)
            .HasColumnName("id")
            .HasColumnType("uuid")
            .HasDefaultValueSql("gen_random_uuid()")
            .ValueGeneratedOnAdd();
        
        builder.Property(a => a.ParentId)
            .HasColumnName("parent_id")
            .HasColumnType("uuid");
        
        builder.HasIndex(a => a.ParentId)
            .HasDatabaseName("ix_comments_parent_id");

        builder.Property(a => a.CreatedAt)
            .HasColumnName("created_at")
            .HasColumnType("timestamp")
            .HasDefaultValueSql("CURRENT_TIMESTAMP")
            .ValueGeneratedOnAdd();
        
        builder.HasIndex(a => a.CreatedAt)
            .HasDatabaseName("ix_comments_created_at");

        builder.Property(a => a.Text)
            .HasColumnName("text")
            .HasColumnType("text")
            .IsRequired();
        
        builder.Property(a => a.AvatarUrl)
            .HasColumnName("avatar_url")
            .HasColumnType("varchar(255)")
            .IsRequired();

        builder.Property(a => a.Nickname)
            .HasColumnName("nickname")
            .HasColumnType("varchar(100)")
            .IsRequired();
    }
}