using System.Linq;
using AutoFixture;
using AutoFixture.AutoMoq;
using HowFar.Core.Models;
using HowFarApp.ViewModels;
using Moq;
using NUnit.Framework;
using Prism.Navigation;

namespace Tests.ViewModels
{
    [TestFixture]
    public class NewObjectPageViewModelTests
    {
        private NewObjectPageViewModel model;
        private Mock<IMeasureConverters> converters;
        private Mock<INavigationService> navigation;
        [SetUp]
        public void Setup()
        {
            var fixture = new Fixture();
            fixture.Customize(new AutoMoqCustomization(){GenerateDelegates = true, ConfigureMembers = true});
            fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList()
                .ForEach(b => fixture.Behaviors.Remove(b));
            fixture.Behaviors.Add(new OmitOnRecursionBehavior());
            converters = fixture.Freeze<Mock<IMeasureConverters>>();
            navigation = fixture.Freeze<Mock<INavigationService>>();
            model = fixture.Build<NewObjectPageViewModel>().OmitAutoProperties().Create();
        }



        [Test]
        public void CreateObject()
        {
            model.SingleName = "test";
            model.PluralName = "tests";
            model.MeasurementValue = 10.1;
            model.SelectedObject = model.ObjectMeasurements.First();
            model.SelectedObjectPack = model.ObjectPacks.First();
            model.NewCommand.Execute();

            navigation.Verify(p=>p.NavigateAsync(It.IsAny<string>()));
            converters.Verify(p=>p.NewObject(It.IsAny<string>(),It.IsAny<string>(), It.IsAny<double>(), It.IsAny<ObjectMeasurement>(), It.IsAny<string>()));
        }
    }
}