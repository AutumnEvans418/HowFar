using System;

namespace HowFar.Core.Models
{
    public class AnswerScorerPercent : IAnswerScorer
    {
        public double GetScore(Answer answer)
        {
            if (answer.UserInput == null) return 0;
            var input = Math.Abs(answer.UserInput ?? 0);
            var corranwer = Math.Abs(answer.CorrectAnswer);

            var difference = Math.Abs((double) input - corranwer);
            if (difference == 0) return 1;

            var percent = (difference / corranwer);
            return 1- Math.Round(percent, 4);
        }

        public double GetMaxScore(Answer answer) => 1;
    }
}