using System.Collections.Generic;
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

            var map = fixture.Freeze<Mock<IMapPage>>();

            var pins = new List<Pin>();
            var lines = new List<Polyline>();
            map.Setup(p => p.Pins).Returns(pins);
            map.Setup(p => p.Polylines).Returns(lines);
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