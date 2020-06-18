# Encoder

Encoder is a net core app. It will produce a dll which can be executed using the dotnet command. If required it can published to create an exe.

These examples show the net core assembly being run as a dll.

## Examples 

### Getting Help

Encoder uses a "git" style command line, which specifies a verb first followed by verb specific parameters and flags.
Parameters and flags have a long form (specified with --) and a short form (specified with a single -). For example: --encoding has the short form -e. The full list of parameters and flags for each verb can be found by using help <verb>.

The encoder uses the shared encoder and config so by default is going to use the config in the local storage emulator.

Help is a verb which can be used to get help on the supported verbs:

    dotnet SFA.DAS.Encoder.dll --help
     

    SFA.DAS.Encoder 1.0.0
    Copyright (C) 2019 SFA.DAS.Encoder
    
      decode Decodes the supplied values
    
      encode Encodes the supplied values
    
      list   Lists the defined encoding types and optionally their config
    
      pair   Shows the encoded public and private
    
      help   Display more information on a specific command.
    
      versionDisplay version information.
  
  
  help can also be used to get help on a particular verb:

    dotnet SFA.DAS.Encoder.dll help decode
    
    SFA.DAS.Encoder 1.0.0
    Copyright (C) 2019 SFA.DAS.Encoder
    
      -w, --which   If specified will find which encoding(s) can decode the specified value
    
      -e, --encodingSpecifies the type of encoding that should be used
    
      --helpDisplay this help screen.
    
      --version Display version information.
    
      value pos. 0  Required. Specifies a value that will be decoded using the specified encoding type

Use the list verb to get a list of encoding types
 
    $ dotnet SFA.DAS.Encoder.dll list
    0:CohortReference
    1:AccountId
    2:PublicAccountId
    3:AccountLegalEntityId
    4:PublicAccountLegalEntityId
    5:ApprenticeshipId
        
Use the --config flag with the list verb to see the config:

    $ dotnet SFA.DAS.Encoder.dll list -c

### Encoding Values

#### Encode a value using a named encoding type name with the --encode parameter

    $ dotnet SFA.DAS.Encoder.dll encode -e AccountId 1234
    Encoded: VXNNBV Value: 1234 Type:AccountId
    
#### Encode a value using a named encoding type ordinal value with the --encode parameter

    $ dotnet SFA.DAS.Encoder.dll encode -e 1 1234
    Encoded: VXNNBV Value: 1234 Type:AccountId

### Decoding Values

#### Decode a value using a specific encoding with the --encode parameter

    $ dotnet SFA.DAS.Encoder.dll decode -e 1 VXNNBV
    Encoded: VXNNBV Value: 1234 Type:AccountId Action:Decoded

### Decode a value to see what encoding types it might be using the --which flag

    $ dotnet SFA.DAS.Encoder.dll decode -w VXNNBV
    Finding decoder for value VXNNBV
    CohortReferenceSuccess - 1234
    AccountId  Success - 1234
    PublicAccountIdDecoding failed
    AccountLegalEntityId   Decoding failed - The given key 'AccountLegalEntityId' was not present in the dictionary.
    PublicAccountLegalEntityId Decoding failed
    ApprenticeshipId   Success - 1234
    
*The error shown above for AccountLegalEntityId is because the shared encoding config does not contain a value for AccountLegalEntityId.*

### Find the public/private equivalents using the pair verb

Pass in the encoded value. The encoding type does not need to be specified.

    $ dotnet SFA.DAS.Encoder.dll pair VXNNBV
    VXNNBV (AccountId) -> 1234 (decoded) -> LVKK97 (PublicAccountId)
    
Encoder accepts both the private and the public encoded values. It will automatically work out which it is:

    $ dotnet SFA.DAS.Encoder.dll pair LVKK97
    LVKK97 (PublicAccountId) -> 1234 (decoded) -> VXNNBV (AccountId)
    
Encoder recognises the following pairs:

| Private | Public |
|---------|--------|
| AccountId | PublicAccountId |
| AccountLegalEntityId | PublicAccountLegalEntityId |


When evaluating an encoded value all possible matches will be shown. So if an encoded value is both a private Account Id and a public Account Legal Entity Id (which is possible) both matches will be shown. 
 

 
