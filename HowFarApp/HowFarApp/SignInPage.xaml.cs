using HowFarApp.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HowFarApp.ViewModels;
using Prism.Navigation;
using Unity;
using Xamarin.Forms;

namespace HowFarApp
{
    public class SignInPageViewModel : ViewModelBase
    {
        public SignInPageViewModel(INavigationService navigationService) : base(navigationService)
        {
        }
    }
    public partial class SignInPage : ContentPage
    {
        private readonly IUnityContainer _container;

        public SignInPage(IUnityContainer container)
        {
            _container = container;
            InitializeComponent();
        }


        void NavigateToMainPage()
        {
            Application.Current.MainPage = new NavigationPage(_container.Resolve<MainMenuPage>());
            //Navigation.PushAsync(, true);
        }

        private void Button_OnClicked(object sender, EventArgs e)
        {
            NavigateToMainPage();
        }
    }
}
