using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HowFar.Core.Models;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace HowFarApp.Views
{
	[XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class QuizResultPage : ContentPage
	{
	    public IGrade Grade { get; }

	    public QuizResultPage (HowFar.Core.Models.IGrade grade)
		{
		    Grade = grade;
		    InitializeComponent ();
		    BindingContext = this;
		}

	    private void DoneClicked(object sender, EventArgs e)
	    {
	        Navigation.PopToRootAsync(true);
	    }
	}
}