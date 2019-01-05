using System;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
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

        public static void DeleteDatabase(DbConnection connection)
        {
            connection.Execute("DROP TABLE IF EXISTS ObjectMeasurements;");
            connection.Execute("DROP TABLE IF EXISTS ObjectPacks;");
        }

        public static void CreateDatabase(DbConnection connection)
        {
            connection.Execute($"create table ObjectMeasurements(SingleName string primary key, Value float, Image string, PluralName string, ObjectPackName string, ParentMeasurementSingleName string)");
            connection.Execute($"create table ObjectPacks(PackName string primary key, Description string, PackImage string)");
        }
    }
}