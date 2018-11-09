using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HowFar.Models;
using Moq;
using NUnit.Framework;

namespace HowFar.Tests
{
    public static class TestExt
    {
        public static TimeSpan AverageTimeSpan(Action action, int count = 1000)
        {
            var time = new List<TimeSpan>(count);
            for (int i = 0; i < count; i++)
            {
                time.Add(Time(action));
            }
            double doubleAverageTicks = time.Average(timeSpan => timeSpan.Ticks);
            long longAverageTicks = Convert.ToInt64(doubleAverageTicks);

            return new TimeSpan(longAverageTicks);
        }
        public static TimeSpan Time(Action action)
        {
            Stopwatch stopwatch = Stopwatch.StartNew();
            action();
            stopwatch.Stop();
            return stopwatch.Elapsed;
        }
    }
    public class ConverterTests
    {
        private MeasureConverters model;
        [SetUp]
        public void Setup()
        {
            var app = new Mock<IApp>();
           // app.Setup(p => p.Properties).Returns(new Dictionary<object, object>());
            model = new MeasureConverters(app.Object);
        }

        [Test]
        public void CalculateEffeciency()
        {
            var result = TestExt.AverageTimeSpan(() =>
            {
                model.Convert("Centimeters", "Miles");
                model.Convert("Centimeters", "Centimeters");
                model.Convert("Miles", "Centimeters");
            });

            var eff = TestExt.AverageTimeSpan(() =>
            {
                model.ConvertEff("Centimeters", "Miles");
                model.ConvertEff("Centimeters", "Centimeters");
                model.ConvertEff("Miles", "Centimeters");
            });

            Assert.That(()=> eff < result, $"Eff: {eff}, Old: {result}");
        }

        [Test]
        public void NewObject()
        {
            var mil = "Millimeters";
            var cent = "Centimeters";
            model.NewObject(mil, 0.01, cent);
            var result = model.Find(mil);

            Assert.AreEqual(mil, result.Name);
            Assert.AreEqual(cent, result.Measurement.Name);
        }

        [Test]
        public void ObjectCount()
        {
            Assert.True(model.ObjectMeasurements.Count >= 6);
        }

        [Test]
        public void Order()
        {
            var current = double.MinValue;
            foreach (var modelObjectMeasurement in model.ObjectMeasurements)
            {
               var result = model.Convert(modelObjectMeasurement.Name, "Centimeters");
                Assert.True(result > current);
                current = result;
            }
        }

        [Test]
        public void MileToMile()
        {
            Assert.AreEqual(1, model.Convert("Miles", "Miles"));
        }

        [Test]
        public void CentimeterToCentimeter()
        {
            Assert.AreEqual(1, model.Convert("Centimeters", "Centimeters"));
        }
        [Test]
        public void Kilometer2ToCentimeter()
        {
            Assert.AreEqual(200000, model.Convert("Kilometers", "Centimeters", 2));
        }
        [Test]
        public void KilometerToCentimeter()
        {

            Assert.AreEqual(100000,model.Convert("Kilometers", "Centimeters"));
        }

        [Test]
        public void PencilConvert()
        {
            var result = model.NewObject("Pencils", 7.5, "Inches");
            Assert.AreEqual("Pencils", result.Name); ;
           Assert.AreEqual("Inches", result.Measurement.Name); ;

           Assert.AreEqual(8448, model.Convert("Miles", "Pencils"));
        }

        [Test]
        public void CentimeterToKilometer()
        {
          Assert.AreEqual(0.00001  ,model.Convert("Centimeters", "Kilometers"));
        }

        [Test]
        public void ConvertMilesToInches()
        {
          Assert.AreEqual(63360,  model.Convert("Miles", "Inches"));
        }

        //[Test]
        //public void FindMile()
        //{
        //    model.Find("Miles").Name.Assert("Miles");
        //}

        //[Test]
        //public void FindCentimeter()
        //{
        //    var cent = "Centimeters";
        //    model.Find(cent).Name.Assert(cent);
        //}
        //[Test]
        //public void ConvertInchToCm()
        //{
        //    Math.Round(model.Convert("Centimeters", "Inches"), 4).Assert(Math.Round(0.3937, 4));
        //}

        //[Test]
        //public void ConvertCmToInch()
        //{
        //    model.Convert("Inches", "Centimeters").Assert(2.54);
        //}

        //[Test]
        //public void Convert2CmToInch()
        //{
        //    model.Convert("Inches", "Centimeters", 2).Assert(5.08);
        //}
    }
}
