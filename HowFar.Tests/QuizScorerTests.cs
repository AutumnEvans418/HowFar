using System;
using System.Linq;
using AutoFixture;
using AutoFixture.AutoMoq;
using AutoFixture.NUnit3;
using HowFar.Core.Models;
using Newtonsoft.Json;
using NUnit.Framework;

namespace HowFar.Tests
{
    public class AutoDataCustAttribute : AutoDataAttribute
    {
        public AutoDataCustAttribute() : base(() => {
            var fixture = new Fixture();
            fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList()
                .ForEach(b => fixture.Behaviors.Remove(b));
            fixture.Behaviors.Add(new OmitOnRecursionBehavior());
           
            return fixture;
        })
        {
            
        }
    }

    [TestFixture]
    public class QuizScorerTests
    {
        private Fixture fixture;

        [SetUp]
        public void Setup()
        {
           fixture = new Fixture();
            fixture.Customize(new AutoMoqCustomization());

            fixture.Inject(fixture.Build<MeasureConverters>().OmitAutoProperties().Create() as IMeasureConverters);
            fixture.Inject(fixture.Create<AnswerScorerPercent>() as IAnswerScorer);
        }


        [Test]
        public void Quiz100PercentTest()
        {
           
            var grader = fixture.Create<QuizScorer>();
            var generator = fixture.Create<QuizGenerator>();

            var quiz = generator.CreateQuiz(10);
            foreach (var quizQuestion in quiz.Answers)
            {
                quizQuestion.UserInput = quizQuestion.CorrectAnswer;
            }

            var score = grader.CalculateScore(quiz.Answers);
            Console.WriteLine(JsonConvert.SerializeObject(score, Formatting.Indented));
            Assert.AreEqual(10, score.TotalQuestions);
            Assert.AreEqual(10, score.RightQuestions);
            Assert.AreEqual(GradeLetter.A, score.GradeLetter);
            Assert.AreEqual(10, score.PossiblePoints);
            Assert.AreEqual(10, score.ActualPoints);
            Assert.AreEqual(1, score.Percent);

        }



        [Test, AutoDataCust]
        public void Answer100PercentTest(AnswerScorerPercent percent, Answer answer)
        {
            answer.UserInput = 10;
            answer.CorrectAnswer = 10;
            Assert.AreEqual(1, percent.GetScore(answer));
        }
        [Test, AutoDataCust]
        public void Answer0PercentTest(AnswerScorerPercent percent, Answer answer)
        {
            answer.UserInput = null;
            answer.CorrectAnswer = 100;
            Assert.AreEqual(0, percent.GetScore(answer));
        }

        [Test, AutoDataCust]
        public void Answer95PercentTest(AnswerScorerPercent percent, Answer answer)
        {
            answer.UserInput = 95;
            answer.CorrectAnswer = 100;
            Assert.AreEqual(.95, percent.GetScore(answer));
        }
    }
}