using System.Xml.Serialization;
using YamlDotNet.Serialization;
[XmlRoot("me")]
public class Person {
  [XmlElement("name")]
  [YamlMember(Alias = "name")]
  public string Name { get; set; }
  [XmlElement("age")]
  [YamlMember(Alias = "age")]
  public int Age { get; set; }
  [XmlElement("hobbies")]
  [YamlMember(Alias = "hobbies")]
  public string[] Hobbies { get; set; }
  public Person(string name, int age, string[] hobbies) {
    Name = name;
    Age = age;
    Hobbies = hobbies;
  }
  public Person() {}

  public override string ToString() {
    return $"Name: {Name}, Age: {Age.ToString()}, Hobbies: {string.Join(", ", Hobbies)}";
  }
}