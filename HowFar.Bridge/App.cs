using Bridge;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Bridge.Html5;
using HowFar.Core.Models;

namespace HowFar.Bridge
{

 


    public class App 
    {
        public static string NumberFormat(double x)
        {
            return Script.Call<string>("numberWithCommas", x);
        }

        public static void Main()
        {
            //Window.OnLoad = e => { new AppModel(); };

            new AppModel();

        }

        
      
    }
}