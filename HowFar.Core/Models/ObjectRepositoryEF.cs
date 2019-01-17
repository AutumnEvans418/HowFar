using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using HowFarApp.Models;
using Microsoft.EntityFrameworkCore;

namespace HowFar.Core.Models
{
    public class ObjectRepositoryCache : IObjectRepository
    {
        private readonly IApp _app;
        private readonly List<ObjectMeasurement> measurements;
        private readonly List<ObjectPack> packs;
        public ObjectRepositoryCache(IApp app)
        {
            T GetKey<T>(string key)
            {
                if (_app.Properties.ContainsKey(key) && _app.Properties[key] is T data)
                {
                    return data;
                }
                return default(T);
            }
            _app = app;
            measurements = GetKey<List<ObjectMeasurement>>(ObjectKey) ?? new List<ObjectMeasurement>();
            packs = GetKey<List<ObjectPack>>(PackKey) ?? new List<ObjectPack>();
            ObjectRepositoryEF.Startup(this);
        }
        public void Dispose()
        {
        }

        void InsertKey(string key, object data)
        {
            if (_app.Properties.ContainsKey(key))
            {
                _app.Properties[key] = data;
            }
            else
            {
                _app.Properties.Add(key,data);
            }
        }
        async void SaveChanges()
        {
            InsertKey(ObjectKey, measurements);
            InsertKey(PackKey, packs);
            await _app.SavePropertiesAsync();
        }
       
        public ObjectMeasurement GetObjectMeasurement(string name)
        {
            var data = GetObjectMeasurements();
            return data.FirstOrDefault(p => p.SingleName.ToLower() == name.ToLower() || p.PluralName.ToLower() == name.ToLower());
        }

        public const string ObjectKey = "ObjectMeasurements";
        public const string PackKey = "ObjectPacks";
        public IEnumerable<ObjectMeasurement> GetObjectMeasurements()
        {
            return ObjectRepositoryEF.SetupTree(measurements);
        }
        public void AddObject(ObjectMeasurement measurement)
        {
            if (measurement.ParentMeasurementSingleName == null && measurement.Measurement != null)
                measurement.ParentMeasurementSingleName = measurement.Measurement.SingleName;
            else if (measurement.ParentMeasurementSingleName != null && measurement.Measurement == null)
                measurement.Measurement =
                    measurements.FirstOrDefault(p => p.SingleName == measurement.ParentMeasurementSingleName);
            if (measurement.ObjectPackName == null && measurement.ObjectPack != null)
                measurement.ObjectPackName = measurement.ObjectPack.PackName;
            else if (measurement.ObjectPackName != null && measurement.ObjectPack == null)
                measurement.ObjectPack = packs.FirstOrDefault(p => p.PackName == measurement.ObjectPackName);

            var pack = packs.First(p => p.PackName == measurement.ObjectPackName);
            if (pack.ObjectMeasurements.Any(p => p.SingleName == measurement.SingleName) != true)
            {
                pack.ObjectMeasurements.Add(measurement);
            }

            measurements.Add(measurement);
            SaveChanges();
        }

        public void RemoveObject(ObjectMeasurement measurement)
        {
            measurements.Remove(measurement);
            SaveChanges();
        }

        public IEnumerable<ObjectPack> GetObjectPacks()
        {
            return packs;
        }

        public void AddPack(ObjectPack pack)
        {
            packs.Add(pack);
            SaveChanges();
            
        }

        public void RemovePack(ObjectPack pack)
        {
            packs.Remove(pack);
            SaveChanges();
        }

        public void UpdateObject(ObjectMeasurement selectedObject)
        {

        }


        public ObjectMeasurement NewObject(string plural, string single, double value, ObjectMeasurement parent, string pack)
        {
           return ObjectRepositoryEF.NewObjectAction(plural, single, value, parent.SingleName, pack, this);
        }
    }

    public class ObjectRepositoryEF : IObjectRepository
    {
        private readonly DatabaseContext db;

        public ObjectRepositoryEF(DatabaseContext dbcontext)
        {
            db = dbcontext;
            Startup(this);
        }
      

        public const string Metric = "Metric";
        public const string Imperial = "Imperial";
        public const string Space = "Space";

        public void UpdatePack(string pack, ObjectMeasurement newObject)
        {
            var packs = db.ObjectPacks.FirstOrDefault(p => p.PackName == pack);
            if (packs != null)
            {
                if (newObject.Measurement != null)
                {
                    db.Entry(newObject.Measurement).State = EntityState.Modified;
                }
                packs.ObjectMeasurements.Add(newObject);
            }
            else
            {
                throw new InvalidOperationException($"package '{pack}' must exist first");
            }

            db.SaveChanges();

        }

        public ObjectMeasurement NewObject(string pluralName, string singleName, double value, string measurementStr, string pack = "Custom")
        {
            return NewObjectAction(pluralName, singleName, value, measurementStr, pack, this);

        }

