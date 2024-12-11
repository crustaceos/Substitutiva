﻿// <auto-generated />
using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace API.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20241211121718_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "9.0.0");

            modelBuilder.Entity("API.Models.Aluno", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("nome")
                        .HasColumnType("TEXT");

                    b.Property<string>("sobrenome")
                        .HasColumnType("TEXT");

                    b.HasKey("id");

                    b.ToTable("Alunos");
                });

            modelBuilder.Entity("API.Models.IMC", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<double>("altura")
                        .HasColumnType("REAL");

                    b.Property<int>("alunoId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("classificacao")
                        .HasColumnType("TEXT");

                    b.Property<double>("imcResultado")
                        .HasColumnType("REAL");

                    b.Property<double>("peso")
                        .HasColumnType("REAL");

                    b.HasKey("id");

                    b.HasIndex("alunoId");

                    b.ToTable("IMCs");
                });

            modelBuilder.Entity("API.Models.IMC", b =>
                {
                    b.HasOne("API.Models.Aluno", "aluno")
                        .WithMany()
                        .HasForeignKey("alunoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("aluno");
                });
#pragma warning restore 612, 618
        }
    }
}