using Prism.Commands;
using Prism.Mvvm;
using Prism.Navigation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using HowFar.Models;

namespace HowFar.ViewModels
{
    public class MainPageViewModel : ViewModelBase
    {
        private MeasureConverters _measureConverters;
        private string _createName;
        private ObjectMeasurement _createUnits;
        private double _createValue;
        private ObjectMeasurement _selectedFrom;
        private ObjectMeasurement _selectedTo;
        private double _convertResult;
        private double _fromValue;

        public MeasureConverters MeasureConverters
        {
            get => _measureConverters;
            set => SetProperty(ref _measureConverters,value);
        }

        public MainPageViewModel(INavigationService navigationService, IApp app) 
            : base (navigationService)
        {
            Title = "Main Page";
            MeasureConverters = new MeasureConverters(app);
            CreateCommand = new DelegateCommand(() => MeasureConverters.NewObject(CreateName, "", CreateValue, CreateUnits.PluralName), () => CreateUnits != null);
            CreateCommand.ObservesProperty(() => CreateUnits);
            FromValue = 1;
        }

        public ObjectMeasurement SelectedFrom
        {
            get => _selectedFrom;
            set => SetProperty(ref _selectedFrom,value, ConvertAction);
        }

        public double ConvertResult
        {
            get => _convertResult;
            set => SetProperty(ref _convertResult,value);
        }

        public double FromValue
        {
            get => _fromValue;
            set => SetProperty(ref _fromValue,value, ConvertAction);
        }

        private void ConvertAction()
        {
            if (SelectedFrom != null && SelectedTo != null)
            {
                ConvertResult = MeasureConverters.Convert(SelectedFrom.PluralName, SelectedTo.PluralName, FromValue);
            }
        }

        public ObjectMeasurement SelectedTo
        {
            get => _selectedTo;
            set => SetProperty(ref _selectedTo,value, ConvertAction);
        }

        public double CreateValue
        {
            get => _createValue;
            set => SetProperty(ref _createValue,value);
        }

        public ObjectMeasurement CreateUnits
        {
            get => _createUnits;
            set => SetProperty(ref _createUnits,value);
        }

        public string CreateName
        {
            get => _createName;
            set => SetProperty(ref _createName,value);
        }

        public DelegateCommand CreateCommand { get; set; }
    }
}
