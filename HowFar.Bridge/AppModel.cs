using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Bridge;
using Bridge.Html5;
using HowFar.Bridge;

namespace HowFar.Core.Models
{
    public class AppModel : IApp
    {
        HTMLSelectElement fromSelect = Document.GetElementById<HTMLSelectElement>("from");
        HTMLSelectElement toSelect = Document.GetElementById<HTMLSelectElement>("to");
        HTMLInputElement num = Document.GetElementById<HTMLInputElement>("num");
        HTMLElement answer = Document.GetElementById("answer");
        private HTMLElement reversebtn = Document.GetElementById("reverse");
        MeasureConverters converter;
        private HTMLElement randombtn = Document.GetElementById("random");
        Random random = new Random();
        public AppModel()
        {
            converter = new MeasureConverters(new ObjectRepositoryCache(this));
            converter.ObjectMeasurements.ForEach(p =>
            {
                fromSelect.AppendChild(new HTMLOptionElement() { Text = p.PluralName });
                toSelect.AppendChild(new HTMLOptionElement() { Text = p.PluralName });
            });

            fromSelect.OnChange = e => Convert();
            toSelect.OnChange = e => Convert();

            if (randombtn != null)
                randombtn.OnClick = e => Random();

            if (reversebtn != null)
                reversebtn.OnClick = e =>
                {
                    var f = fromSelect.SelectedIndex;
                    var to = toSelect.SelectedIndex;
                    fromSelect.SelectedIndex = to;
                    toSelect.SelectedIndex = f;
                    Script.Call("update");
                    Convert();
                };

            num.OnKeyDown = e => Convert();
            num.OnMouseUp = e => Convert();
            Script.Call("choose");
            Random();
            var add = new AddModel(converter, p =>
            {
                var f = new HTMLOptionElement() { Text = p.PluralName };
                fromSelect.AppendChild(f);
                toSelect.AppendChild(new HTMLOptionElement() { Text = p.PluralName });

                fromSelect.SelectedIndex = f.Index;
                Script.Call("update");
                Convert();
            });
        }

        private void Random()
        {
            var count = fromSelect.Options.Length;

            fromSelect.SelectedIndex = random.Next(0, count - 1);
            toSelect.SelectedIndex = random.Next(0, count - 1);
            Script.Call("update");
            Convert();
        }

        void Convert()
        {
            if (double.TryParse(num.Value, out var n))
            {
                var result = converter.Convert(fromSelect.Value, toSelect.Value, n);

                answer.TextContent = $"1 {fromSelect.Value} = {App.NumberFormat(result)} {toSelect.Value}";
            }
        }

        public IProperties Properties { get; } = new Properties();
        public async Task SavePropertiesAsync()
        {

        }




    }
}