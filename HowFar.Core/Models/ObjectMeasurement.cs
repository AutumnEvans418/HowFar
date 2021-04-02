using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace HowFar.Core.Models
{
    public class ObjectMeasurement : BindableBase, IObjectMeasurement
    {
        private string _image;
        private ObjectMeasurement _measurement;
        private List<ObjectMeasurement> _objectMeasurements;
        private ObjectPack _objectPack;
        private string _objectPackName;
        private string _parentMeasurementSingleName;
        private string _pluralName;
        private string _singleName;
        private double _value;
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
        [ForeignKey(nameof(Measurement))]
        public int? ParentObjectMeasurementId { get; set; }
        public int Id { get; set; }
        public string Image
        {
            get => _image;
            set => SetProperty(ref _image, value);
        }

        [JsonIgnore]
        public virtual ObjectMeasurement Measurement
        {
            get => _measurement;
            set => SetProperty(ref _measurement, value);
        }

        [JsonIgnore]
        public virtual List<ObjectMeasurement> ObjectMeasurements
        {
            get => _objectMeasurements;
            set => SetProperty(ref _objectMeasurements, value);
        }

        [JsonIgnore]
        public ObjectPack ObjectPack
        {
            get => _objectPack;
            set => SetProperty(ref _objectPack, value);
        }

        public int? ObjectPackId { get; set; }
        //public string ObjectPackName => ObjectPack.Name;

        //public string ParentMeasurementSingleName => Measurement.SingleName;

        public string PluralName
        {
            get => _pluralName;
            set => SetProperty(ref _pluralName, value);
        }

        public string SingleName
        {
            get => _singleName;
            set => SetProperty(ref _singleName, value);
        }

        public double Value
        {
            get => _value;
            set => SetProperty(ref _value, value);
        }

        public void Add(ObjectMeasurement obj)
        {
            obj.Measurement = this;
            ObjectMeasurements.Add(obj);
        }

        public override string ToString()
        {
            return Measurement != null ? $"{SingleName}: {Value} {Measurement.PluralName}" : $"{Value} {PluralName}";
        }
    }
}