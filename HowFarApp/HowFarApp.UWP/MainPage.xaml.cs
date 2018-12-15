using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Devices.Geolocation;
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

namespace HowFarApp.UWP
{
    public class LocationService : ILocationService
    {
        public bool LocationEnabled => new Geolocator().LocationStatus == PositionStatus.Ready;
    }

    public sealed partial class MainPage
    {
        public MainPage()
        {
            this.InitializeComponent();
            var dbPath = Path.Combine(Windows.Storage.ApplicationData.Current.LocalFolder.Path, "exrin.db");

            LoadApplication(new HowFarApp.App(dbPath, new LocationService()));
        }
    }
}
