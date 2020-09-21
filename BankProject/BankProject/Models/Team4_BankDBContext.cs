using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace BankProject.Models
{
    public partial class Team4_BankDBContext : DbContext
    {
        public Team4_BankDBContext()
        {
        }

        public Team4_BankDBContext(DbContextOptions<Team4_BankDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Account> Account { get; set; }
        public virtual DbSet<Customer> Customer { get; set; }
        public virtual DbSet<Transactions> Transactions { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=DESKTOP-VLKAFFT;Database=Team4_BankDB;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>(entity =>
            {
                entity.HasKey(e => e.AcctId)
                    .HasName("PK__Account__3528DA3DFDB48635");

                entity.Property(e => e.AcctId).HasColumnName("Acct_Id");

                entity.Property(e => e.AcctType)
                    .HasColumnName("Acct_Type")
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('S')");

                entity.Property(e => e.Balance).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.CrDate)
                    .HasColumnName("CR_Date")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.CustId).HasColumnName("Cust_Id");

                entity.Property(e => e.TrLastDate)
                    .HasColumnName("TR_Last_Date")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Cust)
                    .WithMany(p => p.Account)
                    .HasForeignKey(d => d.CustId)
                    .HasConstraintName("FK__Account__Cust_Id__29572725");
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.HasKey(e => e.CustId)
                    .HasName("PK__Customer__7B8951176AE0AAEA");

                entity.HasIndex(e => e.Ssn)
                    .HasName("UQ__Customer__CA1E8E3C1F5A8544")
                    .IsUnique();

                entity.Property(e => e.CustId).HasColumnName("Cust_Id");

                entity.Property(e => e.Address)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Age).HasColumnType("numeric(3, 0)");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Ssn)
                    .HasColumnName("SSN")
                    .HasMaxLength(9)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Transactions>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.Amount).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.CustId).HasColumnName("Cust_Id");

                entity.Property(e => e.SourceAcct).HasColumnName("Source_Acct");

                entity.Property(e => e.TargetAcct).HasColumnName("Target_Acct");

                entity.Property(e => e.TranDate)
                    .HasColumnName("Tran_Date")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Cust)
                    .WithMany()
                    .HasForeignKey(d => d.CustId)
                    .HasConstraintName("FK__Transacti__Cust___2F10007B");

                entity.HasOne(d => d.SourceAcctNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.SourceAcct)
                    .HasConstraintName("FK__Transacti__Sourc__30F848ED");

                entity.HasOne(d => d.TargetAcctNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.TargetAcct)
                    .HasConstraintName("FK__Transacti__Targe__31EC6D26");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
