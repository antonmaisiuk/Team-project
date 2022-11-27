using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Elaborate.Elaborate.Entities
{
    public class AccountDbContext : DbContext
    {
        public AccountDbContext(DbContextOptions<AccountDbContext> options) : base(options) { } 

        

        public DbSet<Account> Accounts { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<TransCategory> TransCategories { get; set; }

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

            //modelBuilder.Entity<Transaction>()
            //    .Property(r => r.Date)
            //    .IsRequired();

            modelBuilder.Entity<TransCategory>()
                .Property(r => r.Name)
                .IsRequired()
                .HasMaxLength(30);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySQL("server=146.59.126.32;port=3306;uid=user;pwd=Yg5udzLxxw9ADsT;database=elaborate-db");
        }
    }
}
