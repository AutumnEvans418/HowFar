using HowFar.Core.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Unity;
using Unity.Resolution;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace HowFarApp.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class ObjectPacksPage : ContentPage
    {
        private readonly IUnityContainer _container;
        private ObjectPack _selectedObjectPack;
        private ObservableCollection<ObjectPack> _objects;

        public ObservableCollection<ObjectPack> Objects
        {
            get => _objects;
            set
            {
                _objects = value; 
                OnPropertyChanged();
            }
        }

        public ObjectPack SelectedObjectPack
        {
            get => _selectedObjectPack;
            set
            {
                _selectedObjectPack = value;
                OnPropertyChanged();

                if (_selectedObjectPack != null)
                {
                    Navigation.PushAsync(_container.Resolve<ObjectPackDetail>(new DependencyOverride(typeof(ObjectPack), SelectedObjectPack)));
                }
            }
        }

        public ObjectPacksPage(IMeasureConverters converters, IUnityContainer container)
        {
            _container = container;
            InitializeComponent();
            BindingContext = this;

            this.Objects = new ObservableCollection<ObjectPack>(converters.ObjectPacks);

          //  this.ObjectPacksList.ItemsSource = this.Objects;
        }


        private async void ImageButton_OnClicked(object sender, EventArgs e)
        {
            await DisplayAlert("Congrats!", "You now have a new package!", "Ok");
        }
    }
}