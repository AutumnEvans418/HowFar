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
        public void Single()
        {
            var data = new[] {1, 2, 3};

            var result = data.Combinator(1).ToList();

            Assert.AreEqual(3, result.Count);
            Assert.AreEqual(1, result.First().Count);
        }

        [Test]
        public void AdvancedCombinatorTest()
        {
            var data = new[] {1, 2, 3};

            var result = data.Combinator(2).ToList();
            //1,2
            //1,3
            //2,3
            //2,1
            //3,1
            //3,2
            Console.WriteLine(JsonConvert.SerializeObject(result));



            Assert.AreEqual(6, result.Count);
            Assert.AreEqual(2, result.First().Count);
        }


        [Test]
        public void SimpleCombinatorTest()
        {
            var data = new List<int>(){1,2};

            var result = data.Combinator(2).ToList();
            Console.WriteLine(JsonConvert.SerializeObject(result));

            Assert.AreEqual(2, result.Count);
            Assert.AreEqual(2, result.First().Count);



            Assert.AreEqual(1, result[0][0]);
            Assert.AreEqual(2, result[0][1]);
            Assert.AreEqual(2, result[1][0]);
            Assert.AreEqual(1, result[1][1]);
            //1,2
            //2,1


        }
    }
}