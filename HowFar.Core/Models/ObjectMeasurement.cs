using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HowFar.Core.Models
{
    public class ObjectMeasurement : IObjectMeasurement
    {
        public override string ToString()
        {
            return Measurement != null ? $"{SingleName}: {Value} {Measurement.PluralName}" : $"{Value} {PluralName}";
        }
     
        [ForeignKey(nameof(Measurement))]
        public string ParentMeasurementSingleName { get; set; }
        public virtual ObjectMeasurement Measurement { get; set; }
        public double Value { get; set; }

        public string Image { get; set; }

        public string PluralName { get; set; }

        public ObjectMeasurement()
        {
            ObjectMeasurements = new List<ObjectMeasurement>();
        }
        public ObjectMeasurement(string singleName, string pluralName)
        {
            SingleName = singleName;
            PluralName = pluralName;
            ObjectMeasurements = new List<ObjectMeasurement>();
        }

        //public IEnumerable<ObjectMeasurement> GetChildren()
        //{
        //    return ObjectMeasurements;
        //}
        public void Add(ObjectMeasurement obj)
        {
            obj.Measurement = this;
            ObjectMeasurements.Add(obj);
        }

        public virtual List<ObjectMeasurement> ObjectMeasurements { get; set; }
        public string SingleName { get; set; }
        public ObjectPack ObjectPack { get; set; }
        public string ObjectPackName { get; set; }
    }
}