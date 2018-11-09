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