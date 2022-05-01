using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace Hybrid.Working.Infrastructure.Storage
{
    public class AzureBlobStorageClient : IBlobStorageClient
    {
        private readonly CloudStorageAccount _storageAccount;

        public AzureBlobStorageClient(IAzureBlobStorageConfiguration configuration)
        {
            if (configuration == null)
            {
                throw new ArgumentNullException(nameof(configuration));
            }

            if (string.IsNullOrEmpty(configuration.ConnectionString))
            {
                throw new ArgumentException($"{nameof(configuration)}.ConnectionString is required");
            }

            _storageAccount = CloudStorageAccount.Parse(configuration.ConnectionString);
        }

        public async Task<Blob> Get(string container, string blobReference)
        {
            if (container == null)
            {
                throw new ArgumentNullException(nameof(container));
            }

            if (blobReference == null)
            {
                throw new ArgumentNullException(nameof(blobReference));
            }

            if (string.IsNullOrEmpty(container))
            {
                throw new ArgumentException($"{nameof(container)} is required");
            }

            if (string.IsNullOrEmpty(blobReference))
            {
                throw new ArgumentException($"{nameof(blobReference)} is required");
            }

            var blobClient = GetCloudBlobClient();

            var cloudBlobContainer = await GetAndEnsureContainer(blobClient, container);

            var blockBlob = GetBlobReference(blobReference, cloudBlobContainer);

            var stream = new MemoryStream();
            try
            {
                await blockBlob.DownloadToStreamAsync(stream);
            }
            catch (StorageException)
            {
                return null;
            }

            stream.Position = 0;

            return new Blob(stream, blobReference, blockBlob.Metadata);
        }

        public string GenerateBlobUploadUrl(string containerName, string fileName, int validForMinutes,
            SharedAccessBlobPermissions permissions)
        {
            var blobClient = _storageAccount.CreateCloudBlobClient();
            var container = blobClient.GetContainerReference(containerName);

            var sasConstraints = new SharedAccessBlobPolicy();
            sasConstraints.SharedAccessExpiryTime = DateTime.UtcNow.AddMinutes(validForMinutes);
            sasConstraints.Permissions = permissions;

            var blob = container.GetBlockBlobReference(fileName);

            return $"{blob.Uri}{blob.GetSharedAccessSignature(sasConstraints)}";
        }

        public async Task<ICollection<Blob>> GetBlobsInFolder(string container, string path)
        {
            if (container == null)
            {
                throw new ArgumentNullException(nameof(container));
            }

            if (path == null)
            {
                throw new ArgumentNullException(nameof(path));
            }

            if (string.IsNullOrEmpty(container))
            {
                throw new ArgumentException($"{nameof(container)} is required");
            }

            if (string.IsNullOrEmpty(path))
            {
                throw new ArgumentException($"{nameof(path)} is required");
            }

            var cloudBlockBlobs = await GetBlobsForTask(container, path);

            var downloadTasks = new List<Task>();
            var blobs = new List<Blob>();

            foreach (var blockBlob in cloudBlockBlobs)
            {
                var stream = new MemoryStream();

                downloadTasks.Add(
                    blockBlob.DownloadToStreamAsync(stream)
                        .ContinueWith(task =>
                        {
                            if (task.IsFaulted || task.IsCanceled)
                            {
                                return;
                            }

                            stream.Position = 0;

                            blobs.Add(new Blob(stream, blockBlob.Name, blockBlob.Metadata));
                        }));
            }

            await Task.WhenAll(downloadTasks);

            return blobs;
        }

        public async Task<IReadOnlyDictionary<string, bool>> DeleteFiles(string container, string path)
        {
            if (container == null)
            {
                throw new ArgumentNullException(nameof(container));
            }

            if (path == null)
            {
                throw new ArgumentNullException(nameof(path));
            }

            if (string.IsNullOrEmpty(container))
            {
                throw new ArgumentException($"{nameof(container)} is required");
            }

            if (string.IsNullOrEmpty(path))
            {
                throw new ArgumentException($"{nameof(path)} is required");
            }

            var result = new Dictionary<string, bool>();
            var downloadTasks = new List<Task>();

            var cloudBlockBlobs = await GetBlobsForTask(container, path);

            foreach (var blockBlob in cloudBlockBlobs)
            {
                downloadTasks.Add(
                    blockBlob.DeleteIfExistsAsync()
                        .ContinueWith(task =>
                        {
                            if (task.IsFaulted || task.IsCanceled)
                            {
                                return;
                            }

                            result.Add(blockBlob.Name, task.Result);
                        }));
            }

            await Task.WhenAll(downloadTasks);

            return result;
        }

        public async Task<bool> DeleteFile(string container, string uniqueFileIdentifier)
        {
            if (container == null)
            {
                throw new ArgumentNullException(nameof(container));
            }

            if (uniqueFileIdentifier == null)
            {
                throw new ArgumentNullException(nameof(uniqueFileIdentifier));
            }

            if (string.IsNullOrEmpty(container))
            {
                throw new ArgumentException($"{nameof(container)} is required");
            }

            if (string.IsNullOrEmpty(uniqueFileIdentifier))
            {
                throw new ArgumentException($"{nameof(uniqueFileIdentifier)} is required");
            }

            var blobClient = GetCloudBlobClient();

            var cloudBlobContainer = await GetAndEnsureContainer(blobClient, container);

            var blockBlob = cloudBlobContainer.GetBlockBlobReference(uniqueFileIdentifier);

            return await blockBlob.DeleteIfExistsAsync();
        }

        public async Task Store(string container, Blob blob)
        {
            if (container == null)
            {
                throw new ArgumentNullException(nameof(container));
            }

            if (blob == null)
            {
                throw new ArgumentNullException(nameof(blob));
            }

            if (string.IsNullOrEmpty(container))
            {
                throw new ArgumentException($"{nameof(container)} is required");
            }

            var blobClient = GetCloudBlobClient();

            var cloudBlobContainer = await GetAndEnsureContainer(blobClient, container);

            var blockBlob = GetBlobReference(blob.Reference, cloudBlobContainer);

            PopulateBlockBlobMetadata(blob, blockBlob);

            await blockBlob.UploadFromStreamAsync(blob.Content);
        }

        // BlobContainerPublicAccessType documentation:
        // https://docs.microsoft.com/en-us/dotnet/api/microsoft.azure.storage.blob.blobcontainerpublicaccesstype?view=azure-dotnet-legacy
        public async Task CreateContainerIfNotExists(string containerName,
            BlobContainerPublicAccessType blobContainerPublicAccessType)
        {
            var blobClient = GetCloudBlobClient();
            var container = blobClient.GetContainerReference(containerName);

            await container.CreateIfNotExistsAsync(blobContainerPublicAccessType, new BlobRequestOptions(),
                new OperationContext());
        }

        private async Task<IEnumerable<CloudBlockBlob>> GetBlobsForTask(string container, string path)
        {
            var blobClient = GetCloudBlobClient();

            var cloudBlobContainer = await GetAndEnsureContainer(blobClient, container);

            var directoryReference = cloudBlobContainer.GetDirectoryReference(path);

            var blobResultSegment =
                await directoryReference.ListBlobsSegmentedAsync(true, BlobListingDetails.None, null, null, null, null);

            var cloudBlockBlobs = blobResultSegment.Results.Select(listBlobItem => (CloudBlockBlob) listBlobItem);

            return cloudBlockBlobs;
        }

        private static async Task<CloudBlobContainer> GetAndEnsureContainer(
            CloudBlobClient blobClient,
            string containerName)
        {
            // TODO: Maybe refactor this to separate the azure blob client and the logic we add to validate the container name and path.
            containerName = containerName.ToLowerInvariant();

            var container = blobClient.GetContainerReference(containerName);

            await container.CreateIfNotExistsAsync();

            return container;
        }

        private static CloudBlockBlob GetBlobReference(string blobreference, CloudBlobContainer container)
        {
            var blockBlob = container.GetBlockBlobReference(blobreference);
            return blockBlob;
        }

        private static void PopulateBlockBlobMetadata(Blob blob, CloudBlob blockBlob)
        {
            foreach (var pair in blob.Metadata)
            {
                blockBlob.Metadata.Add(pair);
            }
        }

        private CloudBlobClient GetCloudBlobClient()
        {
            var blobClient = _storageAccount.CreateCloudBlobClient();
            return blobClient;
        }
    }
}