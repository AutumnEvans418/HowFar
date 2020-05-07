using System;
using System.Collections.Generic;
using System.Linq;

namespace HowFar.Core.Models
{
    public class ObjectRepositoryCache : IObjectRepository
    {
        private readonly IApp _app;
        private readonly List<ObjectMeasurement> measurements;
        private readonly List<ObjectPack> packs;

        T GetKey<T>(string key)
        {
            if (_app.Properties.ContainsKey(key) && _app.Properties[key] is T data)
            {
                return data;
            }
            return default(T);
        }

        public ObjectRepositoryCache(IApp app)
        {
            _app = app;
            measurements = GetKey<List<ObjectMeasurement>>(ObjectKey) ?? new List<ObjectMeasurement>();
            packs = GetKey<List<ObjectPack>>(PackKey) ?? new List<ObjectPack>();
            ObjectRepositorySeeder.Startup(this);
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
            return ObjectRepositorySeeder.SetupTree(measurements);
        }
        public void AddObject(ObjectMeasurement measurement)
        {
            if (measurement.ObjectPackName== null)
                throw new InvalidOperationException("must have a pack name");

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
            return ObjectRepositorySeeder.NewObjectAction(plural, single, value, parent.SingleName, pack, this);
        }
    }
}