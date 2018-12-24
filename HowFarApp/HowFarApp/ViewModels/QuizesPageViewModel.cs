using System;
using System.Collections.ObjectModel;
using System.Linq;
using HowFar.Core.Models;
using HowFarApp.Models;
using HowFarApp.Views;
using Prism.Commands;
using Prism.Navigation;
using Prism.Services;
using Unity;
using Unity.Resolution;

namespace HowFarApp.ViewModels
{
    public class QuizesPageViewModel : ViewModelBase
    {
        private readonly IQuizGenerator _generator;
        private readonly INavigationService _navigationService;
        private readonly IPageDialogService _dialog;

        private ObservableCollection<QuizDifficultyModel> _difficulties = new ObservableCollection<QuizDifficultyModel>(Enum.GetNames(typeof(QuizDifficulty))
            .Select(p => new QuizDifficultyModel() { QuizDifficulty = (QuizDifficulty)(Enum.Parse(typeof(QuizDifficulty), p)) }));
        private QuizDifficultyModel _selectedDifficulty;
        private ObservableCollection<string> _packs;
        private string _selectedPack = AllPacks;
        private int _questionNumber;

        public QuizesPageViewModel(IMeasureConverters converters, IQuizGenerator generator,
             INavigationService navigationService, Prism.Services.IPageDialogService dialog) : base(navigationService)
        {

            _generator = generator;
            _navigationService = navigationService;
            _dialog = dialog;
            Packs = new ObservableCollection<string>(converters.ObjectPacks.Select(p => p.PackName));
            Packs.Add(QuizesPageViewModel.AllPacks);
            GoCommand = new DelegateCommand(GoClicked);
            QuestionNumber = 10;
        }

        public DelegateCommand GoCommand { get; set; }
        private async void GoClicked()
        {
            var validator = new QuizesPageValidator();
            var result = validator.Validate(this);
            if (result.IsValid)
            {
                var quiz = _generator.CreateQuiz(QuestionNumber, SelectedDifficulty.QuizDifficulty, 2);
               // await Navigation.PushAsync(_container.Resolve<QuizPage>(new DependencyOverride(typeof(Quiz), quiz)));
                await _navigationService.NavigateAsync("QuizPage", new NavigationParameters(){{"Quiz", quiz}});
            }
            else
            {
                //await _dialog.DisplayAlertAsync("Error", result, "Ok");
                await Ext.DisplayError(result, _dialog);
            }

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
    }
}