using System;
using System.Text.RegularExpressions;
using System.Collections;
using System.Text.Json;
using System.Xml.Serialization;
using YamlDotNet.Serialization;

public class FileParser {

  public static string FetchFile(string filePath) {
    string text = System.IO.File.ReadAllText(filePath);
    return text;
  }

  public static Person Parse(string filePath) {
    string file = FetchFile(filePath);
    string fileType = filePath.Split(".").Last<string>();
    switch (fileType)
    {
      case "csv":
        return ParseCSV(file);
      case "json":
        return ParseJSON(file);
      case "xml":
        return ParseXML(file);
      case "yaml":
        return ParseYAML(file);
      case "txt":
        return ParseTXT(file);
      default:
        throw new Exception("File type not supported");
    }
  }

  public static Person ParseCSV(string file) {
    string[] lines = file.Split(new[] { Environment.NewLine }, StringSplitOptions.None);
    string line = "";
    if(lines.Length > 0) {
      line = lines[1];
    } else {
      return null;
    }

    string name = ""; 
    int age = 0;
    string[] hobbies = {};

    string[] fields = line.Split(",");
    if (fields[0] != null && fields[1] != null && fields[2] != null) {
      name = fields[0]; 
      age = Int32.Parse(fields[1]);
      hobbies = fields[2].Substring(1, fields[2].Length - 2).Split(";");

      return new Person(name, age, hobbies);
    } else {
      return null;
    }
  }

  public static Person ParseJSON(string file) {
    JsonSerializerOptions options = new JsonSerializerOptions
    {
      PropertyNameCaseInsensitive = true,
    };

    Person person = JsonSerializer.Deserialize<Person>(file, options);
    return person;
  }

  public static Person ParseXML(string file) {
    XmlSerializer serializer = new XmlSerializer(typeof(Person));
    Person person = DeserializeXmlFromString<Person>(file);
    return person;
  }

  // Helper for parsing XML
  private static T DeserializeXmlFromString<T>(string xmlText) {
    using (StringReader reader = new StringReader(xmlText))
    {
      XmlSerializer serializer = new XmlSerializer(typeof(T));
      return (T)serializer.Deserialize(reader);
    }
  }

  public static Person ParseYAML(string file) {
    Person person = DeserializeYamlFromString<Person>(file);
    return person;
  }

  // Helper for parsing YAML
  private static T DeserializeYamlFromString<T>(string yamlText) {
      var deserializer = new DeserializerBuilder().Build();
      return deserializer.Deserialize<T>(yamlText);
  }

  public static Person ParseTXT(string file) {
    string[] lines = file.Split(new[] { Environment.NewLine }, StringSplitOptions.None);
    
    string name = "";
    int age = 0;
    string[] hobbies = {};

    if (lines[0] != null && lines[1] != null && lines[2] != null) {
      name = lines[0].Split(": ")[1];
      age = Int32.Parse(lines[1].Split(": ")[1]);
      hobbies = lines[2].Split(": ")[1].Split(", ");

      return new Person(name, age, hobbies);
    } else {
      return null;
    }
  }
}