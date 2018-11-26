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
	public partial class QuizPage : ContentPage
	{
		public QuizPage (Quiz quiz)
		{
			InitializeComponent ();
		}
	}
}