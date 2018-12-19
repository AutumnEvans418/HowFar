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
using Xamarin.Forms;
using Xamarin.Forms.GoogleMaps;
using Xamarin.Forms.Xaml;

namespace HowFarApp.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class MapPage : IMapPage
    {
        

        public MapPage(IUnityContainer container, ILocationService locationService)
        {
            //Converters = converters;
            InitializeComponent();
            BindingContext = container.Resolve<MapPageViewModel>(new DependencyOverride(typeof(IMapPage), this));
            if (locationService.LocationEnabled)
                GetPermissions();

        }

        private async void GetPermissions()
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

        private void Map_OnMapLongClicked(object sender, MapLongClickedEventArgs e)
        {
            if (BindingContext is MapPageViewModel vm)
            {
                vm.Map_OnMapLongClicked(e);
            }
        }
    }
}