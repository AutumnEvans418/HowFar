using FluentValidation;

namespace HowFarApp.ViewModels
{
    public class QuizesPageValidator : AbstractValidator<QuizesPageViewModel>
    {
        public QuizesPageValidator()
        {
            RuleFor(p => p.SelectedDifficulty).NotEmpty().WithMessage("Must set difficulty");
            RuleFor(p => p.QuestionNumber).GreaterThan(0);
        }
    }
}