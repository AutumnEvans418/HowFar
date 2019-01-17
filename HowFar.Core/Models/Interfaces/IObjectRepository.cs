using System;
using System.Collections.Generic;

namespace HowFar.Core.Models
{
    public interface IObjectRepository : IDisposable
    {
        ObjectMeasurement GetObjectMeasurement(string name);
        IEnumerable<ObjectMeasurement> GetObjectMeasurements();
        void AddObject(ObjectMeasurement measurement);
        void RemoveObject(ObjectMeasurement measurement);
        IEnumerable<ObjectPack> GetObjectPacks();
        void AddPack(ObjectPack pack);
        void RemovePack(ObjectPack pack);
        void UpdateObject(ObjectMeasurement selectedObject);
        //void UpdatePack(string packName, ObjectMeasurement objectM);
        ObjectMeasurement NewObject(string plural, string single, double value, ObjectMeasurement parent, string pack);
    }
}