public class Decoder {
  public static void Main(string[] args) {
    Console.WriteLine("Decoded Base64:");
    Console.WriteLine(DecodeBase64("SGVsbG8gV29ybGQh"));
    Console.WriteLine();
 
    Console.WriteLine("Decoded Hex:");
    Console.WriteLine(DecodeHex("48656c6c6f20576f726c6421"));
    Console.WriteLine();
 
    Console.WriteLine("Decoded URL:");
    Console.WriteLine(DecodeURL("Hello%20World%21"));
    Console.WriteLine();
  }
 
  // Decodes a Base64 string
  public static string DecodeBase64(string encoded) {
    byte[] data = Convert.FromBase64String(encoded);
    return Encoding.UTF8.GetString(data);
  }

  public static string EncodeBase64(string decoded) {
    byte[] data = Encoding.UTF8.GetBytes(decoded);
    return Convert.ToBase64String(data);
  }
 
  // Decodes a Hex string
  public static string DecodeHex(string encoded) {
    byte[] data = new byte[encoded.Length / 2];
    for (int i = 0; i < data.Length; i++) {
      data[i] = Convert.ToByte(encoded.Substring(i * 2, 2), 16);
    }
    return Encoding.UTF8.GetString(data);
  }
 
  // Decodes a URL string
  public static string DecodeURL(string encoded) {
    return WebUtility.UrlDecode(encoded);
  }
}