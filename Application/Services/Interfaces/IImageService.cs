using System.IO;
using System.Threading.Tasks;

namespace Application.Services.Interfaces;

public interface IImageService
{
    Task<string?> UploadImageAsync(Stream fileStream, string fileName);
}
