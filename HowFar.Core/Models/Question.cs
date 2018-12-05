namespace HowFar.Core.Models
{
    public class Question
    {
        public ObjectMeasurement From { get; set; }
        public ObjectMeasurement To { get; set; }
        public int FromQuantity { get; set; }
        public string QuestionText => $"How many '{To.PluralName}' are in {FromQuantity} '{From.PluralName}'?";
    }
}