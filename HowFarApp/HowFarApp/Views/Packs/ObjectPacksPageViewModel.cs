using System;
using System.Collections.ObjectModel;
using HowFar.Core.Models;
using HowFarApp.ViewModels;
using HowFarApp.Views.Packs;
using Prism.Commands;
using Prism.Navigation;
using Prism.Services;
using Unity;

namespace HowFarApp.Views
{
    public class ObjectPacksPageViewModel : ViewModelBase
    {

        private readonly IMeasureConverters _converters;
        private readonly IPageDialogService _dialogService;
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
        public ObjectPacksPageViewModel(INavigationService navigationService,
            IMeasureConverters converters, IUnityContainer container, IPageDialogService dialogService) : base(navigationService)
        {
            _converters = converters;
            _dialogService = dialogService;
            this.Objects = new ObservableCollection<ObjectPack>(converters.ObjectPacks);

        }

        public override void OnNavigatedTo(INavigationParameters parameters)
        {
            this.Objects = new ObservableCollection<ObjectPack>(_converters.ObjectPacks);

            base.OnNavigatedTo(parameters);
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
                    NavigationService.NavigateAsync(nameof(ObjectPackDetailPage), new NavigationParameters(){{"Pack", SelectedObjectPack}});
                }
            }
        }

        public DelegateCommand BuyPackCommand { get; set; }
        public DelegateCommand NewPackCommand { get; set; }
        private async void ImageButton_OnClicked(object sender, EventArgs e)
        {
            await _dialogService.DisplayAlertAsync ("Congrats!", "You now have a new package!", "Ok");
        }

        private async void ButtonNewObjectPack(object sender, EventArgs e)
        {
            await NavigationService.NavigateAsync(nameof(NewObjectPackPage));
        }
    }
}