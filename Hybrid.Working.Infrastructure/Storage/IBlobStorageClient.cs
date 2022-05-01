using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage.Blob;

namespace Hybrid.Working.Infrastructure.Storage
{
    public interface IBlobStorageClient
    {
        /// <summary>
        /// Stores the specified blob in the container.
        /// </summary>
        /// <param>The blob with name and content</param>
        /// <param name="container">The container.</param>
        /// <param name="blob"></param>
        /// <returns></returns>
        Task Store(string container, Blob blob);

        /// <summary>
        /// Gets the blob specified by the container and blob reference
        /// </summary>
        /// <param name="container">The container name</param>
        /// <param name="blobReference">The blob reference</param>
        /// <returns>A populated memory stream with it's position set to 0.</returns>
        Task<Blob> Get(string container, string blobReference);

        string GenerateBlobUploadUrl(string containerName, string fileName, int validForMinutes,
            SharedAccessBlobPermissions permissions);

        /// <summary>
        /// Gets all the blobs in specified folder.
        /// </summary>
        /// <param name="container">The container.</param>
        /// <param name="path">The path.</param>
        /// <returns></returns>
        Task<ICollection<Blob>> GetBlobsInFolder(string container, string path);

        /// <summary>
        /// Deletes the specified blob if it exists.
        /// </summary>
        /// <param name="container"></param>
        /// <param name="uniqueFileIdentifier"></param>
        /// <returns>bool</returns>
        Task<bool> DeleteFile(string container, string uniqueFileIdentifier);

        /// <summary>
        /// Deletes the specified blob if it exists.
        /// </summary>  
        /// <param name="container"></param>
        /// <param name="path"></param>
        /// <returns>bool</returns>
        Task<IReadOnlyDictionary<string, bool>> DeleteFiles(string container, string path);

        /// <summary>
        /// Creates the specified container if it doesn't exist.
        /// </summary>  
        /// <param name="containerName"></param>
        /// <param name="blobContainerPublicAccessType"></param>
        /// <returns></returns>
        Task CreateContainerIfNotExists(string containerName,
            BlobContainerPublicAccessType blobContainerPublicAccessType);
        
    }
}