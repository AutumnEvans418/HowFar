using System;

namespace HowFar.Core.Models
{
    public class AnswerScorer : IAnswerScorer
    {
        public double GetScore(Answer answer)
        {
            throw new NotImplementedException();
        }

        public double MaxScore { get; }
    }
}