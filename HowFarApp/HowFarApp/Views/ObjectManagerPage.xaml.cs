using HowFar.Core.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HowFar.Core;
using Unity;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace HowFarApp.Views
{
	[XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class ObjectManagerPage : ContentPage
    {
        public ObjectManager Manager { get; }
        private readonly IMeasureConverters _converter;
        private readonly IUnityContainer _container;
        private ObjectMeasurement _toObject;
        private  ObjectMeasurement _fromObject;
        private double _convertResult;
        private double _fromQty;
        private ObservableCollection<ObjectMeasurement> _objects;

        public ObservableCollection<ObjectMeasurement> Objects
        {
            get => _objects;
            set
            {
                _objects = value;
                OnPropertyChanged();
            }
        }

        public ObjectMeasurement ToObject
        {
            get => _toObject;
            set
            {
                _toObject = value;
                OnPropertyChanged();
                Convert();
            }
        }

        void Convert()
        {
            if (ToObject != null && FromObject != null)
            {
                var result = _converter.Convert(FromObject, ToObject, FromQty);
                ConvertResult = result;
            }
        }
        public ObjectMeasurement FromObject
        {
            get { return _fromObject; }
            set
            {
                _fromObject = value;
                OnPropertyChanged();
                Convert();
            }
        }

        public double ConvertResult
        {
            get => _convertResult;
            set
            {
                _convertResult = value;
                OnPropertyChanged();
            }
        }

        public double FromQty
        {
            get => _fromQty;
            set
            {
                _fromQty = value;
                OnPropertyChanged();
                Convert();
            }
        }

        protected override void OnAppearing()
        {
            this.Objects = new ObservableCollection<ObjectMeasurement>(_converter.ObjectMeasurements);
            Manager.Refresh();
            base.OnAppearing();
        }

        public ObjectManagerPage (IMeasureConverters converter, IUnityContainer container, ObjectManager manager)
		{
		    Manager = manager;
		    _converter = converter;
		    _container = container;
		    InitializeComponent ();
		    BindingContext = this;
		    FromQty = 1;
            this.Objects = new ObservableCollection<ObjectMeasurement>(converter.ObjectMeasurements);

            //this.ObjectManagerList.ItemsSource = this.Objects;
        }

        private void Button_OnClicked(object sender, EventArgs e)
        {
            Navigation.PushAsync(_container.Resolve<NewObjectPage>());
        }

        private void SelectAll(object sender, EventArgs e)
        {
            Manager.SelectAll();
        }

        private void DeselectAll(object sender, EventArgs e)
        {
            Manager.DeSelectAll();
        }
    }
}