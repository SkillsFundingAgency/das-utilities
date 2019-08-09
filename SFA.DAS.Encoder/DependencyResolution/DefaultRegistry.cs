using SFA.DAS.Encoder.Commands;
using SFA.DAS.Encoding;
using StructureMap;

namespace SFA.DAS.Encoder.DependencyResolution
{
    public class DefaultRegistry : Registry
    {
        public DefaultRegistry()
        {
            For<IEncodingService>().Use<EncodingService>().Singleton();
            For<IEncodingPairingService>().Use<EncodingPairingService>().Singleton();
        }
    }
}