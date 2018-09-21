using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HowFar.Models;
using NUnit.Framework;
using Peerless.Testing;

namespace HowFar.Tests
{
    public class ConverterTests
    {
        private MeasureConverters model;
        [SetUp]
        public void Setup()
        {
            model = new MeasureConverters();
        }

        [Test]
        public void NewObject()
        {
            var mil = "Millimeters";
            var cent = "Centimeters";
            model.NewObject(mil, cent, 0.01);
            var result = model.Find(mil);
            result.Name.Assert(mil);
            result.Measurement.Name.Assert(cent);
        }

        [Test]
        public void ObjectCount()
        {
            model.ObjectMeasurements.Count.Assert(p=> p >= 6);
        }

        [Test]
        public void Order()
        {
            var current = double.MinValue;
            foreach (var modelObjectMeasurement in model.ObjectMeasurements)
            {
               var result = model.Convert(modelObjectMeasurement.Name, "Centimeters");
                result.Assert(p=> p > current);
                current = result;
            }
        }

        [Test]
        public void MileToMile()
        {
            model.Convert("Miles","Miles").Assert(1);
        }

        [Test]
        public void CentimeterToCentimeter()
        {
            model.Convert("Centimeters","Centimeters").Assert(1);
        }
        [Test]
        public void Kilometer2ToCentimeter()
        {
            model.Convert("Kilometers", "Centimeters",2).Assert(200000);
        }
        [Test]
        public void KilometerToCentimeter()
        {
            model.Convert("Kilometers", "Centimeters").Assert(100000);
        }

        [Test]
        public void PencilConvert()
        {
           var result = model.NewObject("Pencils","Inches", 7.5);
            result.Name.Assert("Pencils");
            result.Measurement.Name.Assert("Inches");

            model.Convert("Miles", "Pencils").Assert(8448);
        }

        [Test]
        public void CentimeterToKilometer()
        {
            model.Convert("Centimeters", "Kilometers").Assert(0.00001);
        }

        [Test]
        public void ConvertMilesToInches()
        {
            model.Convert("Miles", "Inches").Assert(63360);
        }

        [Test]
        public void FindMile()
        {
            model.Find("Miles").Name.Assert("Miles");
        }

        [Test]
        public void FindCentimeter()
        {
            var cent = "Centimeters";
            model.Find(cent).Name.Assert(cent);
        }
        [Test]
        public void ConvertInchToCm()
        {
            Math.Round(model.Convert("Centimeters", "Inches"), 4).Assert(Math.Round(0.3937, 4));
        }

        [Test]
        public void ConvertCmToInch()
        {
            model.Convert("Inches", "Centimeters").Assert(2.54);
        }

        [Test]
        public void Convert2CmToInch()
        {
            model.Convert("Inches", "Centimeters", 2).Assert(5.08);
        }
    }
}
