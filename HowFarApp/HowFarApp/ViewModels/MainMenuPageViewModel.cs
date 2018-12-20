using HowFar.Core;
using Prism.Navigation;

namespace HowFarApp.ViewModels
{
    public class ViewModelBase : BindableBase, INavigatedAware
    {
        public virtual void OnNavigatedFrom(INavigationParameters parameters)
        {
        }

        public virtual void OnNavigatedTo(INavigationParameters parameters)
        {
        }
    }
    public class MainMenuPageViewModel : ViewModelBase
    {
        
    }
}