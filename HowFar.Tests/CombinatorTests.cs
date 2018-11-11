using System;
using System.Collections.Generic;
using System.Linq;
using HowFar.Models;
using Newtonsoft.Json;
using NUnit.Framework;

namespace HowFar.Tests
{
    [TestFixture]
    public class CombinatorTests
    {
        [Test]
        public void SimpleCombinatorTest()
        {
            var data = new List<int>(){1,2};

            var result = data.Combinator().ToList();

            Assert.AreEqual(2, result.Count);
            Assert.AreEqual(2, result.First().Length);


            Console.WriteLine(JsonConvert.SerializeObject(result));
            Assert.True(result.Any(p=> p[0] == 1 && p[1] == 2));
            Assert.True(result.Any(p=> p[0] == 2 && p[1] == 1));
        }
    }
}