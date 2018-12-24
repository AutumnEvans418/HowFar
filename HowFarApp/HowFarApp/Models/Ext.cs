using System;
using System.Linq;
using System.Threading.Tasks;
using Prism.Services;

namespace HowFarApp.Models
{
    public static class Ext
    {
        public static async Task DisplayError(FluentValidation.Results.ValidationResult result, IPageDialogService page)
        {
            var errors = result.Errors.Select(p => p.ErrorMessage).Aggregate(String.Empty, (f, s) => f + Environment.NewLine + s);
            await page.DisplayAlertAsync("ERROR", errors, "Ok");
        }
    }
}