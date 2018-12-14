using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

namespace HowFar.Core.Models
{
    public class MeasureConverters : IMeasureConverters
    {
        private readonly IObjectRepository _repository;

        public ObjectMeasurement Centimeter { get; set; }
        //public List<ObjectMeasurement> ObjectMeasurements { get; set; }
        public MeasureConverters(IObjectRepository repository)
        {
            _repository = repository;
            //Startup();
            ObjectMeasurements = new ObservableCollection<ObjectMeasurement>(repository.GetObjectMeasurements());
            ObjectPacks = new ObservableCollection<ObjectPack>(repository.GetObjectPacks());
            //if (app.Properties[PropertyKey] is ObjectMeasurement measure)
            //{
            //    Centimeter = measure;
            //}
        }

       
       

        private void UpdateList()
        {
            ObjectMeasurements = new ObservableCollection<ObjectMeasurement>(GetAll().OrderBy(p => Convert(p.PluralName, "Picometer")));
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
       
        private double? Calculate(ObjectMeasurement @from, ObjectMeasurement to, double value = 1)
        {
            if (from.ParentMeasurementSingleName != null)
            {
                if (from.ParentMeasurementSingleName == to.SingleName)
                {
                    return from.Value * value;
                }
                else
                {
                    var up = Calculate(from.Measurement ?? Find(from.ParentMeasurementSingleName), to, from.Value * value);
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
            var children = from.ObjectMeasurements;
            if (children.Any() != true)
            {
                children = Find(from.SingleName).ObjectMeasurements;
            }
            foreach (var objectMeasurement in children)
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
            return _repository.GetObjectMeasurements().ToList();
            //if (start == null) start = Centimeter;
            //if (obj == null) obj = new List<ObjectMeasurement>();
            //obj.Add(start);
            //if (start.GetChildren().Any())
            //{
            //    foreach (var objectMeasurement in start.GetChildren())
            //    {
            //        GetAll(objectMeasurement, obj);
            //    }
            //}
            //return obj;
        }

        public ObjectMeasurement Find(string name)
        {
            return _repository.GetObjectMeasurement(name);
            //return Find(Centimeter, name);
        }

        //private ObjectMeasurement Find(ObjectMeasurement start, string name)
        //{
        //    //return 
        //    //if (start.PluralName.ToLower() == name.ToLower() || start.SingleName.ToLower() == name.ToLower())
        //    //{
        //    //    return start;
        //    //}
        //    //foreach (var startObjectMeasurement in start.GetChildren())
        //    //{
        //    //    if (startObjectMeasurement.PluralName.ToLower() == name.ToLower() || startObjectMeasurement.SingleName.ToLower() == name.ToLower())
        //    //    {
        //    //        return startObjectMeasurement;
        //    //    }
        //    //    else
        //    //    {
        //    //        var result = Find(startObjectMeasurement, name);
        //    //        if (result != null)
        //    //        {
        //    //            return result;
        //    //        }
        //    //    }
        //    //}

        //    //return null;
        //}


        public ObjectMeasurement NewObject(string pluralName, string singleName, double value, string measurement, string pack = "Custom")
        {
            var measure = Find(measurement);
            if (measure != null)
            {
                var newObject = new ObjectMeasurement(singleName, pluralName)
                {
                    Value = value,
                    ObjectPackName = pack,
                    ParentMeasurementSingleName = measure.SingleName

                };
                _repository.AddObject(newObject);
                UpdateList();
                return newObject;
            }

            return null;
            //var measure = Find(measurement);
            //if (measure != null)
            //{
            //    var newObject = new ObjectMeasurement(singleName, pluralName) { Value = value };
            //    measure.Add(newObject);
            //    UpdateList();
            //    UpdatePack(pack, newObject);

            //    return newObject;
            //}
            //return null;
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


        public ObjectMeasurement NewObject(string pluralName, string singleName,
            double value, ObjectMeasurement measurement, string pack = "Custom")
        {
            return NewObject(pluralName, singleName, value, measurement.PluralName, pack);
        }
    }
}