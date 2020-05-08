using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace HowFar.Core.Models
{
    public class ObjectMeasurement : BindableBase, IObjectMeasurement
    {
        private double _value;
        private string _image;
        private string _pluralName;
        private List<ObjectMeasurement> _objectMeasurements;
        private string _singleName;
        private ObjectPack _objectPack;
        private string _objectPackName;
        private ObjectMeasurement _measurement;
        private string _parentMeasurementSingleName;

        public override string ToString()
        {
            return Measurement != null ? $"{SingleName}: {Value} {Measurement.PluralName}" : $"{Value} {PluralName}";
        }

        [ForeignKey(nameof(Measurement))]
        public string ParentMeasurementSingleName
        {
            get => _parentMeasurementSingleName;
            set => SetProperty(ref _parentMeasurementSingleName,value);
        }
        [JsonIgnore]
        public virtual ObjectMeasurement Measurement
        {
            get => _measurement;
            set => SetProperty(ref _measurement,value);
        }

        public double Value
        {
            get => _value;
            set => SetProperty(ref _value,value);
        }

        public string Image
        {
            get => _image;
            set => SetProperty(ref _image,value);
        }

        public string PluralName
        {
            get => _pluralName;
            set => SetProperty(ref _pluralName,value);
        }

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
        [JsonIgnore]
        public virtual List<ObjectMeasurement> ObjectMeasurements
        {
            get => _objectMeasurements;
            set => SetProperty(ref _objectMeasurements,value);
        }

        public string SingleName
        {
            get => _singleName;
            set => SetProperty(ref _singleName,value);
        }
        [JsonIgnore]
        public ObjectPack ObjectPack
        {
            get => _objectPack;
            set => SetProperty(ref _objectPack,value);
        }

        public string ObjectPackName
        {
            get => _objectPackName;
            set => SetProperty(ref _objectPackName,value);
        }
    }
}