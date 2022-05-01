using System;
using System.Collections.Generic;
using System.Text;

namespace Hybrid.Working.Infrastructure.Storage
{
    public interface IAzureBlobStorageConfiguration
    {
        string ConnectionString { get; }
    }
}
