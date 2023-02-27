import express from "express";

const app = express();

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/date", (req, res) => {
  res.send(new Date().toString());
});

app.get("date-from-fastapi", (req, res) => {
  res.send("date-from-fastapi");
});
