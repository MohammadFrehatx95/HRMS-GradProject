namespace Domain.Entities;

public class FidoCredential
{
    public int Id { get; set; }
    
    public int UserId { get; set; }
    public User? User { get; set; }

    public byte[] DescriptorId { get; set; } = [];
    public byte[] PublicKey { get; set; } = [];
    public byte[] UserHandle { get; set; } = [];
    public uint SignatureCounter { get; set; }
    public string CredType { get; set; } = "public-key";
    public DateTime RegDate { get; set; } = DateTime.UtcNow;
    public Guid AaGuid { get; set; }
}
