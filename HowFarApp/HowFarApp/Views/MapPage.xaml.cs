using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HowFar.Core.Models;
using Xamarin.Forms;
using Xamarin.Forms.Maps;
using Xamarin.Forms.Xaml;

namespace HowFarApp.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class MapPage : ContentPage
    {
        private readonly IMeasureConverters _converters;

        public MapPage(IMeasureConverters converters)
        {
            _converters = converters;
            InitializeComponent();
            BindingContext = this;
            
            
        }
    }
}