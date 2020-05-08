using System;
using Bridge;
using Bridge.Html5;

namespace HowFar.Core.Models
{
    public class AddModel
    {
        private HTMLInputElement name;
        private HTMLInputElement quantity;
        private HTMLSelectElement unit;
        private HTMLElement btn;
        public AddModel(IMeasureConverters converters, Action<ObjectMeasurement> onAdd)
        {
            name = Document.GetElementById<HTMLInputElement>("add_name");
            quantity = Document.GetElementById<HTMLInputElement>("add_num");
            unit = Document.GetElementById<HTMLSelectElement>("add_unit");
            btn = Document.GetElementById("add_btn");

            converters.ObjectMeasurements.ForEach(p => unit.AppendChild(new HTMLOptionElement() { Text = p.PluralName }));
            Script.Call("update");
            btn.OnClick = e =>
            {
                var result = converters.NewObject(name.Value, name.Value, quantity.ValueAsNumber, unit.Value);
                name.Value = "";
                quantity.Value = "";

                onAdd(result);
            };
        }
    }
}