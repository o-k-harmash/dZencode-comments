using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public DbSet<Comment> Comments => Set<Comment>();

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    { 
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
       modelBuilder.ApplyConfiguration(new CommentConfiguration());
    }
}