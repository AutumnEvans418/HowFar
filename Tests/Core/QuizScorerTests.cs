using System;
using System.Collections.ObjectModel;
using AutoFixture;
using AutoFixture.AutoMoq;
using HowFar.Core.Models;
using HowFarApp.Models;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;

namespace Tests
{
    [TestFixture]
    public class QuizScorerTests
    {
        private Fixture fixture;

        [SetUp]
        public void Setup()
        {
            fixture = new Fixture();
            fixture.Customize(new AutoMoqCustomization());
            var connection = new SqliteConnection("DataSource=:memory:");
            connection.Open();
            var options = new DbContextOptionsBuilder<DatabaseContext>().UseSqlite(connection).Options;
            var db = new DatabaseContext(options);
            db.Database.EnsureCreated();
            fixture.Inject(new ObjectRepository(db) as IObjectRepository);
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
        [TestCase(0.9, GradeLetter.A)]
        [TestCase(0.8, GradeLetter.B)]
        [TestCase(0.7, GradeLetter.C)]
        [TestCase(0.6, GradeLetter.D)]
        [TestCase(0.5, GradeLetter.F)]
        public void Quiz100PercentTest(double per, GradeLetter letter)
        {
            var answer = new Answer(){CorrectAnswer = 1, UserInput = per};
            var gradeScore = new QuizScorer(new AnswerScorerPercent());
            var grade = gradeScore.CalculateScore(new []{answer});

            Assert.AreEqual(letter, grade.GradeLetter);
        }


        [Test]
        public void LetterAreCorrect()
        {
            var grade = Grade();
            
            Assert.AreEqual(GradeLetter.A, grade.GradeLetter);

            
        }

        [Test]
        public void RightQuestions()
        {
            var grade = Grade();

            Assert.AreEqual(10, grade.RightQuestions);
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
            
           // Console.WriteLine(JsonConvert.SerializeObject(quiz.Answers, Formatting.Indented));

            var score = grader.CalculateScore(quiz.Answers);

            Assert.AreEqual(quiz.Answers, score.Answers);
           // Console.WriteLine(JsonConvert.SerializeObject(score, Formatting.Indented));
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