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
}