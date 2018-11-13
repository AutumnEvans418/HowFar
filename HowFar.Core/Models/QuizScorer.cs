using System.Collections.Generic;
using System.Linq;

namespace HowFar.Core.Models
{
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
                PossiblePoints = answers.Count() * _answerScorer.MaxScore,
                RightQuestions = answers.Count(p => _answerScorer.GetScore(p) > 0),
                ActualPoints = answers.Sum(p=> _answerScorer.GetScore(p))
            };
            return grade;
        }
    }
}