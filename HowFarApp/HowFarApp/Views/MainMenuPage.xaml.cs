using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Unity;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace HowFarApp.Views
{
	[XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class MainMenuPage : ContentPage
	{
	    private readonly IUnityContainer _container;

	    public MainMenuPage (IUnityContainer container)
	    {
	        _container = container;
	        InitializeComponent ();
	    }

	    private void ObjectManager(object sender, EventArgs e)
	    {
	        Navigation.PushAsync(_container.Resolve<ObjectManagerPage>());
	    }

	    private void ObjectPacks(object sender, EventArgs e)
	    {
	        Navigation.PushAsync(_container.Resolve<ObjectPacksPage>());
	    }

	    private void Map(object sender, EventArgs e)
	    {
	        Navigation.PushAsync(_container.Resolve<MapPage>());
	    }

	    private void Quizes(object sender, EventArgs e)
	    {
	        Navigation.PushAsync(_container.Resolve<QuizesPage>());
	    }
	}
}