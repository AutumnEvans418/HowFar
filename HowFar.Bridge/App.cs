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
       static  HTMLElement from = Document.GetElementById("from");
       static  HTMLElement to = Document.GetElementById("to");
       static  HTMLElement num = Document.GetElementById("num");
       static  HTMLElement answer = Document.GetElementById("answer");

        public static void Main()
        {

            var converter = new MeasureConverters(new ObjectRepositoryCache(new AppModel()));

            

            converter.ObjectMeasurements.ForEach(p =>
                {
                    from.AppendChild(new HTMLOptionElement() {Text = p.PluralName});
                    to.AppendChild(new HTMLOptionElement(){Text = p.PluralName});
                });

            from.OnChange = e =>
            {
                
            };

            Script.Call("choose");


        }

      
    }
}