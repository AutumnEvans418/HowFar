using HowFarApp.Views;
using Prism;
using Prism.Ioc;

namespace HowFarApp.UWP
{
    public class Initializer : IPlatformInitializer
    {
        private readonly string _path;

        public Initializer(string path)
        {
            _path = path;
        }
        public void RegisterTypes(IContainerRegistry containerRegistry)
        {
            containerRegistry.Register<ILocationService, LocationService>();
            containerRegistry.RegisterInstance<GetDbPath>(() => _path);

        }
    }
}