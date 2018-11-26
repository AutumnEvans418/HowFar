namespace HowFar.Core.Models
{
    public interface IQuizGenerator
    {
        int MaxQuizSize { get; }

        Quiz CreateQuiz(int size, int maximumQty = 30, int maximumRange = int.MaxValue);
        Quiz CreateQuiz(int size, QuizDifficulty difficulty, int maximumQty = 30);
    }
}