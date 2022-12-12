using Elaborate.Elaborate.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Elaborate.Entities
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<Account> Accounts { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<TransCategory> TransCategories { get; set; }
        public DbSet<Login> Logins { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>()
              .Property(r => r.Name)
              .IsRequired()
              .HasMaxLength(30);

            modelBuilder.Entity<Account>()
                .Property(r => r.Email)
                .IsRequired()
                .HasMaxLength(50);

            modelBuilder.Entity<Account>()
                .Property(r => r.Phone)
                .IsRequired();

            modelBuilder.Entity<Account>()
                .Property(r => r.PasswordHash)
                .IsRequired()
                .HasMaxLength(50);

            modelBuilder.Entity<Transaction>()
                .Property(r => r.Title)
                .IsRequired()
                .HasMaxLength(30);

            modelBuilder.Entity<Transaction>()
                .Property(r => r.Value)
                .IsRequired();

            modelBuilder.Entity<TransCategory>()
                .Property(r => r.Name)
                .IsRequired()
                .HasMaxLength(30);

            modelBuilder.Entity<Login>()
                .Property(r => r.UserLogin)
                .IsRequired()
                .HasMaxLength(30);

            modelBuilder.Entity<Login>()
                .Property(r => r.Password)
                .IsRequired();

            modelBuilder.Entity<Login>()
                .Property(r => r.RepeatPassword)
                .IsRequired();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySQL("server=146.59.126.32;port=3306;uid=user;pwd=Yg5udzLxxw9ADsT;database=elaborate-db");
        }
    }
}
