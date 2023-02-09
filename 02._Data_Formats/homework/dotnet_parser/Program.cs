public class Program {
  public static void Main(string[] args) {
    Console.WriteLine("Parsed CSV:");
    Console.WriteLine(FileParser.Parse("./../files/me.csv"));
    Console.WriteLine();

    Console.WriteLine("Parsed JSON:");
    Console.WriteLine(FileParser.Parse("./../files/me.json"));
    Console.WriteLine();

    Console.WriteLine("Parsed XML:");
    Console.WriteLine(FileParser.Parse("./../files/me.xml"));
    Console.WriteLine();

    Console.WriteLine("Parsed YAML:");
    Console.WriteLine(FileParser.Parse("./../files/me.yaml"));
    Console.WriteLine();

    Console.WriteLine("Parsed TXT:");
    Console.WriteLine(FileParser.Parse("./../files/me.txt"));
    Console.WriteLine();
  } 
}
