using System.Collections.Generic;

namespace HowFar.Models
{
    public class ObjectMeasurement
    {
        public override string ToString()
        {
            return Measurement != null ? $"{SingleName}: {Value} {Measurement.PluralName}" : $"{Value} {PluralName}";
        }

        public ObjectMeasurement Measurement { get; set; }
        public ObjectType ObjectType { get; set; }
        public double Value { get; set; }

        public string PluralName { get; set; }

        public ObjectMeasurement(ObjectType objectType)
        {
            ObjectType = objectType;
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
        public string SingleName { get; set; }
    }
}