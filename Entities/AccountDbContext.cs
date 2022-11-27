using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Elaborate.Elaborate.Entities
{
   // [DbConfigurationType(typeof(MySql.Data.Entity.MySqlEFConfiguration))]
    public class AccountDbContext : DbContext
    {
        private string _connectionString = "server=146.59.126.32;port=3306;uid=user;pwd=Yg5udzLxxw9ADsT;database=elaborate-db";
        //private string _connectionString = "Server=146.59.126.32;Port=3306;Database=elaborate-db;Uid=user;Pwd=Yg5udzLxxw9ADsT";
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
            optionsBuilder.UseSqlServer(_connectionString);
        }
    }
}
