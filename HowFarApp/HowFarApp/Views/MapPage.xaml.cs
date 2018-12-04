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
        private ObjectMeasurement _selectedObject;

        public IMeasureConverters Converters { get; set; }
        public ObjectMeasurement SelectedObject
        {
            get => _selectedObject;
            set
            {
                _selectedObject = value;
                OnPropertyChanged();
                if (_selectedObject != null)
                {
                    var calc = CalculateDistances(Map.Pins.First(), Map.Pins.Last(), SelectedObject);
                    DistanceEntry.Text = calc.ToString();


                }
            }
        }

        public MapPage(IMeasureConverters converters)
        {
            Converters = converters;
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
        private async void Map_OnMapLongClicked(object sender, MapLongClickedEventArgs e)
        {
            if (Map.Pins.Count == 2)
            {
                return;
            }
            Map.Pins.Add(new Pin() { Position = e.Point, Label = $"Pin {Map.Pins.Count + 1} ({e.Point.Longitude},{e.Point.Latitude})" });
            if (Map.Pins.Count == 1)
            {
                StartEntry.Text = await GetLocationFromAddress(e.Point);

            }
            else if (Map.Pins.Count==2)
            {
                EndEntry.Text = await GetLocationFromAddress(e.Point);
            }

        }

        public double CalculateDistances(Pin first, Pin second, ObjectMeasurement measurement)
        {
            var kilometers = distance(first.Position.Latitude, first.Position.Longitude, second.Position.Latitude,
                second.Position.Longitude, 'K');
            return Converters.Convert("Kilometers", measurement.PluralName, kilometers);
        }
        public async Task<string> GetLocationFromAddress(Position position)
        {
            Geocoder coder = new Geocoder();
            try
            {
                var address = await coder.GetAddressesForPositionAsync(position);
                if (address == null)
                {
                    return null;
                }
                return address.FirstOrDefault();
            }
            catch
            {
                return null;
            }
        }

        private void Reset_Clicked(object sender, EventArgs e)
        {
            Map.Pins.Clear();
            Top.IsVisible = true;
            Bottom.IsVisible = false;

        }

        private void Go_Clicked(object sender, EventArgs e)
        {
            Top.IsVisible = false;
            Bottom.IsVisible = true;
            SelectedObject = Converters.Find("Mile");
       
        }
    }
}