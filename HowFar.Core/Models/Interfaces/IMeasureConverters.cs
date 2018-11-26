using System.Collections.ObjectModel;

namespace HowFar.Core.Models
{
    public interface IMeasureConverters
    {
        ObservableCollection<ObjectMeasurement> ObjectMeasurements { get; set; }
        ObservableCollection<ObjectPack> ObjectPacks { get; set; }
        double Convert(ObjectMeasurement from, ObjectMeasurement to, double valueFrom = 1);
        double Convert(string nameFrom, string nameTo, double valueFrom = 1);
        //  double ConvertEff(string nameFrom, string nameTo, double valueFrom = 1);
        ObjectMeasurement Find(string name);
        ObjectMeasurement NewObject(string pluralName, string singleName, double value, ObjectMeasurement measurement, string pack = "Custom");
        ObjectMeasurement NewObject(string pluralName, string  singleName, double value, string measurement, string pack = "Custom");
    }

    public class ObjectPack
    {
        public ObservableCollection<ObjectMeasurement> ObjectMeasurements { get; set; }
        public string PackName { get; set; }
        public string PackImage { get; set; }
        public ObjectPack()
        {
            ObjectMeasurements = new ObservableCollection<ObjectMeasurement>();
        }
    }
}