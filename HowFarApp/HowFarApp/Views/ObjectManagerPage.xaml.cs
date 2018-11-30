using HowFar.Core.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Unity;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace HowFarApp.Views
{
	[XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class ObjectManagerPage : ContentPage
    {
        private readonly IUnityContainer _container;
        public ObservableCollection<ObjectPack> Objects { get; set; }
        public ObjectManagerPage (IMeasureConverters converter, IUnityContainer container)
		{
		    _container = container;
		    InitializeComponent ();

            this.Objects = new ObservableCollection<ObjectPack>(converter.ObjectPacks);

            this.ObjectManagerList.ItemsSource = this.Objects;
        }

        private void Button_OnClicked(object sender, EventArgs e)
        {
            Navigation.PushAsync(_container.Resolve<NewObjectPage>());
        }
    }
}