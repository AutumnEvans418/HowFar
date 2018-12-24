using AutoFixture;
using AutoFixture.AutoMoq;
using HowFarApp.Models;
using NUnit.Framework;
using HowFarApp.ViewModels;
using Moq;
using Xamarin.Forms.GoogleMaps;

namespace Tests.ViewModels
{
    [TestFixture]
    public class MapPageViewModelTests
    {
        private MapPageViewModel model;
        private Fixture fixture;
        [SetUp]
        public void Setup()
        {
            fixture = new Fixture();
            fixture.Customize(new AutoMoqCustomization());

            fixture.Freeze<Mock<IMapPage>>();
            model = fixture.Build<MapPageViewModel>().OmitAutoProperties().Create();
        }

        [Test]
        public void AddPins()
        {
            model.Map_OnMapLongClicked(new Position(10,10));

            var map = fixture.Create<Mock<IMapPage>>();

            map.Verify(p=>p.Pins.Add(It.IsAny<Pin>()));

        }

    }
}