using System.Collections.Generic;
using System.Threading.Tasks;
using Bridge;
using Bridge.Html5;

namespace HowFar.Core.Models
{
    public class AppModel : IApp
    {
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
            Convert();
        }
        HTMLSelectElement fromSelect = Document.GetElementById<HTMLSelectElement>("from");
        HTMLSelectElement toSelect = Document.GetElementById<HTMLSelectElement>("to");
        HTMLInputElement num = Document.GetElementById<HTMLInputElement>("num");

        HTMLElement answer = Document.GetElementById("answer");

        private HTMLElement reversebtn = Document.GetElementById("reverse");

        MeasureConverters converter;
        void Convert()
        {
            if (double.TryParse(num.Value, out var n))
            {
                var result = converter.Convert(fromSelect.Value, toSelect.Value, n);

                answer.TextContent = $"1 {fromSelect.Value} = {result} {toSelect.Value}";
            }
        }

        public IDictionary<string, object> Properties { get; } = new Dictionary<string, object>();
        public async Task SavePropertiesAsync()
        {

        }




    }
}