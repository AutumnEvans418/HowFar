using HowFar.Core.Models;
using System;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

[assembly: XamlCompilation(XamlCompilationOptions.Compile)]
namespace HowFarApp
{
    public partial class App : Application, IApp
    {
        public App()
        {
            InitializeComponent();
            var measures = new MeasureConverters(this);
            MainPage = new SignInPage(measures);
        }

        protected override void OnStart()
        {
            // Handle when your app starts
        }

        protected override void OnSleep()
        {
            // Handle when your app sleeps
        }

        protected override void OnResume()
        {
            // Handle when your app resumes
        }
    }
}
