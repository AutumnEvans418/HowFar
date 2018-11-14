using HowFarApp.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace HowFarApp
{
    public partial class SignInPage : ContentPage
    {
        private readonly HowFar.Core.Models.MeasureConverters measures;

        public SignInPage(HowFar.Core.Models.MeasureConverters measures)
        {
            InitializeComponent();
            this.measures = measures;
        }


        void NavigateToMainPage()
        {
            Navigation.PushAsync(new MainMenuPage(measures));
        }
    }
}
