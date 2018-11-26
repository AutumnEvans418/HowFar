using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HowFar.Core.Models;
using Unity;
using Unity.Resolution;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace HowFarApp.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class QuizesPage : ContentPage
    {
        private readonly IQuizGenerator _generator;
        private readonly IUnityContainer _container;
        private ObservableCollection<string> _items = new ObservableCollection<string>(Enum.GetNames(typeof(QuizDifficulty)));
        private string _selectedItem;
        private ObservableCollection<string> _packs;
        private string _selectedPack = AllPacks;

        public QuizesPage(IMeasureConverters converters, IQuizGenerator generator, IUnityContainer container)
        {
            _generator = generator;
            _container = container;
            InitializeComponent();
            Packs = new ObservableCollection<string>(converters.ObjectPacks.Select(p=>p.PackName));
            Packs.Add(AllPacks);
            BindingContext = this;
        }

        public const string AllPacks = "All";

        public string SelectedPack
        {
            get => _selectedPack;
            set
            {
                _selectedPack = value;
                OnPropertyChanged();
            }
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

        public int QuestionNumber { get; set; }
        private async void GoClicked(object sender, EventArgs e)
        {
            var quiz = _generator.CreateQuiz(QuestionNumber,
                (QuizDifficulty) Enum.Parse(typeof(QuizDifficulty), SelectedItem));
           await  Navigation.PushAsync(_container.Resolve<QuizPage>(new DependencyOverride(typeof(Quiz), quiz)));
        }
    }
}