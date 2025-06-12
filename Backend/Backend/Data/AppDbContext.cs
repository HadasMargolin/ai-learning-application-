using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<SubCategory> SubCategories { get; set; }
        public DbSet<Prompt> Prompts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Categories
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Science" },
                new Category { Id = 2, Name = "Math" },
                new Category { Id = 3, Name = "History" },
                new Category { Id = 4, Name = "Languages" },
                new Category { Id = 5, Name = "Stocks" },       // ✅ מניות
                new Category { Id = 6, Name = "Real Estate" }   // ✅ נדל"ן
            );

            // SubCategories
            modelBuilder.Entity<SubCategory>().HasData(
                new SubCategory { Id = 1, Name = "Space", CategoryId = 1 },
                new SubCategory { Id = 2, Name = "Biology", CategoryId = 1 },
                new SubCategory { Id = 3, Name = "Algebra", CategoryId = 2 },
                new SubCategory { Id = 4, Name = "Geometry", CategoryId = 2 },
                new SubCategory { Id = 5, Name = "World War II", CategoryId = 3 },
                new SubCategory { Id = 6, Name = "Ancient Rome", CategoryId = 3 },
                new SubCategory { Id = 7, Name = "English", CategoryId = 4 },
                new SubCategory { Id = 8, Name = "Hebrew", CategoryId = 4 },
                new SubCategory { Id = 9, Name = "Options", CategoryId = 5 },       // ✅ אופציות
                new SubCategory { Id = 10, Name = "Investments", CategoryId = 6 }   // ✅ השקעות
            );
        }
    }
}
