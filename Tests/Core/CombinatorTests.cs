using System;
using System.Collections.Generic;
using System.Linq;
using AutoFixture.NUnit3;
using HowFar.Core.Models;
using Newtonsoft.Json;
using NUnit.Framework;

namespace Tests
{
    [TestFixture]
    public class CombinatorTests
    {


        [Test, AutoData]
        public void AdvancedCombinatorRandomTest(List<int> data)
        {

            var result = data.Combinator().ToList();
            //1,2,3,4
            //2,3,4,1
            //3,4,1,2
            //4,1,2,3


            Console.WriteLine(JsonConvert.SerializeObject(result));


            Assert.AreEqual(data.Count * 2, result.Count);
            Assert.AreEqual(data.Count, result.First().Count);
        }

        [Test]
        public void Single()
        {
            var data = new[] {1, 2, 3};

            var result = data.Combinator(1).ToList();

            Assert.AreEqual(3, result.Count);
            Assert.AreEqual(1, result.First().Count);
        }

        //1,2,3,4
        //2,3,4,1
        //3,4,1,2
        //4,1,2,3

        //1,2,3
        //2,3,1
        //3,1,2

        //1,2
        //2,1

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
        public void MultiTypeCombinatorTest()
        {
            var numData = new[]{1, 2};
            var strData = new[] {"2", "1"};

            var result = numData.Combinator(2, strData);

            Assert.AreEqual(4, result.Count);
            Assert.AreEqual(3, result.First().Count);



            Assert.AreEqual(1, result[0][0]);
            Assert.AreEqual(2, result[0][1]);
            Assert.AreEqual("2", result[0][2]);
            Assert.AreEqual(1, result[1][0]);
            Assert.AreEqual(2, result[1][1]);
            Assert.AreEqual("1", result[1][2]);

            Assert.AreEqual(2, result[2][0]);
            Assert.AreEqual(1, result[2][1]);
            Assert.AreEqual("2", result[2][2]);
            Assert.AreEqual(2, result[3][0]);
            Assert.AreEqual(1, result[3][1]);
            Assert.AreEqual("1", result[3][2]);
            //1,2, "1"
            //1,2, "2"
            //2,1, "2"
            //2,1, "1"

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