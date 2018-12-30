using System.Linq;
using AutoFixture;
using AutoFixture.AutoMoq;
using HowFar.Core.Models;
using Moq;
using NUnit.Framework;

namespace Tests.Core
{
    [TestFixture]
    public class MeasurementConverterTests
    {
        private MeasureConverters model;
        private Fixture fixture;
        private Mock<IObjectRepository> repo;
        [SetUp]
        public void Setup()
        {
            fixture = new Fixture();
            fixture.Customize(new AutoMoqCustomization() {GenerateDelegates = true, ConfigureMembers = true});
            fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList()
                .ForEach(b => fixture.Behaviors.Remove(b));
            fixture.Behaviors.Add(new OmitOnRecursionBehavior(3));
            repo = fixture.Freeze<Mock<IObjectRepository>>();
            model = fixture.Build<MeasureConverters>().OmitAutoProperties().Create();
        }

        [Test]
        public void HasSomething()
        {
            Assert.True(model.ObjectMeasurements.Any()); 
        }

        [Test]
        public void DeletePack()
        {
            var get = model.ObjectPacks.First();

            model.DeletePack(get);

            repo.Verify(p => p.GetObjectPacks(), Times.Exactly(2));
        }

        [Test]
        public void DeletingRefreshes()
        {
            var get = model.ObjectMeasurements.First();

            model.DeleteObject(get);

            repo.Verify(p=>p.GetObjectMeasurements(), Times.Exactly(2));
        }
    }
}