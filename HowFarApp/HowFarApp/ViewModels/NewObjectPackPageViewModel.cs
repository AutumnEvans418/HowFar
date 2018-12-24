using System;
using HowFar.Core.Models;
using Prism.Commands;
using Prism.Navigation;
using Prism.Services;

namespace HowFarApp.ViewModels
{
    public class NewObjectPackPageViewModel : ViewModelBase
    {

        private readonly IMeasureConverters _measureConverters;
        private readonly IPageDialogService _dialogService;
        private ObjectPack _objectPack;
        public NewObjectPackPageViewModel(INavigationService navigationService, 
            IMeasureConverters measureConverters, IPageDialogService dialogService) : base(navigationService)
        {
            _measureConverters = measureConverters;
            _dialogService = dialogService;
            ObjectPack = new ObjectPack();
            NewCommand = new DelegateCommand(ButtonNewObject);
            BuyCommand = new DelegateCommand(ButtonPackImage);
        }

        public DelegateCommand NewCommand { get; set; }
        public DelegateCommand BuyCommand { get; set; }
        public ObjectPack ObjectPack
        {
            get => _objectPack;
            set
            {
                _objectPack = value;
                OnPropertyChanged();
            }
        }

        private async void ButtonNewObject()
        {
            try
            {
                _measureConverters.NewPack(ObjectPack);
                await NavigationService.GoBackAsync();
            }
            catch (Exception exception)
            {
                Console.WriteLine(exception);
                await _dialogService.DisplayAlertAsync ("ERROR", exception.Message, "OK");
                throw;
            }
        }

        private async void ButtonPackImage()
        {
            await _dialogService.DisplayAlertAsync("Congrats!", "You now have a new package!", "Ok");
        }
    }
}