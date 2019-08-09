using System;
using SFA.DAS.Encoding;

namespace SFA.DAS.Encoder.Commands
{
    public static class IEncodingServiceExtensions
    {
        public static bool TryDecodeSafe(this IEncodingService encodingService, string encodedValue, EncodingType encodingType, out long decodedValue)
        {
            try
            {
                return encodingService.TryDecode(encodedValue, encodingType, out decodedValue);
            }
            catch (Exception e)
            {
                decodedValue = 0;
                return false;
            }
        }

        public static string EncodeSafe(this IEncodingService encodingService, long value, EncodingType encodingType)
        {
            try
            {
                return encodingService.Encode(value, encodingType);
            }
            catch (Exception)
            {
                return "#Error";
            }
        }
    }
}