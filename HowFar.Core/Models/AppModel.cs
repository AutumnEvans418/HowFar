using System.Collections.Generic;
using System.Threading.Tasks;

namespace HowFar.Core.Models
{
    public class AppModel : IApp
    {
        public IDictionary<string, object> Properties { get; } = new Dictionary<string, object>();
        public async Task SavePropertiesAsync()
        {

        }
    }
}