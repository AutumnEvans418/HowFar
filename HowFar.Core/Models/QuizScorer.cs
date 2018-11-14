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

            var answList = answers.ToList();
            var grade = new Grade
            {
                TotalQuestions = answList.Count,
                PossiblePoints = answList.Sum(p=> _answerScorer.GetMaxScore(p)),
                RightQuestions = answList.Count(p => _answerScorer.GetScore(p) > 0),
                ActualPoints = answList.Sum(p=> _answerScorer.GetScore(p)),
            };
            return grade;
        }
    }
}