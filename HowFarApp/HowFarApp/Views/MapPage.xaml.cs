using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HowFar.Core.Models;
using Xamarin.Forms;
using Xamarin.Forms.GoogleMaps;
using Xamarin.Forms.Xaml;

namespace HowFarApp.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class MapPage : ContentPage
    {
        private readonly IMeasureConverters _converters;

        public MapPage(IMeasureConverters converters)
        {
            _converters = converters;
            InitializeComponent();
            BindingContext = this;
            
            
        }
        private double distance(double lat1, double lon1, double lat2, double lon2, char unit)
        {
            double theta = lon1 - lon2;
            double dist = Math.Sin(deg2rad(lat1)) * Math.Sin(deg2rad(lat2)) + Math.Cos(deg2rad(lat1)) * Math.Cos(deg2rad(lat2)) * Math.Cos(deg2rad(theta));
            dist = Math.Acos(dist);
            dist = rad2deg(dist);
            dist = dist * 60 * 1.1515;
            if (unit == 'K')
            {
                dist = dist * 1.609344;
            }
            else if (unit == 'N')
            {
                dist = dist * 0.8684;
            }
            return (dist);
        }

        private double deg2rad(double deg)
        {
            return (deg * Math.PI / 180.0);
        }

        private double rad2deg(double rad)
        {
            return (rad / Math.PI * 180.0);
        }
        private void Map_OnMapLongClicked(object sender, MapLongClickedEventArgs e)
        {
            Map.Pins.Add(new Pin(){Position = e.Point, Label = $"Pin {Map.Pins.Count +1} ({e.Point.Longitude},{e.Point.Latitude})"});

            if (Map.Pins.Count % 2 == 0)
            {
            }
            
        }

        private double CalculateDistances(Pin first, Pin second, ObjectMeasurement measurement)
        {
            var kilometers = distance(first.Position.Latitude, first.Position.Longitude, second.Position.Latitude,
                second.Position.Longitude, 'K');
            return _converters.Convert("Kilometers", measurement.PluralName, kilometers);
        }
    }
}