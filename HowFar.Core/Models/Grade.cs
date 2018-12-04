using System.Collections.ObjectModel;

namespace HowFar.Core.Models
{
    public class Grade : IGrade
    {
        public Grade(ObservableCollection<Answer> answers)
        {
            Answers = answers;
        }

        public GradeLetter GradeLetter => GetLetter();

        private GradeLetter GetLetter()
        {
            var percent = Percent;
            if (percent < .6) return GradeLetter.F;
            if (percent < .7) return GradeLetter.D;
            if (percent < .8) return GradeLetter.C;
            if (percent < .9) return GradeLetter.B;
            return GradeLetter.A;
        }

        public double Percent => ActualPoints / PossiblePoints;
        public double PossiblePoints { get; set; }
        public double ActualPoints { get; set; }
        public int RightQuestions { get; set; }
        public int TotalQuestions { get; set; }
        public ObservableCollection<Answer> Answers { get; }
    }
}