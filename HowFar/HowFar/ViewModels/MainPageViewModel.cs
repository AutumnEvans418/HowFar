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

        public MeasureConverters MeasureConverters
        {
            get => _measureConverters;
            set => SetProperty(ref _measureConverters,value);
        }

        public MainPageViewModel(INavigationService navigationService) 
            : base (navigationService)
        {
            Title = "Main Page";
            MeasureConverters = new MeasureConverters();
        }
    }
}
