using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;
using Elaborate.Elaborate.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Elaborate.Entities
{
    public class TransCategoryDbContext : DbContext
    {
        public TransCategoryDbContext(DbContextOptions<TransCategoryDbContext> options) : base(options) { }

        public DbSet<Transaction> Transactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Transaction>()
                .Property<string>("Name")
                .IsRequired()
                .HasColumnType("varchar(30)")
                .HasMaxLength(30);

            modelBuilder.Entity<Transaction>()
                .Property<string>("image")
                .HasColumnType("text");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySQL("server=146.59.126.32;port=3306;uid=user;pwd=Yg5udzLxxw9ADsT;database=elaborate-db");
        }
    }
}
