using CommandLine;

namespace SFA.DAS.Encoder.CommandLines
{
    [Verb("decode", HelpText = "Decodes the supplied values")]
    public class DecodeCommandLine : CommandLineBase
    {
        [Value(0, HelpText = "Specifies a value that will be decoded using the specified encoding type", Required = true)]
        public string Value { get; set; }

        [Option('w', "which", HelpText = "If specified will find which encoding(s) can decode the specified value")]
        public bool Which{ get; set; }
    }
}
