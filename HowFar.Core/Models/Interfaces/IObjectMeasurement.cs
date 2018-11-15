using System.Collections.Generic;

namespace HowFar.Core.Models
{
    public interface IObjectMeasurement
    {
        byte[] Image { get; set; }
        ObjectMeasurement Measurement { get; set; }
        ObjectType ObjectType { get; set; }
        string PluralName { get; set; }
        string SingleName { get; set; }
        double Value { get; set; }

        void Add(ObjectMeasurement obj);
        IEnumerable<ObjectMeasurement> GetChildren();
        string ToString();
    }
}