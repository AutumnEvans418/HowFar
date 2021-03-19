using System;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using HowFar.Core.Models;
using HowFarApp.Models;
using Prism.Commands;
using Prism.Navigation;
using Xamarin.Essentials;
using Xamarin.Forms;
using Xamarin.Forms.GoogleMaps;

namespace HowFarApp.ViewModels
{
    public class MapPageViewModel : ViewModelBase, IMapPageViewModel
    {
        private readonly IGeocoder _geocoder;
        private ObjectMeasurement _selectedObject;
        private bool _top;
        private bool _bottom;
        private string _endEntry;
        private string _startEntry;
        private string _distanceEntry;
        private IMeasureConverters _converters;

        public MapPageViewModel(
            IMeasureConverters converters,
            INavigationService navigationService, 
            IGeocoder geocoder)
            : base(navigationService)
        {
            _geocoder = geocoder;
            Converters = converters;
            ResetCommand = new DelegateCommand(Reset_Clicked);
            GoCommand = new DelegateCommand(Go_Clicked);
            Top = true;
            //MapLongCommand = new DelegateCommand<object>(Map_OnMapLongClicked);
        }

        public override async void OnNavigatedTo(INavigationParameters parameters)
        {
            if (MapPage != null)
            {
                MapPage.MoveCamera();
            }
            base.OnNavigatedTo(parameters);
        }

        public IMeasureConverters Converters
        {
            get => _converters;
            set => SetProperty(ref _converters, value);
        }

        
        public double CalculateDistances(Pin first, Pin second, ObjectMeasurement measurement)
        {
            var kilometers = MeasureMath.Distance(
                first.Position.Latitude, 
                first.Position.Longitude, 
                second.Position.Latitude,
                second.Position.Longitude, 
                'K');
            return Converters.Convert("Kilometers", measurement.PluralName, kilometers);
        }
        public async Task<string> GetLocationFromAddress(Position position)
        {
            try
            {
                IsBusy = true;
                var address = await _geocoder.GetAddressesForPositionAsync(position);
                return address?.FirstOrDefault();
            }
            catch
            {
                return null;
            }
            finally
            {
                IsBusy = false;
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
            set => SetProperty(ref _distanceEntry, value);
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
                    if (MapPage.Pins.Count >= 2)
                    {
                        var calc = CalculateDistances(MapPage.Pins.First(), MapPage.Pins.Last(), SelectedObject);
                        DistanceEntry = calc.ToString(CultureInfo.InvariantCulture);
                    }
                }
            }
        }


        public async void Map_OnMapLongClicked(Position e)
        {

            if (MapPage.Pins.Count == 2)
            {
                return;
            }
            MapPage.Pins.Add(new Pin() { Position = e, Label = $"Pin {MapPage.Pins.Count + 1} ({e.Longitude},{e.Latitude})" });
            if (MapPage.Pins.Count == 1)
            {
                StartEntry = await GetLocationFromAddress(e);

            }
            else if (MapPage.Pins.Count == 2)
            {
                EndEntry = await GetLocationFromAddress(e);
                var polyLine = new Polyline();
                foreach (var mapPin in MapPage.Pins)
                {
                    polyLine.Positions.Add(mapPin.Position);
                }

                polyLine.StrokeWidth = 2;
                polyLine.StrokeColor = Color.Red;
                MapPage.Polylines.Add(polyLine);
            }

        }

        // public DelegateCommand<object> MapLongCommand { get; set; }
        public DelegateCommand ResetCommand { get; set; }
        public DelegateCommand GoCommand { get; set; }

        private void Reset_Clicked()
        {
            MapPage.Pins.Clear();
            MapPage.Polylines.Clear();
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

        public IMapPage MapPage { get; set; }
    }
}