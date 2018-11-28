using System.Collections.ObjectModel;

namespace HowFar.Core.Models
{
    public class ObjectPack
    {

        public ObservableCollection<ObjectMeasurement> ObjectMeasurements { get; set; }
        public string PackName { get; set; }
        public string Name => PackName;
        public string ImageURL => PackImage;
        public string Description { get; set; }
        public string PackImage { get; set; }
        public ObjectPack()
        {
            ObjectMeasurements = new ObservableCollection<ObjectMeasurement>();
            PackImage = "https://via.placeholder.com/150";
        }
    }
}