using CMS.Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Article> Articles { get; set; }
    public DbSet<ArticleVersion> ArticleVersions { get; set; }
}
