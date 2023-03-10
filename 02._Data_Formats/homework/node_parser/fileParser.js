import fs from "fs";
import xml2js from "xml2js";
import yaml from "js-yaml";

// Function for fetching a file from path
function fetchFile(filePath) {
  let file = fs.readFileSync(filePath, "utf8");
  return file;
}

// Generic function to parse any file type from a path
function parse(filePath) {
  const file = fetchFile(filePath);
  const type = filePath.split(".").pop();

  switch (type) {
    case "csv":
      return parseCSV(file);
    case "json":
      return parseJSON(file);
    case "xml":
      return parseXML(file);
    case "yaml":
      return parseYaml(file);
    case "txt":
      return parseTxt(file);
    default:
      return Error("File type not supported");
  }
}

// Specific functions to parse each file type

// CSV file parser looping through each line and splitting it by comma
// If the value is an array, it will be split by semicolon
// Returns an array of objects
function parseCSV(file) {
  const lines = file.split(/[/\r|\n/]+/);
  const headers = lines.shift().split(",");

  let result = [];

  lines.forEach((line) => {
    let obj = {};
    let currentline = line.split(",");
    headers.forEach((header, i) => {
      if (currentline[i].startsWith("[") && currentline[i].endsWith("]")) {
        currentline[i] = currentline[i].slice(1, -1);
        currentline[i] = currentline[i].split(";");
      }
      obj[header] = currentline[i];
    });
    result.push(obj);
  });
  return result;
}

// JSON file parser using JSON.parse()
function parseJSON(file) {
  JSON.parse(file);
  return JSON.parse(file);
}

// XML file parser using xml2js npm package
function parseXML(file) {
  let result = {};

  const parser = new xml2js.Parser({explicitArray: false});
  parser.parseString(file, (err, data) => {
    if (err) {
      throw err;
    }

    const {me} = data;
    result = me;
  });
  return result;
}

// YAML file parser using js-yaml npm package
function parseYaml(file) {
  return yaml.load(file);
}

// TXT file parser looping through each line and splitting it by colon and space
// If the value is an array, it will be split by comma
function parseTxt(file) {
  const lines = file.split(/[/\r|\n/]+/);

  let obj = {};
  lines.forEach((line) => {
    let currentline = line.split(": ");

    if (currentline[1].includes(",")) {
      currentline[1] = currentline[1].split(", ");
    }
    obj[currentline[0].toLowerCase()] = currentline[1];
  });
  return obj;
}

export {parse};
