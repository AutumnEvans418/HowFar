using System;
using System.Collections.Generic;
using System.Linq;

namespace HowFar.Models
{
    public static class Extensions
    {

        public static List<List<T>> Combinator<T>(this IEnumerable<T> data, int? pairSize = null)
        {
            var datalist = data.ToList();
            var count = datalist.Count();
            if (pairSize == null)
            {
                pairSize = count;
            }

            int size = (int)pairSize;

            var array = new List<List<T>>();
            for (int i = 0; i < count; i++)
            {
                var l = new List<T>();
                for (int j = 0; j < count; j++)
                {

                }

            }
            return array;
        }

        public static IEnumerable<T> Randomize<T>(this IEnumerable<T> data, Random random)
        {
            var queue = new List<T>(data);
            while (queue.Any())
            {
                for (var index = 0; index < queue.Count; index++)
                {
                    var x1 = queue[index];
                    if (random.Next(0, 10) > 5)
                    {
                        var item = queue[index];
                         queue.Remove(x1);
                        yield return item;
                    }
                }
            }
        }
    }
    public class Quiz
    {
        public Quiz()
        {
            Questions = new List<Question>();
        }

        public List<Question> Questions { get; set; }
    }

    public class Question
    {
        public ObjectMeasurement From { get; set; }
        public ObjectMeasurement To { get; set; }
    }
    public class QuizGenerator
    {
        private readonly IMeasureConverters _converters;

        private Random random;
        public QuizGenerator(IMeasureConverters converters, int seed)
        {
            random = new Random(seed);
            _converters = converters;
        }

        public Quiz CreateQuiz(int size)
        {
            var items = _converters.ObjectMeasurements.Randomize(random).ToList();
            var t = items.Combinator();

            var quiz = new Quiz();
            for (int i = 0; i < size; i++)
            {
                quiz.Questions.Add(new Question(){From = items[0], To = items[1]});
            }
            return quiz;
        }
    }
}