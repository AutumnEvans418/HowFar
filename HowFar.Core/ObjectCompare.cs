using HowFar.Core.Models;

namespace HowFar.Core
{
    public class ObjectCompare
    {
        public ObjectMeasurement From { get; set; }
        public ObjectMeasurement To { get; set; }
        public double ToQty { get; set; }
        public string Result => $"A {From.SingleName} is {ToQty:N} {To.PluralName}";
        public override string ToString()
        {
            return Result;
        }
    }
}