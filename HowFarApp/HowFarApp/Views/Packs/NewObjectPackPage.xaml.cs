using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HowFar.Core.Models;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace HowFarApp.Views.Packs
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class NewObjectPackPage : ContentPage
    {
        private readonly IMeasureConverters _measureConverters;
        private ObjectPack _objectPack;

        public NewObjectPackPage(IMeasureConverters measureConverters)
        {
            _measureConverters = measureConverters;
            BindingContext = this;
            ObjectPack = new ObjectPack();
            InitializeComponent();
        }

        public ObjectPack ObjectPack
        {
            get => _objectPack;
            set
            {
                _objectPack = value;
                OnPropertyChanged();
            }
        }

        private async void ButtonNewObject(object sender, EventArgs e)
        {
            try
            {
                _measureConverters.NewPack(ObjectPack);
                await Navigation.PopAsync(true);
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                await DisplayAlert("ERROR", exception.Message, "OK");
                throw;
            }
        }

        private void ButtonPackImage(object sender, EventArgs e)
        {
            
        }
    }
}