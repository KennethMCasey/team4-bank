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
        public virtual DbSet<AspNetRoleClaims> AspNetRoleClaims { get; set; }
        public virtual DbSet<AspNetRoles> AspNetRoles { get; set; }
        public virtual DbSet<AspNetUserClaims> AspNetUserClaims { get; set; }
        public virtual DbSet<AspNetUserLogins> AspNetUserLogins { get; set; }
        public virtual DbSet<AspNetUserRoles> AspNetUserRoles { get; set; }
        public virtual DbSet<AspNetUserTokens> AspNetUserTokens { get; set; }
        public virtual DbSet<AspNetUsers> AspNetUsers { get; set; }
        public virtual DbSet<Customer> Customer { get; set; }
        public virtual DbSet<Transactions> Transactions { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=localhost;Database=Team4_BankDB;user=sa;password=Cr0wnCaw;Integrated Security=False");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>(entity =>
            {
                entity.HasKey(e => e.AcctId)
                    .HasName("PK__Account__3528DA3D27A6445D");

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
                    .HasColumnType("datetime")
                    .HasComputedColumnSql("([dbo].[getLastTransactionDateForAccount]([Acct_Id]))");

                entity.HasOne(d => d.Cust)
                    .WithMany(p => p.Account)
                    .HasForeignKey(d => d.CustId)
                    .HasConstraintName("FK__Account__Cust_Id__3D2915A8");
            });

            modelBuilder.Entity<AspNetRoleClaims>(entity =>
            {
                entity.HasIndex(e => e.RoleId);

                entity.Property(e => e.RoleId).IsRequired();

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.AspNetRoleClaims)
                    .HasForeignKey(d => d.RoleId);
            });

            modelBuilder.Entity<AspNetRoles>(entity =>
            {
                entity.HasIndex(e => e.NormalizedName)
                    .HasName("RoleNameIndex")
                    .IsUnique()
                    .HasFilter("([NormalizedName] IS NOT NULL)");

                entity.Property(e => e.Name).HasMaxLength(256);

                entity.Property(e => e.NormalizedName).HasMaxLength(256);
            });

            modelBuilder.Entity<AspNetUserClaims>(entity =>
            {
                entity.HasIndex(e => e.UserId);

                entity.Property(e => e.UserId).IsRequired();

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserClaims)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUserLogins>(entity =>
            {
                entity.HasKey(e => new { e.LoginProvider, e.ProviderKey });

                entity.HasIndex(e => e.UserId);

                entity.Property(e => e.UserId).IsRequired();

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserLogins)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUserRoles>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.RoleId });

                entity.HasIndex(e => e.RoleId);

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.AspNetUserRoles)
                    .HasForeignKey(d => d.RoleId);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserRoles)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUserTokens>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.LoginProvider, e.Name });

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserTokens)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUsers>(entity =>
            {
                entity.HasIndex(e => e.NormalizedEmail)
                    .HasName("EmailIndex");

                entity.HasIndex(e => e.NormalizedUserName)
                    .HasName("UserNameIndex")
                    .IsUnique()
                    .HasFilter("([NormalizedUserName] IS NOT NULL)");

                entity.Property(e => e.Email).HasMaxLength(256);

                entity.Property(e => e.NormalizedEmail).HasMaxLength(256);

                entity.Property(e => e.NormalizedUserName).HasMaxLength(256);

                entity.Property(e => e.UserName).HasMaxLength(256);
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.HasKey(e => e.CustId)
                    .HasName("PK__Customer__7B89511770D114AF");

                entity.HasIndex(e => e.Ssn)
                    .HasName("UQ__Customer__CA1E8E3C5DA0B348")
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
                    .HasName("PK__Transact__83BB1F924F0AAC52");

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
                    .HasConstraintName("FK__Transacti__Cust___43D61337");

                entity.HasOne(d => d.SourceAcctNavigation)
                    .WithMany(p => p.TransactionsSourceAcctNavigation)
                    .HasForeignKey(d => d.SourceAcct)
                    .HasConstraintName("FK__Transacti__Sourc__45BE5BA9");

                entity.HasOne(d => d.TargetAcctNavigation)
                    .WithMany(p => p.TransactionsTargetAcctNavigation)
                    .HasForeignKey(d => d.TargetAcct)
                    .HasConstraintName("FK__Transacti__Targe__46B27FE2");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
