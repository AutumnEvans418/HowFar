using System.ComponentModel;
using System.Runtime.CompilerServices;
using HowFar.Core.Annotations;

namespace HowFar.Core.Models
{
    public class Answer : INotifyPropertyChanged
    {
        private double? _userInput;

        public double? UserInput
        {
            get => _userInput;
            set
            {
                _userInput = value;
                OnPropertyChanged();
            }
        }

        public Question Question { get; set; }
        public double CorrectAnswer { get; set; }
        public event PropertyChangedEventHandler PropertyChanged;

        [NotifyPropertyChangedInvocator]
        protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}