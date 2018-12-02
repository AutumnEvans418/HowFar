using System.Collections.Generic;

namespace HowFar.Core.Models
{
    public class ObjectMeasurement : IObjectMeasurement
    {
        public override string ToString()
        {
            return Measurement != null ? $"{SingleName}: {Value} {Measurement.PluralName}" : $"{Value} {PluralName}";
        }

        public ObjectMeasurement Measurement { get; set; }
        public double Value { get; set; }

        public string Image { get; set; }

        public string PluralName { get;  }

        public ObjectMeasurement(string singleName, string pluralName)
        {
            SingleName = singleName;
            PluralName = pluralName;
            ObjectMeasurements = new List<ObjectMeasurement>();
        }

        public IEnumerable<ObjectMeasurement> GetChildren()
        {
            return ObjectMeasurements;
        }
        public void Add(ObjectMeasurement obj)
        {
            obj.Measurement = this;
            ObjectMeasurements.Add(obj);
        }
        private List<ObjectMeasurement> ObjectMeasurements { get; set; }
        public string SingleName { get;  }
    }
}