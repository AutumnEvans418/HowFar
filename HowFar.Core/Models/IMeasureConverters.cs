using System.Collections.ObjectModel;

namespace HowFar.Models
{
    public interface IMeasureConverters
    {
        ObservableCollection<ObjectMeasurement> ObjectMeasurements { get; set; }

        double Convert(ObjectMeasurement from, ObjectMeasurement to, double valueFrom = 1);
        double Convert(string nameFrom, string nameTo, double valueFrom = 1);
        //  double ConvertEff(string nameFrom, string nameTo, double valueFrom = 1);
        ObjectMeasurement Find(string name);
        ObjectMeasurement NewObject(string pluralName, string singleName, double value, ObjectMeasurement measurement, ObjectType type = ObjectType.Unit);
        ObjectMeasurement NewObject(string pluralName, string  singleName, double value, string measurement, ObjectType type = ObjectType.Unit);
    }
}