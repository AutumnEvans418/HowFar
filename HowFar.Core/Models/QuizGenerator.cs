using System;
using System.Collections.Generic;

namespace HowFar.Models
{
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
            var items = _converters.ObjectMeasurements;
            var quiz = new Quiz();
            for (int i = 0; i < size; i++)
            {
                quiz.Questions.Add(new Question(){});
            }
            return quiz;
        }
    }
}