using System.Linq;
using AutoFixture;
using AutoFixture.AutoMoq;
using HowFar.Core.Models;
using NUnit.Framework;

namespace Tests.Core
{
    [TestFixture]
    public class MeasurementConverterTests
    {
        private MeasureConverters model;
        private Fixture fixture;
        [SetUp]
        public void Setup()
        {
            fixture = new Fixture();
            fixture.Customize(new AutoMoqCustomization() {GenerateDelegates = true, ConfigureMembers = true});
            fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList()
                .ForEach(b => fixture.Behaviors.Remove(b));
            fixture.Behaviors.Add(new OmitOnRecursionBehavior(3));
            model = fixture.Build<MeasureConverters>().OmitAutoProperties().Create();
        }

        [Test]
        public void HasSomething()
        {
            Assert.True(model.ObjectMeasurements.Any()); 
        }

        [Test]
        public void DeletingRefreshes()
        {
            
        }
    }
}