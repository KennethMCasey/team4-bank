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
                    .HasName("PK__Account__3528DA3D1DB3CEB7");

                entity.Property(e => e.AcctId).HasColumnName("Acct_Id");

                entity.Property(e => e.AcctType)
                    .IsRequired()
                    .HasColumnName("Acct_Type")
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .IsFixedLength()
                    .HasDefaultValueSql("('S')");

                entity.Property(e => e.Balance).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.CrDate)
                    .HasColumnName("CR_Date")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(sysutcdatetime())");

                entity.Property(e => e.CustId).HasColumnName("Cust_Id");

                entity.Property(e => e.Duration)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasComputedColumnSql("(stuff(CONVERT([varchar](20),CONVERT([datetime],sysutcdatetime())-[CR_Date],(114)),(1),(2),datediff(hour,(0),CONVERT([datetime],sysutcdatetime())-[CR_Date])))");

                entity.Property(e => e.TrLastDate)
                    .HasColumnName("TR_Last_Date")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.Cust)
                    .WithMany(p => p.Account)
                    .HasForeignKey(d => d.CustId)
                    .HasConstraintName("FK__Account__Cust_Id__70DDC3D8");
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.HasKey(e => e.CustId)
                    .HasName("PK__Customer__7B89511705E849CA");

                entity.HasIndex(e => e.Ssn)
                    .HasName("UQ__Customer__CA1E8E3C33600684")
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
                entity.HasKey(e => e.TId)
                    .HasName("PK__Transact__83BB1F92D827F8B1");

                entity.Property(e => e.TId).HasColumnName("T_Id");

                entity.Property(e => e.Amount).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.CustId).HasColumnName("Cust_Id");

                entity.Property(e => e.SourceAcct).HasColumnName("Source_Acct");

                entity.Property(e => e.TargetAcct).HasColumnName("Target_Acct");

                entity.Property(e => e.TranDate)
                    .HasColumnName("Tran_Date")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(sysutcdatetime())");

                entity.HasOne(d => d.Cust)
                    .WithMany(p => p.Transactions)
                    .HasForeignKey(d => d.CustId)
                    .HasConstraintName("FK__Transacti__Cust___778AC167");

                entity.HasOne(d => d.SourceAcctNavigation)
                    .WithMany(p => p.TransactionsSourceAcctNavigation)
                    .HasForeignKey(d => d.SourceAcct)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Transacti__Sourc__797309D9");

                entity.HasOne(d => d.TargetAcctNavigation)
                    .WithMany(p => p.TransactionsTargetAcctNavigation)
                    .HasForeignKey(d => d.TargetAcct)
                    .HasConstraintName("FK__Transacti__Targe__7A672E12");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
