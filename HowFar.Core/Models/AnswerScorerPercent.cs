using System;

namespace HowFar.Core.Models
{
    public class AnswerScorerPercent : IAnswerScorer
    {
        public double GetScore(Answer answer)
        {
            if (answer.UserInput == null) return 0;
            return 1 - (Math.Abs((int) answer.UserInput - answer.CorrectAnswer) / answer.CorrectAnswer);
        }

        public double GetMaxScore(Answer answer) => 1;
    }
}