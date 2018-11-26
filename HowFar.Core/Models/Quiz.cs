using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using HowFar.Core.Annotations;

namespace HowFar.Core.Models
{
    public class Quiz : INotifyPropertyChanged
    {
        private ObservableCollection<Answer> _answers;
        private ObservableCollection<Question> _questions;

        public Quiz()
        {
            Questions = new ObservableCollection<Question>();
            Answers = new ObservableCollection<Answer>();
        }

        public ObservableCollection<Question> Questions
        {
            get => _questions;
            set
            {
                _questions = value;
                OnPropertyChanged();
            }
        }

        public ObservableCollection<Answer> Answers
        {
            get => _answers;
            set
            {
                _answers = value;
                OnPropertyChanged();
            }
        }

        public event PropertyChangedEventHandler PropertyChanged;

        [NotifyPropertyChangedInvocator]
        protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}