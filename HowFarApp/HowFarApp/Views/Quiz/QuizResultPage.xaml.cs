using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HowFar.Core.Models;
using HowFarApp.ViewModels;
using Prism.Commands;
using Prism.Navigation;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace HowFarApp.Views
{

    public class QuizResultPageViewModel : ViewModelBase
    {
        private readonly INavigationService _navigationService;
        private IGrade _grade;

        public IGrade Grade
        {
            get => _grade;
            set => SetProperty(ref _grade,value);
        }

        public QuizResultPageViewModel(INavigationService navigationService)
        {
            _navigationService = navigationService;
            DoneCommand = new DelegateCommand(DoneClicked);
        }
        public override void OnNavigatedTo(INavigationParameters parameters)
        {
            if (parameters["Score"] is IGrade grade)
            {
                Grade = grade;
            }
            base.OnNavigatedTo(parameters);
        }

        public DelegateCommand DoneCommand { get; set; }

        private void DoneClicked()
        {
            _navigationService.GoBackToRootAsync();
        }
    }

	[XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class QuizResultPage : ContentPage
	{

	    public QuizResultPage ()
		{
		    InitializeComponent ();
		}

	}
}