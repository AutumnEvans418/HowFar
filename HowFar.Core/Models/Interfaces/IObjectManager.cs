using System.Collections.ObjectModel;
using System.ComponentModel;
using HowFar.Core.Models;

namespace HowFar.Core
{
    public interface IObjectManager : INotifyPropertyChanged
    {
        ObservableCollection<ObjectCompare> Comparisons { get; set; }
        IMeasureConverters MeasureConverters { get; }
        ObservableCollection<ObjectMeasurementViewModel> ObjectMeasurementViewModels { get; set; }
        ObjectMeasurementViewModel SelectedObject { get; set; }
        void DeSelectAll();
        void Refresh();
        void SelectAll();
    }
}