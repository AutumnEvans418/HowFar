using HowFar.Core.Models;

namespace HowFarApp.Views
{
    public class QuizDifficultyModel
    {
        public QuizDifficulty QuizDifficulty { get; set; }
        public string Result => $"{QuizDifficulty.ToString()}, Range: {((int)QuizDifficulty):N}";
        public override string ToString()
        {
            return Result;
        }
    }
}