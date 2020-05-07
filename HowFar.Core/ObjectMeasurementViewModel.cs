using System;
using HowFar.Core.Models;

namespace HowFar.Core
{
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
}