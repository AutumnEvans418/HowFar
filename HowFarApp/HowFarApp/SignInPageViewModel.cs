using HowFarApp.ViewModels;
using Prism.Commands;
using Prism.Navigation;

namespace HowFarApp
{
    public class SignInPageViewModel : ViewModelBase
    {
        public SignInPageViewModel(INavigationService navigationService) : base(navigationService)
        {
            SignInCommand = new DelegateCommand(NavigateToMainPage);
        }

        public DelegateCommand SignInCommand { get; set; }
        void NavigateToMainPage()
        {
            NavigationService.NavigateAsync("MainMenuPage", useModalNavigation:true);
            //Application.Current.MainPage = new NavigationPage(_container.Resolve<MainMenuPage>());
            //Navigation.PushAsync(, true);
        }
    }
}