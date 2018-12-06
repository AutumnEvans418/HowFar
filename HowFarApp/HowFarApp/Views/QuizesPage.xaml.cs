using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
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
        public class QuizesPageValidator : AbstractValidator<QuizesPage>
        {
            public QuizesPageValidator()
            {
                RuleFor(p => p.SelectedDifficulty).NotEmpty().WithMessage("Must set difficulty");
                RuleFor(p => p.QuestionNumber).GreaterThan(0);
            }
        }

        public class QuizDifficultyModel
        {
            public QuizDifficulty QuizDifficulty { get; set; }
            public string Result => $"{QuizDifficulty.ToString()}, Range: {(int)QuizDifficulty}";
            public override string ToString()
            {
                return Result;
            }
        }
        private readonly IQuizGenerator _generator;
        private readonly IUnityContainer _container;
        private ObservableCollection<QuizDifficultyModel> _difficulties = new ObservableCollection<QuizDifficultyModel>(Enum.GetNames(typeof(QuizDifficulty))
            .Select(p=>new QuizDifficultyModel(){QuizDifficulty = (QuizDifficulty)(Enum.Parse(typeof(QuizDifficulty), p))}));
        private QuizDifficultyModel _selectedDifficulty;
        private ObservableCollection<string> _packs;
        private string _selectedPack = AllPacks;
        private int _questionNumber;

        public QuizesPage(IMeasureConverters converters, IQuizGenerator generator, IUnityContainer container)
        {
            
            _generator = generator;
            _container = container;
            InitializeComponent();
            Packs = new ObservableCollection<string>(converters.ObjectPacks.Select(p=>p.PackName));
            Packs.Add(AllPacks);
            QuestionNumber = 10;
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

        public QuizDifficultyModel SelectedDifficulty
        {
            get => _selectedDifficulty;
            set
            {
                _selectedDifficulty = value;
                OnPropertyChanged();
            }
        }

        public ObservableCollection<QuizDifficultyModel> Difficulties
        {
            get => _difficulties;
            set
            {
                _difficulties = value;
                OnPropertyChanged();
            }
        }

        public int QuestionNumber
        {
            get => _questionNumber;
            set
            {
                _questionNumber = value;
                OnPropertyChanged();
            }
        }

        private async void GoClicked(object sender, EventArgs e)
        {
            var validator = new QuizesPageValidator();
           var result =  validator.Validate(this);
            if (result.IsValid)
            {
                var quiz = _generator.CreateQuiz(QuestionNumber, SelectedDifficulty.QuizDifficulty, 2);
                await Navigation.PushAsync(_container.Resolve<QuizPage>(new DependencyOverride(typeof(Quiz), quiz)));
            }
            else
            {
               await Ext.DisplayError(result, this);
            }

        }
    }
}