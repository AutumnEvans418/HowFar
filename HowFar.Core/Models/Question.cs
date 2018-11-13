namespace HowFar.Core.Models
{
    public struct Question
    {
        public ObjectMeasurement From { get; set; }
        public ObjectMeasurement To { get; set; }
        public int FromQuantity { get; set; }
    }
}