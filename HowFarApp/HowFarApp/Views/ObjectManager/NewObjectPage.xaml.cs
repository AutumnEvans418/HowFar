using HowFar.Core.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using FluentValidation.Results;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace HowFarApp.Views
{
    public static class Ext
    {
        public static async Task DisplayError(FluentValidation.Results.ValidationResult result, Page page)
        {
            var errors = result.Errors.Select(p => p.ErrorMessage).Aggregate(String.Empty, (f, s) => f + Environment.NewLine + s);
            await page.DisplayAlert("ERROR", errors, "Ok");
        }
    }

    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class NewObjectPage : ContentPage
    {

        public class NewObjectValidator : AbstractValidator<NewObjectPage>
        {
            public NewObjectValidator()
            {
                RuleFor(p => p.NameEntry.Text).NotEmpty();
                RuleFor(p => p.MeasurementEntry.Text).Must(p => int.TryParse(p, out var t));
                RuleFor(p => p.PluralEntry.Text).NotEmpty();
                RuleFor(p => p.SelectedObject).NotNull();
            }
        }

        private readonly IMeasureConverters measure;
        private ObjectMeasurement _selectedObject;
        private ObservableCollection<ObjectMeasurement> _objectMeasurements;

        public NewObjectPage(IMeasureConverters measure)
        {
            InitializeComponent();
            BindingContext = this;
            ObjectMeasurements = measure.ObjectMeasurements;
            this.measure = measure;
            NewButton.IsEnabled = false;
        }

        public ObservableCollection<ObjectMeasurement> ObjectMeasurements
        {
            get => _objectMeasurements;
            set
            {
                _objectMeasurements = value;
                OnPropertyChanged();
            }
        }

        public ObjectMeasurement SelectedObject
        {
            get => _selectedObject;
            set
            {
                _selectedObject = value;
                OnPropertyChanged();
                if (_selectedObject != null)
                {
                    NewButton.IsEnabled = true;
                }
            }
        }

        async Task<bool> NewObject()
        {

            var validator = new NewObjectValidator();
            var result = validator.Validate(this);
            if (result.IsValid)
            {
                measure.NewObject(PluralEntry.Text, NameEntry.Text, double.Parse(MeasurementEntry.Text), SelectedObject);
                return true;
            }
            else
            {
                await Ext.DisplayError(result, this);
                return false;
            }

        }

       

        private async void NewButton_OnClicked(object sender, EventArgs e)
        {
            if (await NewObject())
               await Navigation.PopAsync(true);
        }
    }
}