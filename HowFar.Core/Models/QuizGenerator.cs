using System;
using System.Linq;

namespace HowFar.Core.Models
{

    public enum QuizDifficulty : int
    {
        Beginner = 50,
        Novice = 100,
        Experienced = 1000,
        Expert = 100000,
        Metrologist = 100000000,
        GOD = 1000000000
    }

    public class QuizGenerator : IQuizGenerator
    {
        private readonly IMeasureConverters _converters;

        private Random random;
        public QuizGenerator(IMeasureConverters converters, int seed)
        {
            random = new Random(seed);
            _converters = converters;
        }

        public int MaxQuizSize => _converters.ObjectMeasurements.Count * _converters.ObjectMeasurements.Count;

        public Quiz CreateQuiz(int size, QuizDifficulty difficulty, int maximumQty = 3)
        {
            return CreateQuiz(size, maximumQty, (int) difficulty);
        }

        public Quiz CreateQuiz(int size, int maximumQty = 3, int maximumRange = int.MaxValue)
        {
            if (size > MaxQuizSize)
            {
                throw new InvalidOperationException($"the quiz is too large. MaxSize: {MaxQuizSize}");
            }
            var items = _converters.ObjectMeasurements.ToList();

            var combination = items.Combinator(2, Enumerable.Range(1, maximumQty)).Randomize(random);
            
            var t = combination.Select(p=> new Question(){From = p[0] as ObjectMeasurement, To = p[1] as ObjectMeasurement, FromQuantity = (int)p[2]})
                .Where(p=> Convert(p) > 1)
                .Where(p=>
                {
                  var result =  Math.Abs(Convert(p));
                    return result <= maximumRange;
                }).ToList();
            var group = t.GroupBy(p => new {p.To, p.From}).ToList();
            if (group.Count >= size)
            {
                t = group.Select(p => p.FirstOrDefault()).ToList();
            }
            var quiz = new Quiz();
            for (int i = 0; i < size; i++)
            {
                if (i < t.Count)
                {
                    var question = t[i];
                    quiz.Questions.Add(question);
                    double correctAnswer = Convert(question);
                    quiz.Answers.Add(new Answer() { Question = question, CorrectAnswer = correctAnswer });
                }
                else
                {
                    break;
                }

            }

            return quiz;
        }

        private double Convert(Question question)
        {
            return _converters.Convert(question.From, question.To, question.FromQuantity);
        }
    }
}