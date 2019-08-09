using SFA.DAS.Encoding;

namespace SFA.DAS.Encoder.Commands
{
    public class EncodingPairingService : IEncodingPairingService
    {
        public bool TryGetPartner(EncodingType encoding, out EncodingType partner)
        {
            switch (encoding)
            {
                case EncodingType.AccountId:
                    partner = EncodingType.PublicAccountId;
                    break;

                case EncodingType.PublicAccountId:
                    partner = EncodingType.AccountId;
                    break;

                case EncodingType.AccountLegalEntityId:
                    partner = EncodingType.PublicAccountLegalEntityId;
                    break;

                case EncodingType.PublicAccountLegalEntityId:
                    partner = EncodingType.AccountLegalEntityId;
                    break;

                default:
                    partner = default(EncodingType);
                    return false;
            }

            return true;
        }
    }
}