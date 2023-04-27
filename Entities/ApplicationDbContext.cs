using Elaborate.Elaborate.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace Elaborate.Entities
{
    /// <summary>
    /// ApplicationDbContext buduję bazę danych aplikacji po przez migracje
    /// </summary>
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(IConfiguration configuration, DbContextOptions<ApplicationDbContext> options) : base(options)
        {
                        Configuration = configuration;
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
        public IConfiguration Configuration { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           // base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Account>()
              .Property(r => r.UserName)
              .IsRequired()
              .HasMaxLength(30);

            modelBuilder.Entity<Account>()
                .Property(r => r.Email)
                .IsRequired()
                .HasMaxLength(50);

            modelBuilder.Entity<Account>()
                .Property(r => r.PhoneNumber)
                .IsRequired();

            modelBuilder.Entity<Account>()
                .Property(r => r.PasswordHash)
                .IsRequired()
                .HasMaxLength(60);

            modelBuilder.Entity<Account>()
                .Property(r => r.LockoutEnabled)
                .HasDefaultValue(true);

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
                .Property(r => r.TypeId)
                .HasColumnType("int")
                .IsRequired();

            //Oznaczenie klucza obcego
            modelBuilder.Entity<InvestmentPreciousMetal>()
                .HasOne(r => r.TypePreciousMetal)
                .WithMany()
                .HasForeignKey(r => r.TypeId);

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
                .Property(r => r.TypeId)
                .HasColumnType("int")
                .IsRequired();
            //Oznaczenie klucza obcego
            modelBuilder.Entity<InvestmentCryptoCurrency>()
                .HasOne(r => r.TypeCryptoCurrency)
                .WithMany()
                .HasForeignKey(r => r.TypeId);

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

            //Oznaczenie klucza obcego
            modelBuilder.Entity<InvestmentStock>()
                .HasOne(r => r.TypeStock)
                .WithMany()
                .HasForeignKey(r => r.TypeId);

            modelBuilder.Entity<TypeStock>()
                .Property(r => r.Name)
                .IsRequired()
                .HasMaxLength(30);

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string mySqlConnectionString = Configuration.GetConnectionString("DefaultConnection");
            optionsBuilder.UseMySQL(mySqlConnectionString);
        }
    }
}
