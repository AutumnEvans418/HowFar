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

    }
    public class QuizGenerator
    {
        private readonly IMeasureConverters _converters;

        public QuizGenerator(IMeasureConverters converters)
        {
            _converters = converters;
        }

        public Quiz CreateQuiz(int size)
        {
            var quiz = new Quiz();
            for (int i = 0; i < size; i++)
            {
                quiz.Questions.Add(new Question());
            }
            return quiz;
        }
    }
}