using System.Linq;
using HowFar.Core.Models;
using HowFarApp.Models;
using Microsoft.Data.Sqlite;
using NUnit.Framework;

namespace Tests.Core
{
    [TestFixture]
    public class RealDatabaseTests
    {
        private DatabaseContext db;
        [SetUp]
        public void Setup()
        {
            db = new DatabaseContext("test.db");
            
            db.Database.EnsureCreated();
        }

        [TearDown]
        public void Destroy()
        {
            db.Database.EnsureDeleted();
            db?.Dispose();
        }

        [Test]
        public void AddData()
        {
            var cnt = db.ObjectPacks.Count();
            db.ObjectPacks.Add(new ObjectPack("test", "test"));
            db.SaveChanges();
            
            Assert.AreEqual(cnt+1, db.ObjectPacks.Count());

        }
    }
}