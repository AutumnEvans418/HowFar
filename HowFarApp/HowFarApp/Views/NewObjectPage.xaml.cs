using HowFar.Core.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace HowFarApp.Views
{
	[XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class NewObjectPage : ContentPage
	{
        private readonly IMeasureConverters measure;
	    private ObjectMeasurement _selectedObject;
	    private ObservableCollection<ObjectMeasurement> _objectMeasurements;

	    public NewObjectPage (IMeasureConverters measure)
		{
			InitializeComponent ();
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

	    void NewObject()
        {
           measure.NewObject(PluralEntry.Text, NameEntry.Text,double.Parse(MeasurementEntry.Text), SelectedObject);

        }

	    private void NewButton_OnClicked(object sender, EventArgs e)
	    {
	        NewObject();
	        Navigation.PopAsync(true);
	    }
	}
}