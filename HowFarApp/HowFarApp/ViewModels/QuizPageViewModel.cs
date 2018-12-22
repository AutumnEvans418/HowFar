using HowFar.Core.Models;
using HowFarApp.ViewModels;
using Prism.Commands;
using Prism.Navigation;

namespace HowFarApp.Views
{
    public class QuizPageViewModel : ViewModelBase
    {
        public Quiz Quiz
        {
            get => _quiz;
            set => SetProperty(ref _quiz,value);
        }

        private readonly IQuizScorer _scorer;
        private readonly INavigationService _navigationService;
        private Quiz _quiz;

        public QuizPageViewModel(IQuizScorer scorer, INavigationService navigationService)
        {
            _scorer = scorer;
            _navigationService = navigationService;
            FinishCommand = new DelegateCommand(FinishQuizClick);
        }
        public override void OnNavigatedTo(INavigationParameters parameters)
        {
            if (parameters["Quiz"] is Quiz quiz)
            {
                Quiz = quiz;
            }
            base.OnNavigatedTo(parameters);
        }

        public DelegateCommand FinishCommand { get; set; }

        private async void FinishQuizClick()
        {
            await _navigationService.NavigateAsync(nameof(QuizResultPage),
                new NavigationParameters() { { "Score", _scorer.CalculateScore(Quiz.Answers) } });
        }
    }
}