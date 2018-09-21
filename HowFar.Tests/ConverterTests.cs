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
            var mil = "Millimeter";
            var cent = "Centimeter";
            model.NewObject(mil, cent, 0.01);
            var result = model.Find(mil);
            result.Name.Assert(mil);
            result.Measurement.Name.Assert(cent);
        }

        [Test]
        public void ObjectCount()
        {
            model.ObjectMeasurements.Count.Assert(6);
        }

        [Test]
        public void Kilometer2ToCentimeter()
        {
            model.Convert("Kilometer", "Centimeter",2).Assert(200000);
        }
        [Test]
        public void KilometerToCentimeter()
        {
            model.Convert("Kilometer", "Centimeter").Assert(100000);
        }

        [Test]
        public void PencilConvert()
        {
           var result = model.NewObject("Pencil","Inch", 7.5);
            result.Name.Assert("Pencil");
            result.Measurement.Name.Assert("Inch");

            model.Convert("Mile", "Pencil").Assert(8448);
        }

        [Test]
        public void CentimeterToKilometer()
        {
            model.Convert("Centimeter", "Kilometer").Assert(0.00001);
        }

        [Test]
        public void ConvertMilesToInches()
        {
            model.Convert("Mile", "Inch").Assert(63360);
        }

        [Test]
        public void FindMile()
        {
            model.Find("Mile").Name.Assert("Mile");
        }

        [Test]
        public void FindCentimeter()
        {
            var cent = "Centimeter";
            model.Find(cent).Name.Assert(cent);
        }
        [Test]
        public void ConvertInchToCm()
        {
            Math.Round(model.Convert("Centimeter", "Inch"), 4).Assert(Math.Round(0.3937, 4));
        }

        [Test]
        public void ConvertCmToInch()
        {
            model.Convert("Inch", "Centimeter").Assert(2.54);
        }

        [Test]
        public void Convert2CmToInch()
        {
            model.Convert("Inch", "Centimeter", 2).Assert(5.08);
        }
    }
}
