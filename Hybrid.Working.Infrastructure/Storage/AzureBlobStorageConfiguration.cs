using System;
using System.Collections.Generic;
using System.Text;

namespace Hybrid.Working.Infrastructure.Storage
{
    public class AzureBlobStorageConfiguration : IAzureBlobStorageConfiguration
    {
        public AzureBlobStorageConfiguration(string connectionString)
        {
            ConnectionString = connectionString;
        }

        public string ConnectionString { get; }
    }
}
