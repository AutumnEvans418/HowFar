using System;
using System.Collections.Generic;
using System.Linq;
using AutoFixture;
using AutoFixture.AutoMoq;
using AutoFixture.NUnit3;
using HowFar.Core.Models;
using HowFarApp.Models;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;

namespace Tests
{
    [TestFixture]
    public class QuizTests
    {
        private QuizGenerator quiz;
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
            quiz = fixture.Create<QuizGenerator>();
        }

        [Test, AutoData]
        [Repeat(10)]
        public void CombinatorTest(List<string> data)
        {
            var random = data.Combinator();

            // Assert.True(random.All(p=>p.GroupBy(r=>r).Count() == 1));
            Assert.AreEqual(data.Count, random.First().Count());
            Assert.AreEqual(data.Count * 2, random.Count());
        }


        [Test, AutoData]
        [Repeat(10)]
        public void RandomTest(List<string> data, int seed)
        {
            var random = data.Randomize(new Random(seed));

            Assert.AreEqual(data.Count, random.Count());
            Assert.AreEqual(data.GroupBy(p => p).Count(), random.GroupBy(p => p).Count());
        }

        [Test]
        public void Quiz50RightIs50()
        {
            var quizResult = quiz.CreateQuiz(10);

            var count = quizResult.Answers.Count;
            var half = count / 2;

             foreach (var answer in quizResult.Answers.Take(half))
             {
                 answer.UserInput = answer.CorrectAnswer;
             }

            var score = new QuizScorer(new AnswerScorerPercent());
            var result = score.CalculateScore(quizResult.Answers);
            Assert.AreEqual(0.5,result.Percent);
        }

        [Test]
        public void QuizDifficutly()
        {
            var quizs = quiz.CreateQuiz(5, HowFar.Core.Models.QuizDifficulty.Beginner);

           Assert.True( quizs.Answers.All(p => p.CorrectAnswer <= 100));
        }

        [Test]
        public void MaxQuizTest()
        {
            Assert.Throws<InvalidOperationException>(() => this.quiz.CreateQuiz(1000));
        }
        [Test]
        public void CorrectAnswerMatchesConverter()
        {
            var quizResult = quiz.CreateQuiz(20);
            var converter = fixture.Create<IMeasureConverters>();
            foreach (var quizResultAnswer in quizResult.Answers)
            {
                Assert.AreEqual(converter.Convert(quizResultAnswer.Question.From, quizResultAnswer.Question.To, quizResultAnswer.Question.FromQuantity), quizResultAnswer.CorrectAnswer);
            }
        }

        [Test]
        public void NoQuestionIsTheSame([Random(1, 10, 4)]int size)
        {
            var quizResult = quiz.CreateQuiz(size);
            Assert.True(quizResult.Questions.GroupBy(p => new { p.From.SingleName, To = p.To.SingleName, p.FromQuantity }).All(r => r.Count() == 1));
        }


        [Test]
        public void QuizGreaterThan1()
        {
            var result = quiz.CreateQuiz(10, HowFar.Core.Models.QuizDifficulty.Beginner);

            foreach (var resultAnswer in result.Answers)
            {
                Assert.True(resultAnswer.CorrectAnswer > 1);
            }
        }

        [Test]
        public void QuizDifficulty()
        {
            var result = quiz.CreateQuiz(10, HowFar.Core.Models.QuizDifficulty.Beginner);

            foreach (var resultAnswer in result.Answers)
            {
                var value = resultAnswer.CorrectAnswer;
                if (value < 0)
                {
                    value = 1 / value;
                }
                Assert.True(value <= (int)HowFar.Core.Models.QuizDifficulty.Beginner);
            }
        }

        [Test]
        public void NoQuestionIsTheSameQuestion()
        {
            var quizResult = quiz.CreateQuiz(10);
            Assert.True(quizResult.Questions.GroupBy(p => new { p.From.SingleName, To = p.To.SingleName }).All(r => r.Count() == 1));
        }

        [Test, AutoData]
        public void FromToNotTheSame()
        {
            var quizResult = quiz.CreateQuiz(50);

            foreach (var quizResultQuestion in quizResult.Questions)
            {
                Assert.AreNotEqual(quizResultQuestion.From, quizResultQuestion.To);
            }
        }

        [Test, AutoData]
        public void QuizTextUsesCorrectGrammer()
        {
            var quizResult = quiz.CreateQuiz(10);

            foreach (var quizResultQuestion in quizResult.Questions)
            {
                Assert.AreEqual($"How many '{quizResultQuestion.To.PluralName}' are in {quizResultQuestion.FromQuantity} '{quizResultQuestion.From.PluralName}'?", quizResultQuestion.QuestionText);
            }

        }

        [Test, AutoData]
        public void QuizGeneratorTest()
        {
            var quizResult = quiz.CreateQuiz(20);

            Assert.AreEqual(20, quizResult.Questions.Count);
        }
    }
}