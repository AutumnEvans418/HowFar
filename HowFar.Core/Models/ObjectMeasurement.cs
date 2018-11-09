using System.Collections.Generic;

namespace HowFar.Models
{
    public class ObjectMeasurement
    {
        private double _value;
        private string _pluralName;

        public override string ToString()
        {
            return Measurement != null ? $"{PluralName}: {Value} {Measurement.PluralName}s" : $"{Value} {PluralName}s";
        }

        public ObjectMeasurement Measurement { get; set; }
        public ObjectType ObjectType { get; set; }
        public double Value
        {
            get => _value;
            set =>  _value=value;
        }

        public string PluralName
        {
            get => _pluralName;
            set =>  _pluralName=value;
        }

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