using System.Collections.ObjectModel;
using HowFar.Core.Models;

namespace HowFar.Core
{
    public interface IObjectManager
    {
        ObservableCollection<ObjectCompare> Comparisons { get; set; }
        IMeasureConverters MeasureConverters { get; }
        ObservableCollection<ObjectMeasurementViewModel> ObjectMeasurementViewModels { get; set; }

        void DeSelectAll();
        void Refresh();
        void SelectAll();
    }
}