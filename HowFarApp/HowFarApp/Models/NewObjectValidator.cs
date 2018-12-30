using FluentValidation;
using HowFarApp.ViewModels;

namespace HowFarApp.Models
{
    public class NewObjectValidator : AbstractValidator<NewObjectPageViewModel>
    {
        public NewObjectValidator()
        {
            RuleFor(p => p.SingleName).NotEmpty();
            RuleFor(p => p.MeasurementValue).NotEmpty();
            RuleFor(p => p.PluralName).NotEmpty();
            RuleFor(p => p.SelectedObject).NotNull();
            RuleFor(p => p.SelectedObjectPack).NotNull();
        }
    }
}