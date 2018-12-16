using System.Linq;
using AutoFixture;
using AutoFixture.AutoMoq;
using HowFar.Core;
using HowFar.Core.Models;
using HowFarApp.Models;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;

namespace Tests
{
    [TestFixture]
    public class ObjectManagerTests
    {
        private ObjectManager manager;
        private Fixture fixture;
        [SetUp]
        public void Setup()
        {
            fixture = new Fixture();
            fixture.Customize(new AutoMoqCustomization());

            var connection = new SqliteConnection("DataSource=:memory:");
            connection.Open();
            var options = new DbContextOptionsBuilder<DatabaseContext>().UseSqlite(connection).Options;
            var db = new DatabaseContext(options);
            db.Database.EnsureCreated();
            fixture.Inject(new ObjectRepository(db) as IObjectRepository);

            fixture.Inject(fixture.Build<MeasureConverters>().OmitAutoProperties().Create() as IMeasureConverters);
            fixture.Inject(fixture.Build<ObjectManager>().OmitAutoProperties().Create());
            manager = fixture.Create<ObjectManager>();
        }
        [Test]
        public void OneSelected()
        {
            System.Collections.Generic.List<ObjectMeasurementViewModel> result = Get3Measurements();

            result[0].Selected = true;

            Assert.AreEqual(0, manager.Comparisons.Count);
        }

        [Test]
        public void TwoSelected()
        {
            var result = Get3Measurements();
            result[0].Selected = true;
            result[1].Selected = true;
            Assert.AreEqual(1, manager.Comparisons.Count);
        }

        [Test]
        public void RemoveTest()
        {
            ThreeSelected();
            var one = manager.ObjectMeasurementViewModels.FirstOrDefault();

            Assert.AreEqual(3, manager.ObjectMeasurementViewModels.Count(p=>p.Selected));
            Assert.AreEqual(2, manager.Comparisons.Count);
            one.Selected = false;
            Assert.AreEqual(1, manager.Comparisons.Count);
        }

        [Test]
        public void InRightOrder3()
        {
            var converter = fixture.Create<IMeasureConverters>();
            ThreeSelected();
           Assert.True( manager.Comparisons[0].From.SingleName.Contains("Centi"));
           Assert.True( manager.Comparisons[0].To.SingleName.Contains("Nano"));
            Assert.AreEqual(converter.Convert("Centimeters","Nanometers"), manager.Comparisons[0].ToQty);

           Assert.True( manager.Comparisons[1].From.SingleName.Contains("Mile"));
          Assert.True(  manager.Comparisons[1].To.SingleName.Contains("Centi"));
        }
        [Test]
        public void ThreeSelected()
        {
            var result = Get3Measurements().Take(3);
            foreach (var objectMeasurementViewModel in result)
            {
                objectMeasurementViewModel.Selected = true;
            }
            Assert.AreEqual(2, manager.Comparisons.Count);
        }
        private System.Collections.Generic.List<ObjectMeasurementViewModel> Get3Measurements()
        {
            var result = manager.ObjectMeasurementViewModels.Where(p =>
                            p.ObjectMeasurement.SingleName.Contains("Nano") || p.ObjectMeasurement.SingleName.Contains("Centi") ||
                            p.ObjectMeasurement.SingleName.Contains("Mile")).ToList();
            Assert.AreEqual(3, result.Count);
            return result;
        }
    }
}