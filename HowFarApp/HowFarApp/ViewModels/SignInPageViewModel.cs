using HowFarApp.Views;
using Prism.Commands;
using Prism.Navigation;
using Xamarin.Forms;

namespace HowFarApp.ViewModels
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
            NavigationService.NavigateAsync($"{nameof(NavigationPage)}/{nameof(MainMenuPage)}");
            //Application.Current.MainPage = new NavigationPage(_container.Resolve<MainMenuPage>());
            //Navigation.PushAsync(, true);
        }
    }
}