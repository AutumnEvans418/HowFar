using System.Collections.Generic;
using System.Linq;
using HowFar.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace HowFarApp.Models
{
    public class DatabaseContext : DbContext, IDatabase
    {
        public void Add(ObjectMeasurement objectMeasurement)
        {
            ObjectMeasurements.Add(objectMeasurement);
        }

        public DbSet<ObjectMeasurement> ObjectMeasurements { get; set; }
        public void Update(ObjectMeasurement centimeter)
        {
            ObjectMeasurements.Update(centimeter);
        }

        IEnumerable<ObjectMeasurement> IDatabase.ObjectMeasurements => ObjectMeasurements.ToList();

        private readonly string _databasePath;

        public DatabaseContext(string databasePath)
        {
            _databasePath = databasePath;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite($"Filename={_databasePath}");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ObjectMeasurement>(e =>
            {
                e.HasKey(p => p.SingleName);
                e.HasOne(p => p.Measurement).WithMany(p => p.ObjectMeasurements);
                

            });
            base.OnModelCreating(modelBuilder);
        }
    }
}