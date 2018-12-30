using System;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using HowFar.Core.Annotations;
using HowFar.Core.Models;

namespace HowFar.Core
{
    public class BindableBase : INotifyPropertyChanged
    {
        public event PropertyChangedEventHandler PropertyChanged;

        public void SetProperty<T>(ref T property, T value, Action action = null, [CallerMemberName] string name = null)
        {
            if (property?.Equals(value) != true)
            {
                property = value;
                OnPropertyChanged(name);
                action?.Invoke();
            }

        }
        [NotifyPropertyChangedInvocator]
        protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }

    public class ObjectMeasurementViewModel : BindableBase
    {
        private readonly Action<ObjectMeasurementViewModel> _selectedChanged;
        private bool _selected;
        public ObjectMeasurement ObjectMeasurement { get; set; }

        public ObjectMeasurementViewModel(Action<ObjectMeasurementViewModel> selectedChanged)
        {
            _selectedChanged = selectedChanged;
        }
        public bool Selected
        {
            get => _selected;
            set => SetProperty(ref _selected, value, () => _selectedChanged(this));
        }


    }
    public class ObjectCompare
    {
        public ObjectMeasurement From { get; set; }
        public ObjectMeasurement To { get; set; }
        public double ToQty { get; set; }
        public string Result => $"A {From.SingleName} is {ToQty:N} {To.PluralName}";
        public override string ToString()
        {
            return Result;
        }
    }
    public class ObjectManager : BindableBase, IObjectManager
    {
        private ObservableCollection<ObjectMeasurementViewModel> _objectMeasurementViewModels;
        private ObservableCollection<ObjectCompare> _comparisons;
        public IMeasureConverters MeasureConverters { get; }

        public ObservableCollection<ObjectMeasurementViewModel> ObjectMeasurementViewModels
        {
            get => _objectMeasurementViewModels;
            set => SetProperty(ref _objectMeasurementViewModels, value);
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