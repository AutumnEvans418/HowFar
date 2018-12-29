using HowFar.Core;
using Prism.Navigation;

namespace HowFarApp.ViewModels
{
    public class ViewModelBase : BindableBase, INavigatedAware
    {
        private bool _isBusy;
        public INavigationService NavigationService { get; }

        public bool IsBusy
        {
            get => _isBusy;
            set => SetProperty(ref _isBusy,value);
        }

        public ViewModelBase(INavigationService navigationService)
        {
            NavigationService = navigationService;
        }
        public virtual void OnNavigatedFrom(INavigationParameters parameters)
        {
        }

        public virtual void OnNavigatedTo(INavigationParameters parameters)
        {
        }
    }
}