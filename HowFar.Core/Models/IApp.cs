using System.Collections.Generic;

namespace HowFar.Core.Models
{
    public interface IApp
    {
        IDictionary<string,object> Properties { get; }
    }
}