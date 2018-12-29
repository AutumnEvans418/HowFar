using System.Collections.Generic;
using System.Threading.Tasks;
using Xamarin.Forms.GoogleMaps;

namespace HowFarApp.ViewModels
{
    public class GeocoderModel : IGeocoder
    {
        public GeocoderModel()
        {
            _geocoder = new Geocoder();
        }
        private readonly Geocoder _geocoder;
        public Task<IEnumerable<string>> GetAddressesForPositionAsync(Position position)
        {
            return _geocoder.GetAddressesForPositionAsync(position);
        }
    }
    public interface IGeocoder
    {
        Task<IEnumerable<string>> GetAddressesForPositionAsync(Position position);
    }
}