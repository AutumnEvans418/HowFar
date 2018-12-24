using System.Collections.Generic;
using System.Threading.Tasks;
using Xamarin.Forms.GoogleMaps;

namespace HowFarApp.ViewModels
{
    public class GeocoderModel : IGeocoder
    {
        private Geocoder geocoder;
        public Task<IEnumerable<string>> GetAddressesForPositionAsync(Position position)
        {
            return geocoder.GetAddressesForPositionAsync(position);
        }
    }
    public interface IGeocoder
    {
        Task<IEnumerable<string>> GetAddressesForPositionAsync(Position position);
    }
}