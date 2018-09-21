using System.Collections.Generic;

namespace HowFar.Models
{
    public class ObjectMeasurement
    {
        public override string ToString()
        {
            return Measurement != null ? $"{Name}: {Value} {Measurement.Name}'s" : $"{Value} {Name}'s";
        }

        public ObjectMeasurement Measurement { get; set; }
        public double Value { get; set; }
        public string Name { get; set; }

        public ObjectMeasurement()
        {
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
    }
}