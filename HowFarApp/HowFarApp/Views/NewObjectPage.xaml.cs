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
        private readonly MeasureConverters measure;

        public NewObjectPage (MeasureConverters measure)
		{
			InitializeComponent ();
            ObjectMeasurements = measure.ObjectMeasurements;
            this.measure = measure;
        }
        public ObservableCollection<ObjectMeasurement> ObjectMeasurements { get; set; }

        public ObjectMeasurement SelectedObject { get; set; }
        void NewObject()
        {
           measure.NewObject(PluralEntry.Text, NameEntry.Text, MeasurementEntry, SelectedObject, SelectedObject.Measurement);

        }
	}
}