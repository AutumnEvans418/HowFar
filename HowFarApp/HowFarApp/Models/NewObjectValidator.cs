using FluentValidation;
using HowFarApp.ViewModels;

namespace HowFarApp.Models
{
    public class NewObjectValidator : AbstractValidator<NewObjectPageViewModel>
    {
        public NewObjectValidator()
        {
            RuleFor(p => p.NameEntry).NotEmpty();
            RuleFor(p => p.MeasurementEntry).NotEmpty();
            RuleFor(p => p.PluralEntry).NotEmpty();
            RuleFor(p => p.SelectedObject).NotNull();
            RuleFor(p => p.SelectedObjectPack).NotNull();
        }
    }
}