using System;
using System.ComponentModel;
using System.Runtime.CompilerServices;

namespace HowFar.Core
{
    public class BindableBase : INotifyPropertyChanged
    {
        public event PropertyChangedEventHandler PropertyChanged;

        public void SetProperty<T>(ref T property, T value, Action action = null, [CallerMemberName] string name = null)
        {
            if (property?.Equals(value) != true)
            {
                property = value;
                OnPropertyChanged(name);
                action?.Invoke();
            }

        }
#if !BRIDGE
        [HowFar.Core.Annotations.NotifyPropertyChangedInvocator]
#endif
        protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}