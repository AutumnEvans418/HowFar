using System.Collections.Generic;

namespace HowFar.Core.Models
{
    public interface IQuizScorer
    {
        IGrade CalculateScore(IEnumerable<Answer> answers);
    }
}