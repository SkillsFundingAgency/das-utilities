using SFA.DAS.Encoding;

namespace SFA.DAS.Encoder.Commands
{
    public interface IEncodingPairingService
    {
        bool TryGetPartner(EncodingType encoding, out EncodingType partner);
    }
}