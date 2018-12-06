using System.ComponentModel;
using System.Runtime.CompilerServices;
using HowFar.Core.Annotations;

namespace HowFar.Core.Models
{
    public class Answer : INotifyPropertyChanged
    {
        private double _userinput;
        public double UserInput
        {
            get
            {
                return _userinput;
                //if (double.TryParse(_userInputString, out var s))
                //{
                //    return s;
                //}
                //return null;
            }
            set
            {
                _userinput = value;
                //_userInputString = value.ToString();
                OnPropertyChanged();
            }
        }

        //private string _userInputString;
        //public string UserInputString
        //{
        //    get => _userInputString;
        //    set
        //    {
        //        _userInputString = value;
        //        OnPropertyChanged();
        //    }
        //}

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