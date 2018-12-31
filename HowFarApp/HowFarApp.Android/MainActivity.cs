using System;
using System.IO;
using Android.App;
using Android.Content.PM;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using Android.OS;
using Plugin.Permissions;
using Android.Media;
using HowFarApp.Models;
using HowFarApp.Views;
using Prism;
using Prism.Ioc;
using Environment = System.Environment;

namespace HowFarApp.Droid
{
    [Activity(Label = "HowFarApp", Icon = "@mipmap/icon", Theme = "@style/MainTheme", MainLauncher = true, ConfigurationChanges = ConfigChanges.ScreenSize | ConfigChanges.Orientation)]
    public class MainActivity : global::Xamarin.Forms.Platform.Android.FormsAppCompatActivity
    {
        public override void OnRequestPermissionsResult(int requestCode, string[] permissions, [GeneratedEnum] Android.Content.PM.Permission[] grantResults)
        {
            Xamarin.Essentials.Platform.OnRequestPermissionsResult(requestCode, permissions, grantResults);
            PermissionsImplementation.Current.OnRequestPermissionsResult(requestCode, permissions, grantResults);
            base.OnRequestPermissionsResult(requestCode, permissions, grantResults);
        }

        protected override void OnCreate(Bundle savedInstanceState)
        {
            TabLayoutResource = Resource.Layout.Tabbar;
            ToolbarResource = Resource.Layout.Toolbar;

            base.OnCreate(savedInstanceState);
            Plugin.CurrentActivity.CrossCurrentActivity.Current.Init(this, savedInstanceState);
            Xamarin.Essentials.Platform.Init(this, savedInstanceState);

            Xamarin.Forms.Forms.Init(this, savedInstanceState);
            Xamarin.FormsGoogleMaps.Init(this, savedInstanceState);

            string dbPath = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.Personal),
                "ormdemo.db3");
          //  var dbPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Personal), "exrin.db");
            LoadApplication(new App(new Initializer(dbPath)));
            //StartPlayer("Assets/bensound-creativeminds.mp3");
        }
        //protected MediaPlayer player;
        //public void StartPlayer(String filepath)
        //{
        //    if (player == null)
        //    {
        //        player = new MediaPlayer();
        //    }
        //    else
        //    {
        //        player.Reset();
        //        player.SetDataSource(filepath);
        //        player.Prepare();
        //        player.Start();
        //    }
        //}
    }
    public class Initializer: IPlatformInitializer
    {
        private readonly string _path;

        public Initializer(string path)
        {
            _path = path;
        }
        public void RegisterTypes(IContainerRegistry containerRegistry)
        {
            containerRegistry.RegisterInstance<ILocationService>(new LocationService());
            containerRegistry.RegisterInstance<GetDbPath>(()=> _path);

        }
    }

    public class LocationService : ILocationService
    {
        public bool LocationEnabled => true;
    }
}