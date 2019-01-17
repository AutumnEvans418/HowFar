using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HowFar.Core.Models
{
    public interface IApp
    {
        //Func<IDatabase> Database { get; }
        IDictionary<string,object> Properties { get; }
        Task SavePropertiesAsync();
    }
}