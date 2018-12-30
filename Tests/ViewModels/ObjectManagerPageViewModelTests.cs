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
    public class ObjectManagerPageViewModelTests
    {
        private Fixture fixture;

        private ObjectManagerPageViewModel model;
        private Mock<INavigationService> nav;
        private Mock<IMeasureConverters> conv;
        [SetUp]
        public void Setup()
        {
            fixture = new Fixture();
            fixture.Customize(new AutoMoqCustomization());
            fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList()
                .ForEach(b => fixture.Behaviors.Remove(b));
            fixture.Behaviors.Add(new OmitOnRecursionBehavior());
            nav = fixture.Freeze<Mock<INavigationService>>();
            conv = fixture.Freeze<Mock<IMeasureConverters>>();
            model = fixture.Build<ObjectManagerPageViewModel>().OmitAutoProperties().Create();
            model.OnNavigatedTo(new NavigationParameters());
        }

        [Test]
        public void DeleteObject()
        {
            model.SelectedObject = model.Objects.First();
            model.DeleteObjectCommand.Execute();

            conv.Verify(p=>p.DeleteObject(It.IsAny<ObjectMeasurement>()));
        }

        [Test]
        public void EditObject()
        {
            model.SelectedObject = model.Objects.First();
            model.EditObjectCommand.Execute();
            nav.Verify(p=>p.NavigateAsync(It.IsAny<string>(), It.IsAny<INavigationParameters>()));
        }

        [Test]
        public void AddObject()
        {
            model.NewCommand.Execute();
            nav.Verify(p=>p.NavigateAsync(It.IsAny<string>()));
        }
    }
}