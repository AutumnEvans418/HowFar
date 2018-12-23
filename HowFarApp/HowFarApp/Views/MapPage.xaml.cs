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

    //// Xamarin.Forms.OnPlatform<T>
    //using System;
    //using System.Collections.Generic;
    //using Xamarin.Forms;
    //using Xamarin.Forms.Xaml;

    ///// <typeparam name="T">To be added.</typeparam>
    ///// <summary>Provides the platform-specific implementation of T for the current <see cref="P:Xamarin.Forms.Device.OS" />.</summary>
    ///// <remarks>To be added.</remarks>
    //[ContentProperty("Platforms")]
    //public class OnPlatform<T>
    //{
    //    private bool useLegacyFallback;

    //    private T android;

    //    private T ios;

    //    private T winPhone;

    //    private bool hasDefault;

    //    private T @default;


    //    /// <summary>The type as it is implemented on the Android platform.</summary>
    //    /// <value>To be added.</value>
    //    /// <remarks>To be added.</remarks>
    //    [Obsolete]
    //    public T Android
    //    {
    //        get
    //        {
    //            return android;
    //        }
    //        set
    //        {
    //            useLegacyFallback = true;
    //            android = value;
    //        }
    //    }

    //    /// <summary>Gets or sets the type as it is implemented on the iOS platform.</summary>
    //    /// <value>The type as it is implemented on the iOS platform.</value>
    //    /// <remarks>To be added.</remarks>
    //    [Obsolete]
    //    public T iOS
    //    {
    //        get
    //        {
    //            return ios;
    //        }
    //        set
    //        {
    //            useLegacyFallback = true;
    //            ios = value;
    //        }
    //    }

    //    /// <summary>The type as it is implemented on the WinPhone platform.</summary>
    //    /// <value>To be added.</value>
    //    /// <remarks>To be added.</remarks>
    //    [Obsolete]
    //    public T WinPhone
    //    {
    //        get
    //        {
    //            return winPhone;
    //        }
    //        set
    //        {
    //            useLegacyFallback = true;
    //            winPhone = value;
    //        }
    //    }

    //    /// <summary>Gets or sets the default value to use for the platform.</summary>
    //    /// <value>The default value to use for the platform.</value>
    //    /// <remarks>To be added.</remarks>
    //    public T Default
    //    {
    //        get
    //        {
    //            return @default;
    //        }
    //        set
    //        {
    //            hasDefault = true;
    //            @default = value;
    //        }
    //    }

    //    /// <summary>Gets a list of the available platforms.</summary>
    //    /// <value>To be added.</value>
    //    /// <remarks>To be added.</remarks>
    //    public IList<On> Platforms
    //    {
    //        get;
    //        private set;
    //    }

    //    public OnPlatform()
    //    {
    //        Platforms = new List<On>();
    //    }

    //    public static implicit operator T(OnPlatform<T> onPlatform)
    //    {
    //        foreach (On platform in onPlatform.Platforms)
    //        {
    //            if (platform.Platform != null && platform.Platform.Contains(Device.RuntimePlatform) && s_valueConverter != null)
    //            {
    //                return (T)s_valueConverter.Convert(platform.Value, typeof(T), null, null);
    //            }
    //        }
    //        if (!onPlatform.useLegacyFallback)
    //        {
    //            if (!onPlatform.hasDefault)
    //            {
    //                return default(T);
    //            }
    //            return onPlatform.@default;
    //        }
    //        return Device.OnPlatform<T>(onPlatform.iOS, onPlatform.Android, onPlatform.WinPhone);
    //    }
    //}


    //public class OnOrientation<T> : View
    //{
    //    public T Portrait { get; set; }

    //    public T Landscape { get; set; }

    //    public OnOrientation()
    //    {
           
    //    }

        

    //    public static implicit operator T(OnOrientation<T> orientation)
    //    {

    //        if (App.Current.MainPage.Width > App.Current.MainPage.Height)
    //        {
    //            return orientation.Landscape;
    //        }
    //        else
    //        {
    //            return orientation.Portrait;
    //        }
    //    }
    //}

    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class MapPage : IMapPage
    {
        private readonly ILocationService _locationService;


        public MapPage(ILocationService locationService)
        {
            //OnPlatform<>
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

        protected override void OnSizeAllocated(double width, double height)
        {
            if (App.Current.MainPage.Width > App.Current.MainPage.Height)
            {
                ColumnDefinition.Width = new GridLength(1, GridUnitType.Star);
            }
            else
            {
                ColumnDefinition.Width = new GridLength(0);
            }
            base.OnSizeAllocated(width, height);
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