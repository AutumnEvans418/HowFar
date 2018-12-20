using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;
using HowFarApp.Views;
using Prism;
using Prism.Ioc;

namespace HowFarApp.UWP
{
    public sealed partial class MainPage
    {
        public MainPage()
        {
            this.InitializeComponent();
            var dbPath = Path.Combine(Windows.Storage.ApplicationData.Current.LocalFolder.Path, "exrin.db");

            LoadApplication(new HowFarApp.App(new Initializer(dbPath)));
        }
    }

    public class Initializer : IPlatformInitializer
    {
        private readonly string _path;

        public Initializer(string path)
        {
            _path = path;
        }
        public void RegisterTypes(IContainerRegistry containerRegistry)
        {
            containerRegistry.RegisterInstance<ILocationService>(new LocationService());
            containerRegistry.RegisterInstance<GetDbPath>(() => _path);

        }
    }
}
