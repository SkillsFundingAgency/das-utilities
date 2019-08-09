using System;
using System.Linq;
using SFA.DAS.Encoder.CommandLines;
using SFA.DAS.Encoding;

namespace SFA.DAS.Encoder.Commands
{
    internal class PairCommand : ICommand
    {
        private readonly PairCommandLine _args;
        private readonly IConsole _console;
        private readonly IEncodingService _encodingService;
        private readonly IEncodingPairingService _encodingPairingService;

        public PairCommand(
            PairCommandLine args, 
            IConsole console, 
            IEncodingService encodingService, 
            IEncodingPairingService encodingPairingService)
        {
            _args = args;
            _console = console;
            _encodingService = encodingService;
            _encodingPairingService = encodingPairingService;
        }

        public void Run()
        {
            foreach (var encodingType in Enum.GetValues(typeof(EncodingType)).OfType<EncodingType>())
            { 
                TryDecoder(encodingType);
            }
        }

        private void TryDecoder(EncodingType encodingType)
        {
            if (!_encodingPairingService.TryGetPartner(encodingType, out var pairedEncoding))
            {
                return;
            }

            if (!_encodingService.TryDecodeSafe(_args.Value, encodingType, out var decodedValue))
            {
                return;
            }

            var pairedEncodedValue = _encodingService.EncodeSafe(decodedValue, pairedEncoding);

            _console.Write($"{_args.Value} ({encodingType}) -> {decodedValue} (decoded) -> {pairedEncodedValue} ({pairedEncoding})");
        }
    }
} 