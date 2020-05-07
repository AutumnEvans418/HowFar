using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

namespace HowFar.Core.Models
{
    public static class ObjectRepositorySeeder
    {
        public const string Metric = "Metric";
        public const string Imperial = "Imperial";
        public const string Space = "Space";

        public static void Startup(IObjectRepository repository)
        {
#if BRIDGE
            var objectPacks = new List<ObjectPack>();
#else
                var objectPacks = new ObservableCollection<ObjectPack>();
#endif
            var centimeter = new ObjectMeasurement("Centimeter", "Centimeters") { Value = 1 };
            centimeter.ObjectPackName = Metric;
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

        public static ObjectMeasurement NewObjectAction(string pluralName, string singleName, double value, string measurementStr, string pack, IObjectRepository repository)
        {
            if (measurementStr != null && repository.GetObjectMeasurements().All(p => p.SingleName != singleName))
            {
                var measure = repository.GetObjectMeasurement(measurementStr);
                if (measure != null)
                {
                    var newObject = new ObjectMeasurement(singleName, pluralName) { Value = value, ObjectPackName = pack };
                    measure.Add(newObject);
                    repository.AddObject(newObject);
                    //repository.UpdatePack(pack, newObject);
                    return newObject;
                }
            }

            return null;
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
    }
}