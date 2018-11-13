using System.Collections.Generic;

namespace HowFar.Core.Models
{
    public class Quiz
    {
        public Quiz()
        {
            Questions = new List<Question>();
            Answers = new List<Answer>();
        }

        public List<Question> Questions { get; set; }
        public List<Answer> Answers { get; set; }
    }
}