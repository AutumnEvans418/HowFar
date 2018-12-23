using System;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using HowFar.Core.Models;
using Prism.Commands;
using Prism.Navigation;
using Xamarin.Forms;
using Xamarin.Forms.GoogleMaps;

namespace HowFarApp.ViewModels
{
    public class MapPageViewModel : ViewModelBase
    {
        private readonly IMapPage _mapPage;
        private ObjectMeasurement _selectedObject;
        private bool _top;
        private bool _bottom;
        private string _endEntry;
        private string _startEntry;
        private string _distanceEntry;
        private IMeasureConverters _converters;

        public MapPageViewModel(IMapPage mapPage, IMeasureConverters converters, INavigationService navigationService) : base(navigationService)
        {
            Converters = converters;
            _mapPage = mapPage;
            ResetCommand = new DelegateCommand(Reset_Clicked);
            GoCommand = new DelegateCommand(Go_Clicked);
            Top = true;
            //MapLongCommand = new DelegateCommand<object>(Map_OnMapLongClicked);
        }

        public IMeasureConverters Converters
        {
            get => _converters;
            set => SetProperty(ref _converters,value);
        }

        private double Distance(double lat1, double lon1, double lat2, double lon2, char unit)
        {
            double theta = lon1 - lon2;
            double dist = Math.Sin(Deg2Rad(lat1)) * Math.Sin(Deg2Rad(lat2)) + Math.Cos(Deg2Rad(lat1)) * Math.Cos(Deg2Rad(lat2)) * Math.Cos(Deg2Rad(theta));
            dist = Math.Acos(dist);
            dist = Rad2Deg(dist);
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
        private double Deg2Rad(double deg)
        {
            return (deg * Math.PI / 180.0);
        }

        private double Rad2Deg(double rad)
        {
            return (rad / Math.PI * 180.0);
        }
        public double CalculateDistances(Pin first, Pin second, ObjectMeasurement measurement)
        {
            var kilometers = Distance(first.Position.Latitude, first.Position.Longitude, second.Position.Latitude,
                second.Position.Longitude, 'K');
            return Converters.Convert("Kilometers", measurement.PluralName, kilometers);
        }
        public async Task<string> GetLocationFromAddress(Position position)
        {
            Geocoder coder = new Geocoder();
            try
            {
                var address = await coder.GetAddressesForPositionAsync(position);
                return address?.FirstOrDefault();
            }
            catch
            {
                return null;
            }
        }

        public string StartEntry
        {
            get => _startEntry;
            set => SetProperty(ref _startEntry, value);
        }

        public string EndEntry
        {
            get => _endEntry;
            set => SetProperty(ref _endEntry, value);
        }

        public bool Top
        {
            get => _top;
            set => SetProperty(ref _top, value);
        }

        public bool Bottom
        {
            get => _bottom;
            set => SetProperty(ref _bottom, value);
        }
        public string DistanceEntry
        {
            get => _distanceEntry;
            set => SetProperty(ref _distanceEntry,value);
        }

        public ObjectMeasurement SelectedObject
        {
            get => _selectedObject;
            set
            {
                _selectedObject = value;
                OnPropertyChanged();
                if (_selectedObject != null)
                {
                    if (_mapPage.Pins.Count >= 2)
                    {
                        var calc = CalculateDistances(_mapPage.Pins.First(), _mapPage.Pins.Last(), SelectedObject);
                        DistanceEntry = calc.ToString(CultureInfo.InvariantCulture);
                    }
                }
            }
        }


        public async void Map_OnMapLongClicked(MapLongClickedEventArgs e)
        {

                if (_mapPage.Pins.Count == 2)
                {
                    return;
                }
                _mapPage.Pins.Add(new Pin() { Position = e.Point, Label = $"Pin {_mapPage.Pins.Count + 1} ({e.Point.Longitude},{e.Point.Latitude})" });
                if (_mapPage.Pins.Count == 1)
                {
                    StartEntry = await GetLocationFromAddress(e.Point);

                }
                else if (_mapPage.Pins.Count == 2)
                {
                    EndEntry = await GetLocationFromAddress(e.Point);
                    var polyLine = new Polyline();
                    foreach (var mapPin in _mapPage.Pins)
                    {
                        polyLine.Positions.Add(mapPin.Position);
                    }

                    polyLine.StrokeWidth = 2;
                    polyLine.StrokeColor = Color.Red;
                    _mapPage.Polylines.Add(polyLine);
                }

        }

       // public DelegateCommand<object> MapLongCommand { get; set; }
        public DelegateCommand ResetCommand { get; set; }
        public DelegateCommand GoCommand { get; set; }

        private void Reset_Clicked()
        {
            _mapPage.Pins.Clear();
            _mapPage.Polylines.Clear();
            Top = true;
            Bottom = false;
            this.StartEntry = "";
            this.EndEntry = "";
        }


        private void Go_Clicked()
        {
            Top = false;
            Bottom = true;
            SelectedObject = Converters.Find("Mile");

        }
    }
}