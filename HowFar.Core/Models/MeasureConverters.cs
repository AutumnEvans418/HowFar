using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

namespace HowFar.Core.Models
{
    public class MeasureConverters : IMeasureConverters
    {
        private readonly IApp _app;

        public ObjectMeasurement Centimeter { get; set; }
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

        public const string Metric = "Metric";
        public const string Imperial = "Imperial";

      

        public const string Space = "Space";
        private void Startup()
        {
            ObjectPacks = new ObservableCollection<ObjectPack>();
            Centimeter = new ObjectMeasurement("Centimeter", "Centimeters") {  Value = 1 };

            ObjectPacks.Add(new ObjectPack("Custom", "Objects that are made in the app are placed here."){PackImage = "Assets/block.png"});
            ObjectPacks.Add(new ObjectPack(Imperial,"A default package for the US measurement system"){PackImage = "https://logoeps.com/wp-content/uploads/2013/06/flag-of-usa-vector-logo.png" });
            ObjectPacks.Add(new ObjectPack(Metric, "The metric system.  Used by everyone except the US"){PackImage = "http://www.knightstemplarorder.org/wp-content/uploads/2016/06/UN-SEAL-Stylized-500-Brown.png" });
            ObjectPacks.Add(new ObjectPack(Space, "Objects and Measurements in space"){PackImage = "https://sep.yimg.com/ay/skyimage/nasa-space-missions-9.jpg" });

            UpdatePack(Imperial, Centimeter);
            var inches = NewObject("Inches", "Inch", 2.54, Centimeter, Imperial);
            var feet = NewObject("Feet","Foot", 12, inches, Imperial);
            var mile = NewObject("Miles", "Mile", 5280, feet, Imperial);
            var meter = NewObject("Meters", "Meter", 100, Centimeter, Metric);
            var kiloMeter = NewObject("Kilometers", "Kilometer", 1000, meter, Metric);

            var nanoMeter = NewObject("Nanometers", "Nanometer", 0.0000001, Centimeter, Metric);

            var earth = this.NewObject("Earths","Earth", 25000, mile, Space);
            var sun = NewObject("Suns","Sun", 103, earth, Space);
            var dist = NewObject("Distance from Earth to Sun", "Distance from Earth to Sun", 92955807, mile, Space);
            var lightyear = NewObject("Lightyears", "Lightyear", 5878625000000, mile, Space);

            var alpha = NewObject("Distance from Earth to Alpha Centauri", "Distance from Earth to Alpha Centauri", 4.4, lightyear, Space);
            var pico = NewObject("Picometers", "Picometer", 0.001, nanoMeter, Metric);
        }

        private void UpdateList()
        {
            ObjectMeasurements = new ObservableCollection<ObjectMeasurement>(GetAll().OrderBy(p=> Convert(p.PluralName, "Picometer")));
        }

        public ObservableCollection<ObjectPack> ObjectPacks { get; set; }

        public double Convert(ObjectMeasurement @from, ObjectMeasurement to, double valueFrom = 1)
        {
            return Convert(from.PluralName, to.PluralName, valueFrom);
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
            if (start.PluralName.ToLower() == name.ToLower() || start.SingleName.ToLower() == name.ToLower())
            {
                return start;
            }
            foreach (var startObjectMeasurement in start.GetChildren())
            {
                if (startObjectMeasurement.PluralName.ToLower() == name.ToLower() || startObjectMeasurement.SingleName.ToLower() == name.ToLower())
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

       
        public ObjectMeasurement NewObject(string pluralName, string singleName, double value, string measurement, string pack = "Custom")
        {
            var measure = Find(measurement);
            if (measure != null)
            {
                var newObject = new ObjectMeasurement(singleName, pluralName) { Value = value};
                measure.Add(newObject);
                UpdateList();
                UpdateProperties();
                UpdatePack(pack, newObject);

                return newObject;
            }
            return null;
        }

        private void UpdatePack(string pack, ObjectMeasurement newObject)
        {
            var packs = ObjectPacks.FirstOrDefault(p => p.PackName == pack);
            if (packs != null)
            {
                packs.ObjectMeasurements.Add(newObject);
            }
            else
            {
                throw new InvalidOperationException($"package '{pack}' must exist first");
            }
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
            double value, ObjectMeasurement measurement, string pack = "Custom")
        {
            return NewObject(pluralName, singleName, value, measurement.PluralName, pack);
        }
    }
}