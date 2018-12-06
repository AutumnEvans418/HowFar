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

    public class InlineAutoDataCustAttribute : InlineAutoDataAttribute
    {
        public InlineAutoDataCustAttribute(params object[] arguments) : base(AutoDataCustAttribute.GetFixture(), arguments)
        {

        }
    }
    public class AutoDataCustAttribute : AutoDataAttribute
    {
        public AutoDataCustAttribute() : base(GetFixture())
        {

        }

        public static Func<IFixture> GetFixture()
        {
            return () =>
            {
                var fixture = new Fixture();
                fixture.Behaviors.OfType<ThrowingRecursionBehavior>().ToList()
                    .ForEach(b => fixture.Behaviors.Remove(b));
                fixture.Behaviors.Add(new OmitOnRecursionBehavior());

                return fixture;
            };
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
            fixture.Inject(fixture.Build<AnswerScorerPercent>().OmitAutoProperties().Create<AnswerScorerPercent>() as IAnswerScorer);
        }

        [Test]
        public void QuizPoints()
        {
            IGrade score = Grade();

            Assert.AreEqual(10, score.ActualPoints);
        }

        [Test]
        public void QuizPointsPossible()
        {
            var score = Grade();
            Assert.AreEqual(10, score.PossiblePoints);
        }
        [Test]
        public void QuizPercent()
        {
            var score = Grade();
            Assert.AreEqual(1, score.Percent);
        }

        [Test]
        public void Quiz100PercentATest()
        {
            IGrade score = Grade();
            //Assert.AreEqual(10, score.RightQuestions);
            Assert.AreEqual(GradeLetter.A, score.GradeLetter);
           

        }

        [Test]
        [TestCase(0.0124274238447467)]
        [TestCase(-0.0124274238447467)]
        [TestCase(528000000)]
        [TestCase(4.55846688E+22)]
        [TestCase(8702527680000)]
        public void ScoreTest(double data)
        {
            var score = new AnswerScorerPercent();
            var answer = new Answer {UserInput = data, CorrectAnswer = data};

            var result = score.GetScore(answer);
            Assert.AreEqual(1, result);
        }


        [Test]
        public void Quiz100PercentTest()
        {
            IGrade score = Grade();
            Assert.AreEqual(10, score.TotalQuestions);

        }

        private IGrade Grade()
        {
            var grader = fixture.Build<QuizScorer>().OmitAutoProperties().Create<QuizScorer>();
            var generator = fixture.Build<QuizGenerator>().OmitAutoProperties().Create<QuizGenerator>();

            var quiz = generator.CreateQuiz(10);
            foreach (var quizQuestion in quiz.Answers)
            {
                quizQuestion.UserInput = quizQuestion.CorrectAnswer;
                Assert.AreEqual(quizQuestion.CorrectAnswer, quizQuestion.UserInput);
            }
            var ansscore = new AnswerScorerPercent();

            foreach (var quizAnswer in quiz.Answers)
            {
                Console.WriteLine(quizAnswer.CorrectAnswer);
                var result = ansscore.GetScore(quizAnswer);
                Assert.AreEqual(1, result);
            }
            
            Console.WriteLine(JsonConvert.SerializeObject(quiz.Answers, Formatting.Indented));

            var score = grader.CalculateScore(quiz.Answers);
            Console.WriteLine(JsonConvert.SerializeObject(score, Formatting.Indented));
            Assert.AreEqual(10, score.TotalQuestions);
            return score;
        }

        [Test, AutoDataCust]
        [InlineAutoDataCust(10)]
        [InlineAutoDataCust(-10)]
        [InlineAutoDataCust(1)]
        [InlineAutoDataCust(2)]
        public void AnsCustwer100LargePercentTest(int input, AnswerScorerPercent percent, Answer answer)
        {
            answer.UserInput = input;
            answer.CorrectAnswer = input;
            Assert.AreEqual(1, percent.GetScore(answer));
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
            answer.UserInput = 0;
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