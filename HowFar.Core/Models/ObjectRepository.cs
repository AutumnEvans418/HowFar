using System.Collections.Generic;

namespace HowFar.Core.Models
{
    public class ObjectRepository : IObjectRepository
    {
        public ObjectMeasurement GetObjectMeasurement(string name)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<ObjectMeasurement> GetDefaultObjectMeasurements()
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<ObjectMeasurement> GetObjectMeasurements()
        {
            throw new System.NotImplementedException();
        }

        public void AddObject(ObjectMeasurement measurement)
        {
            throw new System.NotImplementedException();
        }

        public void RemoveObject(ObjectMeasurement measurement)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<ObjectPack> GetDefaultObjectPacks()
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<ObjectPack> GetObjectPacks()
        {
            throw new System.NotImplementedException();
        }

        public void AddPack(ObjectPack pack)
        {
            throw new System.NotImplementedException();
        }

        public void RemovePack(ObjectPack pack)
        {
            throw new System.NotImplementedException();
        }
    }
}