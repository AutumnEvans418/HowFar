using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HowFar.Core.Models
{
    public interface IDatabase : IDisposable
    {
        void Add(ObjectMeasurement objectMeasurement);
        int SaveChanges();
        IEnumerable<ObjectMeasurement> ObjectMeasurements { get; }
        void Update(ObjectMeasurement centimeter);
    }
}