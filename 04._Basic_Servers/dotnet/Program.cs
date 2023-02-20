using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// builder.Services.AddEndpointsApiExplorer();

app.MapGet("/parse-csv", () => {
  Person person = FileParser.Parse("./../files/me.csv");
  return person;
});

app.MapGet("/parse-json", () => {
  Person person = FileParser.Parse("./../files/me.json");
  return person;
});

app.MapGet("/parse-xml", () => {
  Person person = FileParser.Parse("./../files/me.xml");
  return person;
});

app.MapGet("/parse-yaml", () => {
  Person person = FileParser.Parse("./../files/me.yaml");
  return person;
});

app.MapGet("/parse-txt", () => {
  Person person = FileParser.Parse("./../files/me.txt");
  return person;
});

app.Run();
