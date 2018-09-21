using System.Collections.Generic;
using Prism.Mvvm;

namespace HowFar.Models
{
    public class ObjectMeasurement : BindableBase
    {
        private double _value;
        private string _name;

        public override string ToString()
        {
            return Measurement != null ? $"{Name}: {Value} {Measurement.Name}s" : $"{Value} {Name}s";
        }

        public ObjectMeasurement Measurement { get; set; }
        public ObjectType ObjectType { get; set; }
        public double Value
        {
            get => _value;
            set => SetProperty(ref _value,value);
        }

        public string Name
        {
            get => _name;
            set => SetProperty(ref _name,value);
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
    }
}