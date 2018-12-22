using System;
using System.Collections.Generic;
using System.Text;
using FluentValidation;
using FluentValidation.Results;
using Unity;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace HowFarApp.Views
{

    public class NewObjectValidator : AbstractValidator<NewObjectPageViewModel>
    {
        public NewObjectValidator()
        {
            RuleFor(p => p.NameEntry).NotEmpty();
            RuleFor(p => p.MeasurementEntry).NotEmpty();
            RuleFor(p => p.PluralEntry).NotEmpty();
            RuleFor(p => p.SelectedObject).NotNull();
            RuleFor(p => p.SelectedObjectPack).NotNull();
        }
    }


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