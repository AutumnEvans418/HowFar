using System;
using System.Collections.Generic;
using System.Linq;

namespace HowFar.Models
{
    public static class Extensions
    {


        public static IEnumerable<IEnumerable<T>> Combinationator<T>(this IEnumerable<T> data, int? depth = null)
        {
            var datalist = data.ToList();
            var count = datalist.Count();
            if (depth == null)
            {
                depth = count;
            }
            var array = new List<IEnumerable<T>>();
            for (int i = 0; i < depth; i++)
            {
                array.Add(datalist);

                var item = datalist.First();
                datalist.Remove(item);
                datalist.Add(item);
            }

            return array.ToArray();
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
            var quiz = new Quiz();
            for (int i = 0; i < size; i++)
            {
                //items = items.Randomize(random).ToList();
                var t = items.Combinationator();
                
                quiz.Questions.Add(new Question(){From = items[0], To = items[1]});
            }
            return quiz;
        }
    }
}