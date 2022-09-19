using IDO.Models;
using Microsoft.EntityFrameworkCore;
using IDO_dotnet6.dotnet.Models;

namespace IDO.Data
{
    public class IDODBContext : DbContext
    {
        public IDODBContext(DbContextOptions<IDODBContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Email = "email@example.com",
                    Password = "password"
                }
              );
        }

        public DbSet<Issue> Issues { get; set; }

        public DbSet<IDO_dotnet6.dotnet.Models.DTO> DTO { get; set; }

    }
}
