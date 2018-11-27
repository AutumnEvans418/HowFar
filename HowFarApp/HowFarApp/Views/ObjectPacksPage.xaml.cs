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
	public partial class ObjectPacksPage : ContentPage
	{
      public ObservableCollection<ObjectPack> Objects { get; set; }
		
            public ObjectPacksPage (IMeasureConverters converters)
		{
			InitializeComponent ();
            

               this.Objects = new ObservableCollection<ObjectPack>(converters.ObjectPacks); 
            
           this.ObjectPacksList.ItemsSource = this.Objects;
        }


      
    
	}
}