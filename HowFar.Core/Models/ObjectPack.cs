using System.Collections.ObjectModel;

namespace HowFar.Core.Models
{
    public class ObjectPack : BindableBase
    {
        private string _packName;
        private string _description;
        private string _packImage;
        public virtual ObservableCollection<ObjectMeasurement> ObjectMeasurements { get; set; }

        public string PackName
        {
            get => _packName;
            set => SetProperty(ref _packName, value);
        }

        public string Name => PackName;
        public string ImageURL => PackImage;

        public string Description
        {
            get => _description;
            set => SetProperty(ref _description,value);
        }

        public string PackImage
        {
            get => _packImage;
            set => SetProperty(ref _packImage,value);
        }

        public ObjectPack()
        {
            ObjectMeasurements = new ObservableCollection<ObjectMeasurement>();
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