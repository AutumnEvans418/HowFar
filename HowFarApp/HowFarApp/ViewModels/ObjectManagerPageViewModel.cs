using System.Collections.ObjectModel;
using HowFar.Core;
using HowFar.Core.Models;
using HowFarApp.Views;
using Prism.Commands;
using Prism.Navigation;
using Unity;

namespace HowFarApp.ViewModels
{
    
    public class ObjectManagerPageViewModel : ViewModelBase
    {
        public ObjectManagerPageViewModel(INavigationService navigationService,IObjectManager manager) : base(navigationService)
        {
            Manager = manager;
            _converter = manager.MeasureConverters;
            FromQty = 1;
            this.Objects = new ObservableCollection<ObjectMeasurement>(manager.MeasureConverters.ObjectMeasurements);
            SelectAllCommand = new DelegateCommand(SelectAll);
            DeselectAllCommand = new DelegateCommand(DeselectAll);
            NewCommand = new DelegateCommand(Button_OnClicked);
            DeleteObjectCommand = new DelegateCommand(() => DeleteObject(manager), () => Manager.SelectedObject != null)
                .ObservesProperty(() => Manager.SelectedObject);

            EditObjectCommand = new DelegateCommand(() => navigationService.NavigateAsync(nameof(NewObjectPage), new NavigationParameters() { { "Object", Manager.SelectedObject.ObjectMeasurement } }), () => Manager.SelectedObject != null)
                .ObservesProperty(() => Manager.SelectedObject);
        }

        private void DeleteObject(IObjectManager manager)
        {
            manager.MeasureConverters.DeleteObject(manager.SelectedObject.ObjectMeasurement);
            Objects = new ObservableCollection<ObjectMeasurement>(manager.MeasureConverters.ObjectMeasurements);
            Manager.Refresh();
        }

        public IObjectManager Manager
        {
            get => _manager;
            set => SetProperty(ref _manager,value);
        }

        private readonly IMeasureConverters _converter;
        private ObjectMeasurement _toObject;
        private ObjectMeasurement _fromObject;
        private double _convertResult;
        private double _fromQty;
        private ObservableCollection<ObjectMeasurement> _objects;
        private IObjectManager _manager;
        //private ObjectMeasurementViewModel _selectedObject;

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

        public override void OnNavigatedTo(INavigationParameters parameters)
        {
            this.Objects = new ObservableCollection<ObjectMeasurement>(_converter.ObjectMeasurements);
            Manager.Refresh();
            base.OnNavigatedTo(parameters);
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

        public DelegateCommand SelectAllCommand { get; set; }
        public DelegateCommand DeselectAllCommand { get; set; }
        public DelegateCommand NewCommand { get; set; }

        //public ObjectMeasurementViewModel SelectedObject
        //{
        //    get => _selectedObject;
        //    set => SetProperty(ref _selectedObject,value);
        //}

        public DelegateCommand DeleteObjectCommand { get; set; }
        public DelegateCommand EditObjectCommand { get; set; }

        private void SelectAll()
        {
            Manager.SelectAll();
        }

        private void DeselectAll()
        {
            Manager.DeSelectAll();
        }
        private void Button_OnClicked()
        {
            NavigationService.NavigateAsync(nameof(NewObjectPage));
        }
    }
}