using System.Collections.Generic;
using HowFar.Core.Models;

namespace HowFar.Core
{
    public class Properties : IProperties
    {
        public IDictionary<string, object> Dictionary { get; set; }

        public Properties(IDictionary<string, object> dictionary)
        {
            Dictionary = dictionary;
        }
        public bool ContainsKey(string key)
        {
            return Dictionary.ContainsKey(key);
        }

        public T Get<T>(string key) where T : class
        {
            return Dictionary[key] as T;
        }

        public void Set(string key, object obj)
        {
            Dictionary[key] = obj;
        }

        public void Add(string key, object obj)
        {
            Dictionary.Add(key, obj);
        }
    }
    public class ObjectCompare
    {
        public ObjectMeasurement From { get; set; }
        public ObjectMeasurement To { get; set; }
        public double ToQty { get; set; }
        public string Result => $"A {From.SingleName} is {ToQty:N} {To.PluralName}";
        public override string ToString()
        {
            return Result;
        }
    }
}