using System;
using System.Collections.Generic;
using System.Text;
using FluentValidation.Results;
using Unity;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace HowFarApp.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class NewObjectPage : ContentPage
    {
        public NewObjectPage()
        {
            InitializeComponent();
            //BindingContext = container.Resolve<NewObjectPageViewModel>();
        }

    }
}