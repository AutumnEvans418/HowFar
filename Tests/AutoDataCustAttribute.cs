using System;
using System.Linq;
using AutoFixture;
using AutoFixture.NUnit3;

namespace Tests
{
    public class AutoDataCustAttribute : AutoDataAttribute
    {
        public AutoDataCustAttribute() : base(GetFixture())
        {

        }

        public static Func<IFixture> GetFixture()
        {
            return () =>
            {
                var fixture = new Fixture();
                fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList()
                    .ForEach(b => fixture.Behaviors.Remove(b));
                fixture.Behaviors.Add(new OmitOnRecursionBehavior());

                return fixture;
            };
        }
    }
}