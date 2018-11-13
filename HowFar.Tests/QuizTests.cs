using System;
using System.Collections.Generic;
using System.Linq;
using AutoFixture;
using AutoFixture.AutoMoq;
using AutoFixture.NUnit3;
using HowFar.Models;
using NUnit.Framework;

namespace HowFar.Tests
{
    [TestFixture]
    public class QuizTests
    {
        private QuizGenerator quiz;

        [SetUp]
        public void Setup()
        {
            var fixture = new Fixture();
            fixture.Customize(new AutoMoqCustomization());

            fixture.Inject(new MeasureConverters(fixture.Create<IApp>()) as IMeasureConverters);
            quiz = fixture.Create<QuizGenerator>();
        }

        [Test, AutoData]
        [Repeat(10)]
        public void CombinatorTest(List<string> data)
        {
            var random = data.Combinator();
           
           // Assert.True(random.All(p=>p.GroupBy(r=>r).Count() == 1));
            Assert.AreEqual(data.Count, random.First().Count());
            Assert.AreEqual(data.Count *2, random.Count() );
        }


        [Test, AutoData]
        [Repeat(10)]
        public void RandomTest(List<string> data, int seed)
        {
            var random = data.Randomize(new Random(seed));

            Assert.AreEqual(data.Count, random.Count());
            Assert.AreEqual(data.GroupBy(p=>p).Count(), random.GroupBy(p=>p).Count());
        }

        [Test, AutoData]
        public void NoQuestionIsTheSame(int size)
        {
            var quizResult = quiz.CreateQuiz(size);
            Console.WriteLine(size);
            Assert.True(quizResult.Questions.GroupBy(p=>new {p.From.SingleName,To= p.To.SingleName}).All(r=>r.Count() ==1));
        }

        [Test, AutoData]
        public void FromToNotTheSame(int size)
        {
            var quizResult = quiz.CreateQuiz(size);

            foreach (var quizResultQuestion in quizResult.Questions)
            {
                Assert.AreNotEqual(quizResultQuestion.From, quizResultQuestion.To);
            }
        }

        [Test, AutoData]
        public void QuizGeneratorTest(int size)
        {
            var quizResult = quiz.CreateQuiz(size);
            
            Assert.AreEqual(size, quizResult.Questions.Count);
        }
    }
}