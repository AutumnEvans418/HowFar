using System;
using System.Linq;
using HowFar.Core.Models;
using HowFarApp.Models;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;

namespace Tests
{
    [TestFixture]
    public class DatabaseTest
    {
        private SqliteConnection connection;
        //private IMeasureConverters converters;
        private DatabaseContext db;
        [SetUp]
        public void Setup()
        {
             connection = new SqliteConnection("DataSource=:memory:");
            connection.Open();

            var options = new DbContextOptionsBuilder<DatabaseContext>().UseSqlite(connection).Options;
            db = new DatabaseContext(options);
            db.Database.EnsureCreated();

        }

        [TearDown]
        public void Tear()
        {
            db.Database.EnsureDeleted();
            db?.Dispose();
            connection.Close();
        }


        [Test]
        public void AddLink()
        {
            DbStart();
            db.ObjectMeasurements.Add(new ObjectMeasurement("j", "js"){Measurement = db.ObjectMeasurements.First()});
            db.SaveChanges();

            var count = db.ObjectMeasurements.Count();
            Assert.AreEqual(2, count);
            var first = db.ObjectMeasurements.Last();
            Assert.NotNull(first.Measurement);
        }

        [Test]
        public void DbStart()
        {
            db.ObjectMeasurements.Add(new ObjectMeasurement("Test", "Tests"));

            db.SaveChanges();

            var count = db.ObjectMeasurements.Count();
            Assert.AreEqual(1, count);

        }
    }

}
