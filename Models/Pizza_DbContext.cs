using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace CRUD.Models
{
    public partial class Pizza_DbContext : DbContext
    {
        public Pizza_DbContext()
        {
        }

        public Pizza_DbContext(DbContextOptions<Pizza_DbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<PizzasDbo> PizzasDbos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=(local);Database=Pizza_Db;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PizzasDbo>(entity =>
            {
                entity.ToTable("Pizzas_dbo");

                entity.Property(e => e.BigPrice).HasMaxLength(10);

                entity.Property(e => e.Ingredients).HasMaxLength(50);

                entity.Property(e => e.MediumPrice).HasMaxLength(10);

                entity.Property(e => e.Name).HasMaxLength(50);

                entity.Property(e => e.Photo).IsUnicode(false);

                entity.Property(e => e.BigPhoto).IsUnicode(false);

                entity.Property(e => e.MediumPhoto).IsUnicode(false);

                entity.Property(e => e.SmallPrice).HasMaxLength(10);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
