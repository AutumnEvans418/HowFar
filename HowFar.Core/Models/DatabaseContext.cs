using System.Collections.Generic;
using System.Linq;
using HowFar.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace HowFarApp.Models
{
    public class DatabaseContext : DbContext
    {

        public DbSet<ObjectMeasurement> ObjectMeasurements { get; set; }
        public DbSet<ObjectPack> ObjectPacks { get; set; }

        private readonly string _databasePath;

        public DatabaseContext(DbContextOptions options) : base(options)
        {

        }
        public DatabaseContext(string databasePath)
        {
            _databasePath = databasePath;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
                optionsBuilder.UseSqlite($"Filename={_databasePath}");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ObjectPack>(e =>
            {
                e.HasMany(p => p.ObjectMeasurements).WithOne(p => p.ObjectPack).HasForeignKey(p=>p.ObjectPackId);
            });

            modelBuilder.Entity<ObjectMeasurement>(e =>
            {
                e.HasOne(p => p.Measurement).WithMany(p => p.ObjectMeasurements);
                e.HasMany(p => p.ObjectMeasurements).WithOne(p => p.Measurement)
                    .HasForeignKey(p => p.ParentObjectMeasurementId);


            });
            base.OnModelCreating(modelBuilder);
        }
    }
}