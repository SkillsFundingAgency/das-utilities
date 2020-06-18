using CommandLine;

namespace SFA.DAS.Encoder.CommandLines
{
    [Verb("encode", HelpText = "Encodes the supplied values")]
    public class EncodeCommandLine : CommandLineBase
    {
        [Value(0, HelpText = "Specifies a value that will be encoded using the specified encoding type", Required = true)]
        public long Value { get; set; }
    }
}
