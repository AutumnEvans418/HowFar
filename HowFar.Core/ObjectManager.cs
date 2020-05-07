using System.Collections.ObjectModel;
using System.Linq;
using HowFar.Core.Models;

namespace HowFar.Core
{
    public class ObjectManager : BindableBase, IObjectManager
    {
        private ObservableCollection<ObjectMeasurementViewModel> _objectMeasurementViewModels;
        private ObservableCollection<ObjectCompare> _comparisons;
        private ObjectMeasurementViewModel _selectedObject;
        public IMeasureConverters MeasureConverters { get; }

        public ObservableCollection<ObjectMeasurementViewModel> ObjectMeasurementViewModels
        {
            get => _objectMeasurementViewModels;
            set => SetProperty(ref _objectMeasurementViewModels, value);
        }

        public ObjectMeasurementViewModel SelectedObject
        {
            get => _selectedObject;
            set => SetProperty(ref _selectedObject,value);
        }

        public ObjectManager(IMeasureConverters measureConverters)
        {
            MeasureConverters = measureConverters;
            Refresh();
        }

        public ObservableCollection<ObjectCompare> Comparisons
        {
            get => _comparisons;
            set => SetProperty(ref _comparisons, value);
        }

        private void SelectionChanged(ObjectMeasurementViewModel obj)
        {
            Comparisons.Clear();
            var centimeters = MeasureConverters.Centimeter;
            var selected = ObjectMeasurementViewModels.Where(p => p.Selected).OrderBy(p => MeasureConverters.Convert(p.ObjectMeasurement, centimeters)).ToList();
            if (selected.Count >= 2)
            {
                for (var i = 0; i < selected.Count; i++)
                {
                    if (i + 1 < selected.Count)
                    {
                        var from = selected[i + 1];
                        var to = selected[i];
                        Comparisons.Add(new ObjectCompare() { From = from.ObjectMeasurement, To = to.ObjectMeasurement, ToQty = MeasureConverters.Convert(from.ObjectMeasurement, to.ObjectMeasurement) });
                    }
                }
            }
        }


        public void Refresh()
        {
            ObjectMeasurementViewModels =
                new ObservableCollection<ObjectMeasurementViewModel>(MeasureConverters.ObjectMeasurements
                    .Select(p => new ObjectMeasurementViewModel(SelectionChanged) { ObjectMeasurement = p }));
            Comparisons = new ObservableCollection<ObjectCompare>();
        }

        public void SelectAll()
        {
            foreach (var objectMeasurementViewModel in ObjectMeasurementViewModels)
            {
                objectMeasurementViewModel.Selected = true;
            }
        }

        public void DeSelectAll()
        {
            foreach (var objectMeasurementViewModel in ObjectMeasurementViewModels)
            {
                objectMeasurementViewModel.Selected = false;
            }
        }
    }
}