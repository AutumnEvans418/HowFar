using System;
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
}