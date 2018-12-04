using System.Collections.ObjectModel;

namespace HowFar.Core.Models
{
    public interface IGrade
    {
        GradeLetter GradeLetter { get; }
        double Percent { get; }
        double PossiblePoints { get; }
        double ActualPoints { get; }
        int RightQuestions { get; }
        int TotalQuestions { get; }
        ObservableCollection<Answer> Answers { get; }
    }
}