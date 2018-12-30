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
        private Mock<IMapPage> map;
        [SetUp]
        public void Setup()
        {
            fixture = new Fixture();
            fixture.Customize(new AutoMoqCustomization());

            map = fixture.Freeze<Mock<IMapPage>>();

            var pins = new List<Pin>();
            var lines = new List<Polyline>();
            map.Setup(p => p.Pins).Returns(pins);
            map.Setup(p => p.Polylines).Returns(lines);
            model = fixture.Build<MapPageViewModel>().OmitAutoProperties().Create();
            model.MapPage = map.Object;
        }

        [Test]
        public void Add3()
        {
            AddTwoPins();
            model.Map_OnMapLongClicked(new Position(10, 10));

            Assert.AreEqual(2, map.Object.Pins.Count);
        }

        [Test]
        public void AddTwoPins()
        {
            model.Map_OnMapLongClicked(new Position(10, 10));
            model.Map_OnMapLongClicked(new Position(10, 10));


            Assert.AreEqual(1, map.Object.Polylines.Count);
            Assert.AreEqual(2, map.Object.Pins.Count);
        }

        [Test]
        public void AddPins()
        {
            model.Map_OnMapLongClicked(new Position(10,10));

            

           Assert.AreEqual(1, map.Object.Pins.Count);  
        }

    }
}