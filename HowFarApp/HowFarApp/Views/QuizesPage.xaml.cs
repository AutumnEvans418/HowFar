using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HowFar.Core.Models;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace HowFarApp.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class QuizesPage : ContentPage
    {
        private readonly IMeasureConverters _converters;
        private ObservableCollection<string> _items = new ObservableCollection<string>(Enum.GetNames(typeof(QuizDifficulty)));
        private string _selectedItem;
        private ObservableCollection<string> _packs;

        public QuizesPage(IMeasureConverters converters)
        {
            _converters = converters;
            InitializeComponent();
            BindingContext = this;
        }

        public ObservableCollection<string> Packs
        {
            get => _packs;
            set
            {
                _packs = value;
                OnPropertyChanged();
            }
        }

        public string SelectedItem
        {
            get => _selectedItem;
            set
            {
                _selectedItem = value;
                OnPropertyChanged();
            }
        }

        public ObservableCollection<string> Items
        {
            get => _items;
            set
            {
                _items = value;
                OnPropertyChanged();
            }
        }
    }
}