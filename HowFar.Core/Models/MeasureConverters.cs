using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

namespace HowFar.Models
{
    public class MeasureConverters : IMeasureConverters
    {
        private readonly IApp _app;

        private ObjectMeasurement Centimeter { get; set; }
        //public List<ObjectMeasurement> ObjectMeasurements { get; set; }
        public MeasureConverters(IApp app)
        {
            _app = app;
            if (app.Properties.ContainsKey(PropertyKey))
            {
                if (app.Properties[PropertyKey] is ObjectMeasurement measure)
                {
                    Centimeter = measure;
                }
            }
            else
            {
                Startup();
            }

        }

        private void Startup()
        {
            Centimeter = new ObjectMeasurement(ObjectType.Unit) { PluralName = "Centimeters", Value = 1 };
            var inches = NewObject("Inches", "Inch", 2.54, Centimeter);
            var feet = NewObject("Feet","Foot", 12, inches);
            var mile = NewObject("Miles", "Mile", 5280, feet);
            var meter = NewObject("Meters", "Meter", 100, Centimeter);
            var kiloMeter = NewObject("Kilometers", "Kilometer", 1000, meter);

            var nanoMeter = NewObject("Nanometers", "Nanometer", 0.0000001, Centimeter);

            var earth = this.NewObject("Earths","Earth", 25000, mile, ObjectType.Object);
            var sun = NewObject("Suns","Sun", 103, earth, ObjectType.Object);
            var dist = NewObject("Distance from Earth to Sun", "Distance from Earth to Sun", 92955807, mile, ObjectType.Distance);
            var lightyear = NewObject("Lightyears", "Lightyear", 5878625000000, mile);

            var alpha = NewObject("Distance from Earth to Alpha Centauri", "Distance from Earth to Alpha Centauri", 4.4, lightyear, ObjectType.Distance);
            var pico = NewObject("Picometers", "Picometer", 0.001, nanoMeter);
        }

        private void UpdateList()
        {
            ObjectMeasurements = new ObservableCollection<ObjectMeasurement>(GetAll().OrderBy(p=> Convert(p.PluralName, "Picometer")));
        }

        public double Convert(string nameFrom, string nameTo, double valueFrom = 1)
        {
            var from = Find(nameFrom);
            var to = Find(nameTo);
            if (to == from)
            {
                return valueFrom;
            }
            return valueFrom * Calculate(from, to) ?? 0;
        }
        //public double ConvertEff(string nameFrom, string nameTo, double valueFrom = 1)
        //{
        //    var from = Find(nameFrom);
        //    var to = Find(nameTo);
        //    if (to == from)
        //    {
        //        return valueFrom;
        //    }
        //    return valueFrom * Calculate(from, to) ?? 0;
        //}
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

        public ObservableCollection<ObjectMeasurement> ObjectMeasurements { get; set; }

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
            if (start.PluralName == name || start.SingleName == name)
            {
                return start;
            }
            foreach (var startObjectMeasurement in start.GetChildren())
            {
                if (startObjectMeasurement.PluralName == name || startObjectMeasurement.SingleName == name)
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

       
        public ObjectMeasurement NewObject(string pluralName, string singleName, double value, string measurement, ObjectType type = ObjectType.Unit)
        {
            var measure = Find(measurement);
            if (measure != null)
            {
                var newObject = new ObjectMeasurement(type) { PluralName = pluralName, Value = value , SingleName = singleName};
                measure.Add(newObject);
                UpdateList();
                UpdateProperties();
                return newObject;
            }
            return null;
        }

        public const string PropertyKey = "Conversions";
        private void UpdateProperties()
        {
            if (_app.Properties.ContainsKey(PropertyKey))
            {
                _app.Properties[PropertyKey] = Centimeter;
            }
        }

        public ObjectMeasurement NewObject(string pluralName, string singleName,
            double value, ObjectMeasurement measurement, ObjectType type = ObjectType.Unit)
        {
            return NewObject(pluralName, singleName, value, measurement.PluralName, type);
        }
    }
}