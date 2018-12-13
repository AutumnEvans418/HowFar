using AutoFixture;
using AutoFixture.AutoMoq;
using HowFar.Core.Models;
using HowFarApp.Models;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using Moq;
using NUnit.Framework;

namespace HowFar.Tests
{
    [TestFixture]
    public class DatabaseTest
    {
        private IMeasureConverters converters;
        [SetUp]
        public void Setup()
        {
            var fixture = new Fixture();
            fixture.Customize(new AutoMoqCustomization(){ConfigureMembers = true, GenerateDelegates = true});
            var app = fixture.Freeze<Mock<IApp>>();
            var options = new DbContextOptionsBuilder<DatabaseContext>().UseInMemoryDatabase("test").Options;
            app.Setup(p => p.Database).Returns(() => new DatabaseContext(options));

            converters = fixture.Build<MeasureConverters>().OmitAutoProperties().Create<MeasureConverters>();
        }

        [Test]
        public void DbStart()
        {
           Assert.AreEqual(13, converters.ObjectMeasurements.Count);  
        }
    }
}