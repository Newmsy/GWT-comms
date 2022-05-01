using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Hybrid.Working.Infrastructure.Storage
{
    public class Blob
    {
        public Blob(Stream content, string reference)
        {
            Content = content ?? throw new ArgumentNullException(nameof(content));
            Reference = reference ?? throw new ArgumentNullException(nameof(reference));
            Metadata = new MetadataCollection();
        }

        public Blob(Stream content, string reference, IDictionary<string, string> metadata)
        {
            Content = content;
            Reference = reference;
            Metadata = new MetadataCollection(metadata);
        }

        public Stream Content { get; }

        public string Reference { get; }

        public MetadataCollection Metadata { get; }
    }
}
