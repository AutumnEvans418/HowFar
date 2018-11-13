using System;
using System.Collections.Generic;
using System.Linq;

namespace HowFar.Core.Models
{
    public class QuizGenerator
    {
        private readonly IMeasureConverters _converters;

        private Random random;
        public QuizGenerator(IMeasureConverters converters, int seed)
        {
            random = new Random(seed);
            _converters = converters;
        }

        public Quiz CreateQuiz(int size, int maximumQty = 30)
        {
            var items = _converters.ObjectMeasurements.Randomize(random).ToList();
            var t = items.Combinator(2).Select(p=> new Question(){From = p[0], To = p[1], FromQuantity = random.Next(1, maximumQty)}).ToList();
            while (t.Count < size)
            {
                t.AddRange(t.Select(p => 
                {
                    p.FromQuantity = random.Next(1, maximumQty);
                    return p;
                }).ToList());

                t = t.GroupBy(p => new {p.To, p.FromQuantity, p.From}).Select(p =>
                    new Question() {From = p.Key.From, To = p.Key.To, FromQuantity = p.Key.FromQuantity}).ToList();
            }
            var quiz = new Quiz();
            for (int i = 0; i < size; i++)
            {
                var question = t[i];
                quiz.Questions.Add(question);
                quiz.Answers.Add(new Answer(){Question = question, CorrectAnswer = _converters.Convert(question.From,question.To,question.FromQuantity)});

            }

            return quiz;
        }
    }

    public enum GradeLetter
    {
        A,
        B,
        C,
        D,
        F
    }

    public class Grade : IGrade
    {
        public GradeLetter GradeLetter => GetLetter();

        private GradeLetter GetLetter()
        {
            var percent = Percent;
            if (percent < .6) return GradeLetter.F;
            if (percent < .7) return GradeLetter.D;
            if (percent < .8) return GradeLetter.C;
            if (percent < .9) return GradeLetter.B;
            return GradeLetter.A;
        }

        public double Percent => ActualPoints / PossiblePoints;
        public double PossiblePoints { get; set; }
        public double ActualPoints { get; set; }
        public int RightQuestions { get; set; }
        public int TotalQuestions { get; set; }
    }

    public class QuizScorer : IQuizScorer
    {
        private readonly IAnswerScorer _answerScorer;

        public QuizScorer(IAnswerScorer answerScorer)
        {
            _answerScorer = answerScorer;
        }
        public IGrade CalculateScore(IEnumerable<Answer> answers)
        {
            var grade = new Grade
            {
                TotalQuestions = answers.Count(),
                PossiblePoints = _answerScorer.MaxScore,
                RightQuestions = answers.Count(p => _answerScorer.GetScore(p) > 0),
                ActualPoints = answers.Sum(p=> _answerScorer.GetScore(p))
            };
            return grade;
        }
    }

    public interface IGrade
    {
        GradeLetter GradeLetter { get; }
        double Percent { get; }
        double PossiblePoints { get; }
        double ActualPoints { get; }
        int RightQuestions { get; }
        int TotalQuestions { get; }
    }

    public class AnswerScorer : IAnswerScorer
    {
        public double GetScore(Answer answer)
        {
            throw new NotImplementedException();
        }

        public double MaxScore { get; }
    }
    public interface IAnswerScorer
    {
        double GetScore(Answer answer);
        double MaxScore { get; }
    }
    public interface IQuizScorer
    {
        IGrade CalculateScore(IEnumerable<Answer> answers);
    }
}