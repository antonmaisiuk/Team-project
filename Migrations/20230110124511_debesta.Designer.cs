﻿// <auto-generated />
using System;
using Elaborate.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Elaborate.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20230110124511_debesta")]
    partial class debesta
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Elaborate.Elaborate.Entities.Account", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("varchar(50)")
                        .HasMaxLength(50);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(30)")
                        .HasMaxLength(30);

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("varchar(60)")
                        .HasMaxLength(60);

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Accounts");
                });

            modelBuilder.Entity("Elaborate.Elaborate.Entities.TransCategory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(30)")
                        .HasMaxLength(30);

                    b.Property<string>("image")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("TransCategories");
                });

            modelBuilder.Entity("Elaborate.Elaborate.Entities.Transaction", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("AccountId")
                        .HasColumnType("int");

                    b.Property<string>("Comment")
                        .HasColumnType("text");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("varchar(30)")
                        .HasMaxLength(30);

                    b.Property<int>("TransCategoryId")
                        .HasColumnType("int");

                    b.Property<decimal>("Value")
                        .HasColumnType("decimal(18, 2)");

                    b.HasKey("Id");

                    b.HasIndex("AccountId");

                    b.HasIndex("TransCategoryId");

                    b.ToTable("Transactions");
                });

            modelBuilder.Entity("Elaborate.Entities.InvestmentPreciousMetals", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("AccountId")
                        .HasColumnType("int");

                    b.Property<double>("Amount")
                        .HasColumnType("double");

                    b.Property<int>("TypePreciousMetalId")
                        .HasColumnType("int");

                    b.Property<decimal>("ValueOfInvestment")
                        .HasColumnType("decimal(18, 2)");

                    b.HasKey("Id");

                    b.HasIndex("AccountId");

                    b.HasIndex("TypePreciousMetalId");

                    b.ToTable("InvestmentsPreciousMetals");
                });

            modelBuilder.Entity("Elaborate.Entities.TypePreciousMetal", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(30)")
                        .HasMaxLength(30);

                    b.Property<string>("image")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("TypesPreciousMetal");
                });

            modelBuilder.Entity("Elaborate.Elaborate.Entities.Transaction", b =>
                {
                    b.HasOne("Elaborate.Elaborate.Entities.Account", "Account")
                        .WithMany("ListOfTransactions")
                        .HasForeignKey("AccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Elaborate.Elaborate.Entities.TransCategory", "TransCategory")
                        .WithMany()
                        .HasForeignKey("TransCategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Elaborate.Entities.InvestmentPreciousMetals", b =>
                {
                    b.HasOne("Elaborate.Elaborate.Entities.Account", "Account")
                        .WithMany()
                        .HasForeignKey("AccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Elaborate.Entities.TypePreciousMetal", "TypePreciousMetal")
                        .WithMany()
                        .HasForeignKey("TypePreciousMetalId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
