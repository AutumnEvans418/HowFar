using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoFixture;
using AutoFixture.AutoMoq;
using HowFar.Core.Models;
using Moq;
using NUnit.Framework;
using Xamarin.Forms;

namespace HowFar.Tests
{

    public class ConverterTests
    {
        private MeasureConverters model;
        [SetUp]
        public void Setup()
        {
            var fixture = new Fixture();
            fixture.Customize(new AutoMoqCustomization());
            model = fixture.Build<MeasureConverters>().OmitAutoProperties().Create();
        }



        [Test]
        public void NewObject()
        {
            var mil = "Millimeters";
            var cent = "Centimeters";
            model.NewObject(mil, "Millimeter", 0.01, cent);
            var result = model.Find(mil);

            Assert.AreEqual(mil, result.PluralName);
            Assert.AreEqual(cent, result.Measurement.PluralName);
        }

        [Test]
        public void ObjectCount()
        {
            Assert.True(model.ObjectMeasurements.Count >= 6);
        }

        [Test]
        public void PluralNameTest()
        {
            var result = model.Find("Inches");
            var sing = model.Find("Inch");


            Assert.AreEqual(sing, result);
            Assert.AreEqual("Inch", result.SingleName);
            Assert.AreEqual("Inches", result.PluralName);

        }



        [Test]
        public void Order()
        {
            var current = double.MinValue;
            foreach (var modelObjectMeasurement in model.ObjectMeasurements)
            {
                var result = model.Convert(modelObjectMeasurement.PluralName, "Centimeters");
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

            Assert.AreEqual(100000, model.Convert("Kilometers", "Centimeters"));
        }

        

        [Test]
        public void PencilConvert()
        {
            var result = model.NewObject("Pencils", "Pencil", 7.5, "Inches");
            Assert.AreEqual("Pencils", result.PluralName); ;
            Assert.AreEqual("Inches", result.Measurement.PluralName); ;

            Assert.AreEqual(8448, model.Convert("Miles", "Pencils"));
        }

        [Test]
        public void CentimeterToKilometer()
        {
            Assert.AreEqual(0.00001, model.Convert("centimeters", "Kilometers"));
        }

        [Test]
        public void ConvertMilesToInches()
        {
            Assert.AreEqual(63360, model.Convert("Miles", "Inches"));
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
