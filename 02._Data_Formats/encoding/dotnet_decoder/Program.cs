string str = "Hello World!";

string encodedStr = Decoder.encodeBase64(str);
Console.WriteLine(encodedStr);

string decodedStr = Decoder.decodeBase64(encodedStr);
Console.WriteLine(decodedStr);