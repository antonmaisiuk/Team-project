using Elaborate.Elaborate.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Elaborate.Entities
{
    /// <summary>
    /// ApplicationDbContext buduję bazę danych aplikacji po przez migracje
    /// </summary>
    public class ApplicationDbContext : DbContext
    {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<Account> Accounts { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<TransCategory> TransCategories { get; set; }
        public DbSet<InvestmentPreciousMetal> InvestmentsPreciousMetals { get; set; }
        public DbSet<TypePreciousMetal> TypesPreciousMetals { get; set; }
        public DbSet<InvestmentCryptoCurrency> InvestmentCryptoCurrencies { get; set; }
        public DbSet<TypeCryptoCurrency> TypeCryptoCurrencies { get; set; }
        public DbSet<InvestmentStock> InvestmentStocks { get; set; }
        public DbSet<TypeStock> TypeStocks { get; set; }


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
                .HasMaxLength(60);

            //modelBuilder.Entity<Transaction>()
            //    .Property(r => r.Title)
            //    .IsRequired()
            //    .HasMaxLength(30);

            modelBuilder.Entity<Transaction>()
                .Property(r => r.Value)
                .IsRequired();

            modelBuilder.Entity<TransCategory>()
                .Property(r => r.Name)
                .IsRequired()
                .HasMaxLength(30);

            modelBuilder.Entity<InvestmentPreciousMetal>()
                .Property(r => r.Amount)
                .IsRequired();

            modelBuilder.Entity<InvestmentPreciousMetal>()
                .Property(r => r.AccountId)
                .HasColumnType("int")
                .IsRequired();

            modelBuilder.Entity<InvestmentPreciousMetal>()
                .Property(r => r.TypePreciousMetalId)
                .HasColumnType("int")
                .IsRequired();

            modelBuilder.Entity<TypePreciousMetal>()
                .Property(r => r.Name)
                .IsRequired()
                .HasMaxLength(30);
            modelBuilder.Entity<InvestmentCryptoCurrency>()
                .Property(r => r.Amount)
                .IsRequired();

            modelBuilder.Entity<InvestmentCryptoCurrency>()
                .Property(r => r.AccountId)
                .HasColumnType("int")
                .IsRequired();

            modelBuilder.Entity<InvestmentCryptoCurrency>()
                .Property(r => r.TypeCryptoCurrencyId)
                .HasColumnType("int")
                .IsRequired();

            modelBuilder.Entity<TypeCryptoCurrency>()
                .Property(r => r.Name)
                .IsRequired()
                .HasMaxLength(30);

            modelBuilder.Entity<InvestmentStock>()
                .Property(r => r.Amount)
                .IsRequired();

            modelBuilder.Entity<InvestmentStock>()
                .Property(r => r.AccountId)
                .HasColumnType("int")
                .IsRequired();

            modelBuilder.Entity<InvestmentStock>()
                .Property(r => r.TypeId)
                .HasColumnType("int")
                .IsRequired();

            modelBuilder.Entity<TypeStock>()
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
