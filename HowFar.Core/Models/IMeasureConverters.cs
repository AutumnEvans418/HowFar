using System.Collections.ObjectModel;

namespace HowFar.Models
{
    public interface IMeasureConverters
    {
        ObservableCollection<ObjectMeasurement> ObjectMeasurements { get; set; }

        double Convert(string nameFrom, string nameTo, double valueFrom = 1);
        double ConvertEff(string nameFrom, string nameTo, double valueFrom = 1);
        ObjectMeasurement Find(string name);
        ObjectMeasurement NewObject(string name, double value, ObjectMeasurement measurement, ObjectType type = ObjectType.Unit);
        ObjectMeasurement NewObject(string name, double value, string measurement, ObjectType type = ObjectType.Unit);
    }
}