using HowFar.Core.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace HowFarApp.Views
{
	[XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class ObjectManagerPage : ContentPage
    {
        public ObservableCollection<ObjectPack> Objects { get; set; }
        public ObjectManagerPage (IMeasureConverters converter)
		{
			InitializeComponent ();

            this.Objects = new ObservableCollection<ObjectPack>(converter.ObjectPacks);

            this.ObjectManagerList.ItemsSource = this.Objects;
        }
	}
}