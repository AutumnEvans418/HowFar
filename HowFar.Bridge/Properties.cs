using System;
using Bridge.Html5;
using Newtonsoft.Json;

namespace HowFar.Core.Models
{
    public class Properties : IProperties
    {
        public Properties()
        {

        }

        public void Add(string key, object obj)
        {
            if (Window.LocalStorage == null) return;

            var str = JsonConvert.SerializeObject(obj);
            //Console.WriteLine($"cached updated {key}");
            Window.LocalStorage.SetItem(key, str);
        }

        public bool ContainsKey(string key)
        {
            if (Window.LocalStorage == null)
                return false;
            return Window.LocalStorage.GetItem(key) != null;
        }

        public T Get<T>(string key) where T : class
        {
            if (Window.LocalStorage == null) 
                return default(T);

            var value = Window.LocalStorage.GetItem(key);
            if (value == null)
                return default(T);
            return JsonConvert.DeserializeObject<T>(value.ToString());
        }

        public void Set(string key, object obj)
        {
            Add(key, obj);
        }
    }
}