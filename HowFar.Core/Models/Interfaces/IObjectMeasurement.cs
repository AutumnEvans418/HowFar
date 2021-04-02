using System.Collections.Generic;

namespace HowFar.Core.Models
{
    public interface IObjectMeasurement
    {
        int Id { get; set; }
        string Image { get; set; }
        string PluralName { get;  }
        string SingleName { get; }
        double Value { get; set; }

        int? ParentObjectMeasurementId { get; }
    }
}