        public static ObjectMeasurement NewObjectAction(string pluralName, string singleName, double value, string measurementStr, string pack, IObjectRepository repository)
        {
            if (measurementStr != null && repository.GetObjectMeasurements().All(p => p.SingleName != singleName))
            {
                var measure = repository.GetObjectMeasurement(measurementStr);
                if (measure != null)
                {
                    var newObject = new ObjectMeasurement(singleName, pluralName) { Value = value };
                    measure.Add(newObject);
                    repository.AddObject(newObject);
                    //repository.UpdatePack(pack, newObject);
                    return newObject;
                }
            }

            return null;
        }

        public ObjectMeasurement NewObject(string pluralName, string singleName,
            double value, ObjectMeasurement measurement, string pack = "Custom")
        {
            return NewObject(pluralName, singleName, value, measurement?.PluralName, pack);
        }

        public static void Startup(IObjectRepository repository)
        {
            var objectPacks = new ObservableCollection<ObjectPack>();
            var centimeter = new ObjectMeasurement("Centimeter", "Centimeters") { Value = 1 };

            objectPacks.Add(new ObjectPack("Custom", "Objects that are made in the app are placed here.") { PackImage = "Assets/block.png" });
            objectPacks.Add(new ObjectPack(Imperial, "A default package for the US measurement system") { PackImage = "https://logoeps.com/wp-content/uploads/2013/06/flag-of-usa-vector-logo.png" });
            objectPacks.Add(new ObjectPack(Metric, "The metric system.  Used by everyone except the US") { PackImage = "http://www.knightstemplarorder.org/wp-content/uploads/2016/06/UN-SEAL-Stylized-500-Brown.png" });
            objectPacks.Add(new ObjectPack(Space, "Objects and Measurements in space") { PackImage = "https://sep.yimg.com/ay/skyimage/nasa-space-missions-9.jpg" });
            var packs = repository.GetObjectPacks().ToList();
            foreach (var objectPack in objectPacks)
            {
                if (!packs.Select(p => p.PackName).Contains(objectPack.PackName))
                    repository.AddPack(objectPack);
            }

            //db.SaveChanges();
            if (repository.GetObjectMeasurements().All(p => p.SingleName != centimeter.SingleName))
                repository.AddObject(centimeter);
               //repository.UpdatePack(Imperial, centimeter);
            var inches = repository.NewObject("Inches", "Inch", 2.54, centimeter, Imperial);
            var feet = repository.NewObject("Feet", "Foot", 12, inches, Imperial);
            var mile = repository.NewObject("Miles", "Mile", 5280, feet, Imperial);
            var meter = repository.NewObject("Meters", "Meter", 100, centimeter, Metric);
            var kiloMeter = repository.NewObject("Kilometers", "Kilometer", 1000, meter, Metric);

            var nanoMeter = repository.NewObject("Nanometers", "Nanometer", 0.0000001, centimeter, Metric);

            var earth = repository.NewObject("Earths", "Earth", 25000, mile, Space);
            var sun = repository.NewObject("Suns", "Sun", 103, earth, Space);
            var dist = repository.NewObject("Distance from Earth to Sun", "Distance from Earth to Sun", 92955807, mile, Space);
            var lightyear = repository.NewObject("Lightyears", "Lightyear", 5878625000000, mile, Space);

            var alpha = repository.NewObject("Distance from Earth to Alpha Centauri", "Distance from Earth to Alpha Centauri", 4.4, lightyear, Space);
            var pico = repository.NewObject("Picometers", "Picometer", 0.001, nanoMeter, Metric);
        }

        public ObjectMeasurement GetObjectMeasurement(string name)
        {
            var data = GetObjectMeasurements();
            return data.FirstOrDefault(p => p.SingleName.ToLower() == name.ToLower() || p.PluralName.ToLower() == name.ToLower());
        }


        public static IList<ObjectMeasurement> SetupTree(IList<ObjectMeasurement> data)
        {
            foreach (var objectMeasurement in data)
            {
                if (objectMeasurement.ParentMeasurementSingleName != null)
                {
                    objectMeasurement.Measurement =
                        data.First(p => p.SingleName == objectMeasurement.ParentMeasurementSingleName);
                }

                var t = data.Where(p => p.ParentMeasurementSingleName == objectMeasurement.SingleName);
                objectMeasurement.ObjectMeasurements = t.ToList();
            }

            return data;
        }
        public IEnumerable<ObjectMeasurement> GetObjectMeasurements()
        {
            var data = db.ObjectMeasurements.ToList();
            return SetupTree(data);
        }

        public void AddObject(ObjectMeasurement measurement)
        {
            db.ObjectMeasurements.Add(measurement);
            db.SaveChanges();
        }

        public void RemoveObject(ObjectMeasurement measurement)
        {
            db.ObjectMeasurements.Remove(measurement);
            db.SaveChanges();
        }



        public IEnumerable<ObjectPack> GetObjectPacks()
        {
            return db.ObjectPacks;
        }

        public void AddPack(ObjectPack pack)
        {
            db.ObjectPacks.Add(pack);
            db.SaveChanges();
        }

        public void RemovePack(ObjectPack pack)
        {
            db.ObjectPacks.Remove(pack);
            db.SaveChanges();
        }

        public void UpdateObject(ObjectMeasurement selectedObject)
        {
            db.ObjectMeasurements.Update(selectedObject);
            db.SaveChanges();
        }

        public void Dispose()
        {
            db?.Dispose();
        }
    }
}