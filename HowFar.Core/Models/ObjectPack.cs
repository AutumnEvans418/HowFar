using System.Collections.ObjectModel;

namespace HowFar.Core.Models
{
    public class ObjectPack
    {
        public virtual ObservableCollection<ObjectMeasurement> ObjectMeasurements { get; set; }
        public string PackName { get; set; }
        public string Name => PackName;
        public string ImageURL => PackImage;
        public string Description { get; set; }
        public string PackImage { get; set; }

        public ObjectPack()
        {
            
        }
        public ObjectPack(string name,string description)
        {
            PackName = name;
            Description = description;
            ObjectMeasurements = new ObservableCollection<ObjectMeasurement>();
            PackImage = "https://via.placeholder.com/150";
        }
    }
}