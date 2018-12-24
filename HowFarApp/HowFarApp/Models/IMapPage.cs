using System.Collections.Generic;
using Xamarin.Forms.GoogleMaps;

namespace HowFarApp.Models
{
    public interface IMapPage
    {
        IList<Pin> Pins { get; }
        IList<Polyline> Polylines { get; }
        void MoveCamera();
    }
}