using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HowFar.Core.Models;
using HowFarApp.ViewModels;
using Plugin.Permissions;
using Plugin.Permissions.Abstractions;
using Unity;
using Unity.Injection;
using Unity.Resolution;
using Xamarin.Essentials;
using Xamarin.Forms;
using Xamarin.Forms.GoogleMaps;
using Xamarin.Forms.Xaml;

namespace HowFarApp.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class MapPage : IMapPage
    {
        private readonly ILocationService _locationService;


        public MapPage(ILocationService locationService)
        {
            _locationService = locationService;
            //Converters = converters;
            InitializeComponent();
            //BindingContext = container.Resolve<MapPageViewModel>(new DependencyOverride(typeof(IMapPage), this));
            if (BindingContext is IMapPageViewModel map)
            {
                map.MapPage = this;
            }
            //if (locationService.LocationEnabled)
            //    GetPermissions();

        }

        private async Task GetPermissions()
        {
            if (CrossPermissions.IsSupported)
            {
                var perm = CrossPermissions.Current;
                var status = await perm.CheckPermissionStatusAsync(Permission.Location);
                if (status != PermissionStatus.Granted)
                {
                    var results = await perm.RequestPermissionsAsync(Permission.Location);
                    if (results.ContainsKey(Permission.Location))
                        status = results[Permission.Location];
                }

                if (status == PermissionStatus.Granted)
                {
                    try
                    {
                        Map.MyLocationEnabled = true;
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e);
                        throw;
                    }

                }
            }
        }


        public IList<Pin> Pins => Map.Pins;
        public IList<Polyline> Polylines => Map.Polylines;
        public async void MoveCamera()
        {
            try
            {
                if (_locationService.LocationEnabled)
                {
                    await GetPermissions();
                    var location = await Geolocation.GetLastKnownLocationAsync();
                    if (location != null)
                    {
                        Map.MoveToRegion(MapSpan.FromCenterAndRadius(new Position(location.Latitude, location.Longitude),
                            Distance.FromMiles(1)));
                    }
                  
                }
            }
            //catch (FeatureNotSupportedException fnsEx)
            //{
            //    // Handle not supported on device exception
            //}
            //catch (PermissionException pEx)
            //{
            //    // Handle permission exception
            //}
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                await DisplayAlert("Error", ex.Message, "Ok");
                // Unable to get location
            }
            
           // Map.MoveCamera(CameraUpdateFactory.NewCameraPosition(new CameraPosition(position, 3)));
        }

        private void Map_OnMapLongClicked(object sender, MapLongClickedEventArgs e)
        {
            if (BindingContext is MapPageViewModel vm)
            {
                vm.Map_OnMapLongClicked(e);
            }
        }
    }
}