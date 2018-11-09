using System.Collections.Generic;

namespace HowFar.Models
{
    public interface IApp
    {
        IDictionary<string,object> Properties { get; }
    }
}