using System;
using System.Collections.Generic;

namespace HowFar.Core.Models
{
    public interface IApp
    {
        Func<IDatabase> Database { get; }
        //IDictionary<string,object> Properties { get; }
    }
}