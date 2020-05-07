using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace HowFar.Core.Models
{
    public class ObjectPack : BindableBase
    {
        private string _packName;
        private string _description;
        private string _packImage;

#if BRIDGE
        public virtual List<ObjectMeasurement> ObjectMeasurements { get; set; } = new List<ObjectMeasurement>();
#else
        public virtual ObservableCollection<ObjectMeasurement> ObjectMeasurements { get; set; } = new ObservableCollection<ObjectMeasurement>();

#endif
        public override string ToString()
        {
            return PackName;
        }

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

        }
        public ObjectPack(string name,string description)
        {
            PackName = name;
            Description = description;
            PackImage = "https://via.placeholder.com/150";
        }
    }
}