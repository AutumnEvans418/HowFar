using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace HowFarApp.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class NewObjectPackPage : ContentPage
    {
      

        public NewObjectPackPage()
        {
            InitializeComponent();
            if (BindingContext == null)
            {

            }
        }

       
    }
}