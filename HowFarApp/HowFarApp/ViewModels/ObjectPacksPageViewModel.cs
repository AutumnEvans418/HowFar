using System.Collections.ObjectModel;
using System.Linq;
using HowFar.Core.Models;
using HowFarApp.Views;
using Prism.Commands;
using Prism.Mvvm;
using Prism.Navigation;
using Prism.Services;
using Unity;

namespace HowFarApp.ViewModels
{
    public class ObjectPackViewModel : BindableBase
    {
        public ObjectPack ObjectPack { get; set; }
        public DelegateCommand BuyPackCommand { get; set; }

        public static implicit operator ObjectPack(ObjectPackViewModel vm)
        {
            return vm.ObjectPack;
        }
    }

    public class ObjectPacksPageViewModel : ViewModelBase
    {

        private readonly IMeasureConverters _converters;
        private readonly IPageDialogService _dialogService;
        private ObjectPackViewModel _selectedObjectPack;
        private ObservableCollection<ObjectPackViewModel> _objects;

        public ObservableCollection<ObjectPackViewModel> Objects
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
            BuyPackCommand = new DelegateCommand(ImageButton_OnClicked);
            NewPackCommand = new DelegateCommand(ButtonNewObjectPack);
            this.Objects = new ObservableCollection<ObjectPackViewModel>(converters.ObjectPacks.Select(p=>new ObjectPackViewModel(){ObjectPack = p, BuyPackCommand = BuyPackCommand}));
           
        }

        public override void OnNavigatedTo(INavigationParameters parameters)
        {
            //this.Objects = new ObservableCollection<ObjectPackViewModel>(_converters.ObjectPacks);
            this.Objects = new ObservableCollection<ObjectPackViewModel>(_converters.ObjectPacks.Select(p => new ObjectPackViewModel() { ObjectPack = p, BuyPackCommand = BuyPackCommand }));

            base.OnNavigatedTo(parameters);
        }

        public ObjectPackViewModel SelectedObjectPack
        {
            get => _selectedObjectPack;
            set
            {
                _selectedObjectPack = value;
                OnPropertyChanged();

                if (_selectedObjectPack != null)
                {
                    NavigationService.NavigateAsync(nameof(ObjectPackDetailPage), new NavigationParameters(){{"Pack", SelectedObjectPack.ObjectPack}});
                }
            }
        }

        public DelegateCommand BuyPackCommand { get; set; }
        public DelegateCommand NewPackCommand { get; set; }
        private async void ImageButton_OnClicked()
        {
            await _dialogService.DisplayAlertAsync ("Congrats!", "You now have a new package!", "Ok");
        }

        private async void ButtonNewObjectPack()
        {
            await NavigationService.NavigateAsync(nameof(NewObjectPackPage));
        }
    }
}