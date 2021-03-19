using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HowFar.Core.Models
{
    public interface IProperties
    {
        bool ContainsKey(string key);
        //object this[string index] { get; set; }

        T Get<T>(string key) where T : class;

        void Set(string key, object obj);

        void Add(string key, object obj);
    }
    public interface IAppCache
    {
        //Func<IDatabase> Database { get; }
        IProperties Properties { get; }
        Task SavePropertiesAsync();
        
    }
}