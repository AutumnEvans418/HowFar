using HowFar.Core;
using Prism.Navigation;

namespace HowFarApp.ViewModels
{
    public class ViewModelBase : BindableBase, INavigatedAware
    {
        public INavigationService NavigationService { get; }

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
    public class MainMenuPageViewModel : ViewModelBase
    {
        public MainMenuPageViewModel(INavigationService navigationService) : base(navigationService)
        {
        }
    }
}