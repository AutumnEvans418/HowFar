using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using Prism.Mvvm;

namespace HowFar.Models
{
    public class MeasureConverters : BindableBase
    {
        private ObservableCollection<ObjectMeasurement> _objectMeasurements;

        private ObjectMeasurement Centimeter { get; set; }
        //public List<ObjectMeasurement> ObjectMeasurements { get; set; }
        public MeasureConverters()
        {
            Centimeter = new ObjectMeasurement() { Name = "Centimeter", Value = 1 };
            var inch = new ObjectMeasurement() { Value = 2.54, Name = "Inch" };
            Centimeter.Add(inch);
            var foot = new ObjectMeasurement() { Value = 12, Name = "Foot" };

            inch.Add(foot);
            var mile = new ObjectMeasurement() { Value = 5280, Name = "Mile" };
            foot.Add(mile);
            var meter = new ObjectMeasurement() { Value = 100, Name = "Meter" };
            Centimeter.Add(meter);
            var kiloMeter = new ObjectMeasurement() { Value = 1000, Name = "Kilometer" };
            meter.Add(kiloMeter);
            UpdateList();
        }

        private void UpdateList()
        {
            ObjectMeasurements = new ObservableCollection<ObjectMeasurement>(GetAll());
        }

        public double Convert(string nameFrom, string nameTo, double valueFrom = 1)
        {
            var from = Find(nameFrom);
            var to = Find(nameTo);

            return valueFrom * Calculate(from, to) ?? 0;
        }

        private double? Calculate(ObjectMeasurement @from, ObjectMeasurement to, double value = 1)
        {
            if (from.Measurement != null)
            {
                if (from.Measurement == to)
                {
                    return from.Value * value;
                }
                else
                {
                    var up = Calculate(from.Measurement, to, from.Value * value);
                    if (up != null)
                    {
                        return up;
                    }
                }
            }
            else
            {
                return GoDown(from, to, value);
            }
            return null;
        }

        private double? GoDown(ObjectMeasurement from, ObjectMeasurement to, double value)
        {
            foreach (var objectMeasurement in @from.GetChildren())
            {
                if (objectMeasurement == to)
                {
                    return value / to.Value;
                }
                else
                {
                    var down = GoDown(objectMeasurement, to, value / objectMeasurement.Value);
                    if (down != null)
                    {
                        return down;
                    }
                }
            }

            return null;
        }

        public ObservableCollection<ObjectMeasurement> ObjectMeasurements
        {
            get => _objectMeasurements;
            set => SetProperty(ref _objectMeasurements, value);
        }

        private List<ObjectMeasurement> GetAll(ObjectMeasurement start = null, List<ObjectMeasurement> obj = null)
        {
            if (start == null) start = Centimeter;
            if (obj == null) obj = new List<ObjectMeasurement>();
            obj.Add(start);
            if (start.GetChildren().Any())
            {
                foreach (var objectMeasurement in start.GetChildren())
                {
                    GetAll(objectMeasurement, obj);
                }
            }
            return obj;
        }

        public ObjectMeasurement Find(string name)
        {
            return Find(Centimeter, name);
        }

        private ObjectMeasurement Find(ObjectMeasurement start, string name)
        {
            if (start.Name == name)
            {
                return start;
            }
            foreach (var startObjectMeasurement in start.GetChildren())
            {
                if (startObjectMeasurement.Name == name)
                {
                    return startObjectMeasurement;
                }
                else
                {
                    var result = Find(startObjectMeasurement, name);
                    if (result != null)
                    {
                        return result;
                    }
                }
            }

            return null;
        }

        public ObjectMeasurement NewObject(string name, string measurement, double value)
        {
            var measure = Find(measurement);
            if (measure != null)
            {
                var newObject = new ObjectMeasurement() { Name = name, Value = value };
                measure.Add(newObject);
                UpdateList();
                return newObject;
            }
            return null;
        }
    }

}