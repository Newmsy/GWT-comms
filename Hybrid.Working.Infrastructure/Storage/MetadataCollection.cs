using System;
using System.Collections.Generic;
using System.Text;

namespace Hybrid.Working.Infrastructure.Storage
{
    public class MetadataCollection : Dictionary<string, string>
    {
        public MetadataCollection()
        {
        }

        public MetadataCollection(IDictionary<string, string> metadata) : base(metadata)
        {
        }
    }
}
