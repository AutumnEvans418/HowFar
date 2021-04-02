using System;
using System.Collections.Generic;
using System.Linq;

namespace HowFar.Core.Models
{
    public class ObjectRepositoryCache : IObjectRepository
    {
        private readonly IAppCache _app;
        private readonly List<ObjectMeasurement> measurements;
        private readonly List<ObjectPack> packs;

        T GetKey<T>(string key) where T : class
        {
            if (_app.Properties.ContainsKey(key))
            {
                return _app.Properties.Get<T>(key);
            }
            return default(T);
        }

        public ObjectRepositoryCache(IAppCache app)
        {
            _app = app;
            measurements = GetKey<List<ObjectMeasurement>>(ObjectKey) ?? new List<ObjectMeasurement>();
            packs = GetKey<List<ObjectPack>>(PackKey) ?? new List<ObjectPack>();
            if (!measurements.Any())
                ObjectRepositorySeeder.Startup(this);
        }
        public void Dispose()
        {
        }

        void InsertKey(string key, object data)
        {
            if (_app.Properties.ContainsKey(key))
            {
                _app.Properties.Set(key,data);
            }
            else
            {
                _app.Properties.Add(key, data);
            }
        }
        async void SaveChanges()
        {
            if(!ShouldSave)
                return;
            
            InsertKey(ObjectKey, measurements);
            InsertKey(PackKey, packs);
            await _app.SavePropertiesAsync();
        }

        public bool ShouldSave { get; set; } = true;

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
            //if (measurement.ObjectPackId == null)
            //    throw new InvalidOperationException("must have a pack name");

            if (measurement.ParentObjectMeasurementId == null && measurement.Measurement != null)
                measurement.ParentObjectMeasurementId = measurement.Measurement.Id;
            else if (measurement.ParentObjectMeasurementId != null && measurement.Measurement == null)
                measurement.Measurement =
                    measurements.FirstOrDefault(p => p.Id == measurement.ParentObjectMeasurementId);
            if (measurement.ObjectPackId == null && measurement.ObjectPack != null)
                measurement.ObjectPackId = measurement.ObjectPack.Id;
            else if (measurement.ObjectPackId != null && measurement.ObjectPack == null)
                measurement.ObjectPack = packs.FirstOrDefault(p => p.Id == measurement.ObjectPackId);

            var pack = packs.First(p => p.Id == measurement.ObjectPackId);
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


        public ObjectMeasurement NewObject(
            string plural, 
            string single, 
            double value, 
            ObjectMeasurement parent, 
            string pack)
        {
            return ObjectRepositorySeeder.NewObjectAction(plural, single, value, parent.SingleName, pack, this);
        }

        public ObjectPack GetObjectPack(string pack)
        {
            return packs.FirstOrDefault(p => p.PackName == pack);
        }
    }
}