import express from "express";
import * as Parser from "./../../02._Data_Formats/homework/node_parser/fileParser.js";

const app = express();

app.listen(8080, () => console.log("Server is running on port 8080"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/parse-csv", (req, res) => {
  const parsedJSON = Parser.parse("./../files/me.csv");
  res.send(parsedJSON);
});

app.get("/parse-json", (req, res) => {
  const parsedJSON = Parser.parse("./../files/me.json");
  res.send(parsedJSON);
});

app.get("/parse-xml", (req, res) => {
  const parsedJSON = Parser.parse("./../files/me.xml");
  res.send(parsedJSON);
});

app.get("/parse-yaml", (req, res) => {
  const parsedJSON = Parser.parse("./../files/me.yaml");
  res.send(parsedJSON);
});

app.get("/parse-txt", (req, res) => {
  const parsedJSON = Parser.parse("./../files/me.txt");
  res.send(parsedJSON);
});
