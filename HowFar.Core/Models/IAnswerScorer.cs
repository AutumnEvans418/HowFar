namespace HowFar.Core.Models
{
    public interface IAnswerScorer
    {
        double GetScore(Answer answer);
        double MaxScore { get; }
    }
}