using System.Linq;
using AutoFixture;
using AutoFixture.AutoMoq;
using HowFar.Core.Models;
using HowFarApp.Models;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;

namespace Tests.Core
{
    [TestFixture]
    public class ObjectRepositoryTests
    {
        private ObjectRepository model;
        private Fixture fixture;
        private DatabaseContext context;
        private SqliteConnection connection;
        [SetUp]
        public void Setup()
        {
            fixture = new Fixture();
            fixture.Customize(new AutoMoqCustomization());
            connection = new SqliteConnection("DataSource=:memory:");
            connection.Open();
            var options = new DbContextOptionsBuilder<DatabaseContext>().UseSqlite(connection).Options;
            context = new DatabaseContext(options);
            Ext.CreateDatabase(context.Database.GetDbConnection());
            //context.Database.EnsureCreated();
            fixture.Inject(context);
            model = fixture.Build<ObjectRepository>().OmitAutoProperties().Create();
        }

        [TearDown]
        public void Destory()
        {
            model.Dispose();
            connection?.Dispose();
        }

        [Test]
        public void DeleteDatabase()
        {
            var db =this.context.Database.GetDbConnection();

            Ext.DeleteDatabase(db);
        }

        [Test]
        public void RemoveMeasurement()
        {
            var packs = model.GetObjectMeasurements();
            var count = packs.Count();
            
            model.RemoveObject(packs.First());
            Assert.AreEqual(count - 1, model.GetObjectMeasurements().Count());
        }

        [Test]
        public void RemovePack()
        {
            var packs = model.GetObjectPacks();
            var count = packs.Count();

            model.RemovePack(packs.First());
            Assert.AreEqual(count-1, model.GetObjectPacks().Count());
        }


        [Test]
        public void BuildTwice()
        {
            Assert.True(model.GetObjectMeasurements().Any());

            model = fixture.Build<ObjectRepository>().OmitAutoProperties().Create();

            Assert.True(model.GetObjectMeasurements().Any());

        }


    }
}