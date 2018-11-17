using HowFarApp.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Unity;
using Xamarin.Forms;

namespace HowFarApp
{
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
            
            Navigation.PushAsync(_container.Resolve<MainMenuPage>(), true);
        }

        private void Button_OnClicked(object sender, EventArgs e)
        {
            NavigateToMainPage();
        }
    }
}
