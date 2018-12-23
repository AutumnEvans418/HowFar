using System.Collections.ObjectModel;
using HowFar.Core.Models;
using Prism.Commands;
using Prism.Navigation;

namespace HowFarApp.ViewModels
{
    public class ObjectPackDetailPageViewModel : ViewModelBase
    {
        private readonly IMeasureConverters _converters;
        private ObjectPack _pack;
        private ObservableCollection<ObjectMeasurement> _items;
        private ObjectMeasurement _selectedItem;

        public ObjectPack Pack
        {
            get => _pack;
            set => SetProperty(ref _pack,value);
        }

        public ObservableCollection<ObjectMeasurement> Items
        {
            get => _items;
            set => SetProperty(ref _items,value);
        }

        public ObjectMeasurement SelectedItem
        {
            get => _selectedItem;
            set => SetProperty(ref _selectedItem,value, () => SelectedItem = null);
        }

        public ObjectPackDetailPageViewModel(INavigationService navigationService, IMeasureConverters converters) : base(navigationService)
        {
            _converters = converters;
            Items = new ObservableCollection<ObjectMeasurement>();
            DeleteCommand = new DelegateCommand(ButtonDeletePack);
        }

        public DelegateCommand DeleteCommand { get; set; }
        private async void ButtonDeletePack()
        {
            _converters.DeletePack(Pack);
            await NavigationService.GoBackAsync();
        }

        //async void Handle_ItemTapped(object sender, ItemTappedEventArgs e)
        //{
        //    if (e.Item == null)
        //        return;

        //    //  await DisplayAlert("Item Tapped", "An item was tapped.", "OK");

        //    //Deselect Item
        //    ((ListView)sender).SelectedItem = null;
        //}

        public override void OnNavigatedTo(INavigationParameters parameters)
        {
            if (parameters["Pack"] is ObjectPack pack)
            {
                Pack = pack;
                Items = new ObservableCollection<ObjectMeasurement>(pack.ObjectMeasurements);

            }
            base.OnNavigatedTo(parameters);
        }
    }
}