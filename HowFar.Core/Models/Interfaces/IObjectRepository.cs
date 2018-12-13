using System.Collections.Generic;

namespace HowFar.Core.Models
{
    public interface IObjectRepository
    {
        ObjectMeasurement GetObjectMeasurement(string name);
        IEnumerable<ObjectMeasurement> GetObjectMeasurements();
        void AddObject(ObjectMeasurement measurement);
        void RemoveObject(ObjectMeasurement measurement);
        IEnumerable<ObjectPack> GetObjectPacks();
        void AddPack(ObjectPack pack);
        void RemovePack(ObjectPack pack);
    }
}