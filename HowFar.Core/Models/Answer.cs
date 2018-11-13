namespace HowFar.Core.Models
{
    public class Answer
    {
        public double? UserInput { get; set; }
        public Question Question { get; set; }
        public double CorrectAnswer { get; set; }
    }
}