using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using HowFar.Core.Models;
using HowFarApp.ViewModels;
using Unity;
using Unity.Resolution;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace HowFarApp.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class QuizesPage : ContentPage
    {

        public QuizesPage()
        {
            InitializeComponent();
            //BindingContext = container.Resolve<QuizesPageViewModel>();
        }
        
       
    }
}