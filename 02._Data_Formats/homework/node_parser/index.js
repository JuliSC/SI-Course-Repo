import * as Parser from "./fileParser.js";

// Parsing a CSV file
let parsedCsv = Parser.parse("./../files/me.csv");
console.log("Parsed CSV: ");
console.log(parsedCsv[0]);
console.log();

// Parsing a JSON file
let parsedJson = Parser.parse("./../files/me.json");
console.log("Parsed JSON: ");
console.log(parsedJson);
console.log();

// Parsing an XML file
let parsedXml = Parser.parse("./../files/me.xml");
console.log("Parsed XML: ");
console.log(parsedXml);
console.log();

// Parsing a YAML file
let parsedYaml = Parser.parse("./../files/me.yaml");
console.log("Parsed YAML: ");
console.log(parsedYaml);
console.log();

// Parsing a TXT file
let parsedTxt = Parser.parse("./../files/me.txt");
console.log("Parsed TXT: ");
console.log(parsedTxt);
console.log();
