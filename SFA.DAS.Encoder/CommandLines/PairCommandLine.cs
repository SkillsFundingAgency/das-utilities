using CommandLine;

namespace SFA.DAS.Encoder.CommandLines
{
    [Verb("pair", HelpText = "Shows the encoded public and private")]
    public class PairCommandLine 
    {
        [Value(0, HelpText = "Specifies a value that will be decoded and re-encoded into its partner type (e.g. public to private)", Required = true)]
        public string Value { get; set; }
    }
}
