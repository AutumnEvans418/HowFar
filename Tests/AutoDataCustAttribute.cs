using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoFixture;
using AutoFixture.NUnit3;
using HowFar.Core;
using HowFar.Core.Models;
using NUnit.Framework;

namespace Tests
{
  

    public class AppModel : IAppCache
    {
        public IProperties Properties { get; } = new Properties(new Dictionary<string, object>());

        public async Task SavePropertiesAsync()
        {

        }
    }
    [TestFixture]
    public class BridgeTests
    {
        [Test]
        public void Tests()
        {
            var converter = new MeasureConverters(new ObjectRepositoryCache(new AppModel()));

        }
    }


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