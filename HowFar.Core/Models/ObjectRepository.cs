using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using HowFarApp.Models;
using Microsoft.EntityFrameworkCore;

namespace HowFar.Core.Models
{
    public class ObjectRepository : IObjectRepository
    {
        private readonly DatabaseContext db;

        public ObjectRepository(DatabaseContext dbcontext)
        {
            db = dbcontext;
            Startup();
        }
      

        public const string Metric = "Metric";
        public const string Imperial = "Imperial";
        public const string Space = "Space";

        private void UpdatePack(string pack, ObjectMeasurement newObject)
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
            if (measurementStr != null && !db.ObjectMeasurements.Any(p => p.SingleName == singleName))
            {
                var measure = GetObjectMeasurement(measurementStr);
                if (measure != null)
                {
                    var newObject = new ObjectMeasurement(singleName, pluralName) { Value = value };
                    measure.Add(newObject);

                    // UpdateList();
                    UpdatePack(pack, newObject);
                    //db.ObjectMeasurements.Add(measure);
                    //db.SaveChanges();
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
        private void Startup()
        {
            var objectPacks = new ObservableCollection<ObjectPack>();
            var centimeter = new ObjectMeasurement("Centimeter", "Centimeters") { Value = 1 };

            objectPacks.Add(new ObjectPack("Custom", "Objects that are made in the app are placed here.") { PackImage = "Assets/block.png" });
            objectPacks.Add(new ObjectPack(Imperial, "A default package for the US measurement system") { PackImage = "https://logoeps.com/wp-content/uploads/2013/06/flag-of-usa-vector-logo.png" });
            objectPacks.Add(new ObjectPack(Metric, "The metric system.  Used by everyone except the US") { PackImage = "http://www.knightstemplarorder.org/wp-content/uploads/2016/06/UN-SEAL-Stylized-500-Brown.png" });
            objectPacks.Add(new ObjectPack(Space, "Objects and Measurements in space") { PackImage = "https://sep.yimg.com/ay/skyimage/nasa-space-missions-9.jpg" });
            var packs = db.ObjectPacks.ToList();
            foreach (var objectPack in objectPacks)
            {
                if (!packs.Select(p => p.PackName).Contains(objectPack.PackName))
                    db.ObjectPacks.Add(objectPack);
            }

            db.SaveChanges();
            if (!db.ObjectMeasurements.Any(p => p.SingleName == centimeter.SingleName))
                UpdatePack(Imperial, centimeter);
            var inches = NewObject("Inches", "Inch", 2.54, centimeter, Imperial);
            var feet = NewObject("Feet", "Foot", 12, inches, Imperial);
            var mile = NewObject("Miles", "Mile", 5280, feet, Imperial);
            var meter = NewObject("Meters", "Meter", 100, centimeter, Metric);
            var kiloMeter = NewObject("Kilometers", "Kilometer", 1000, meter, Metric);

            var nanoMeter = NewObject("Nanometers", "Nanometer", 0.0000001, centimeter, Metric);

            var earth = this.NewObject("Earths", "Earth", 25000, mile, Space);
            var sun = NewObject("Suns", "Sun", 103, earth, Space);
            var dist = NewObject("Distance from Earth to Sun", "Distance from Earth to Sun", 92955807, mile, Space);
            var lightyear = NewObject("Lightyears", "Lightyear", 5878625000000, mile, Space);

            var alpha = NewObject("Distance from Earth to Alpha Centauri", "Distance from Earth to Alpha Centauri", 4.4, lightyear, Space);
            var pico = NewObject("Picometers", "Picometer", 0.001, nanoMeter, Metric);
        }

        public ObjectMeasurement GetObjectMeasurement(string name)
        {
            var data = GetObjectMeasurements();
            return data.FirstOrDefault(p => p.SingleName.ToLower() == name.ToLower() || p.PluralName.ToLower() == name.ToLower());
        }


        public IList<ObjectMeasurement> SetupTree(IList<ObjectMeasurement> data)
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