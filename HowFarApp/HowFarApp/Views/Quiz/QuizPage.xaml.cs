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
	    private readonly IQuizScorer _scorer;
	    public Quiz Quiz { get; }

	    public QuizPage (Quiz quiz, IQuizScorer scorer)
	    {
	        _scorer = scorer;
	        Quiz = quiz;
	        InitializeComponent ();
	        BindingContext = this;
	    }

	    private async void FinishQuizClick(object sender, EventArgs e)
	    {
	        await Navigation.PushAsync(new QuizResultPage(_scorer.CalculateScore(Quiz.Answers)));
	    }
	}
}