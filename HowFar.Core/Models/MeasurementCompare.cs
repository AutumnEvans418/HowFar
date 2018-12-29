using System.Collections.Generic;

namespace HowFar.Core.Models
{
    internal class MeasurementCompare : IComparer<ObjectMeasurement>
    {
        private readonly IMeasureConverters _converters;

        public MeasurementCompare(IMeasureConverters converters)
        {
            _converters = converters;
        }
        public int Compare(ObjectMeasurement x, ObjectMeasurement y)
        {
            var xtoy = _converters.Convert(x, y);
            if (xtoy > 1) return 1;
            return -1;
        }
    }
}