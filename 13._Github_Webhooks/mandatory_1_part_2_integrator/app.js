import express from "express";
import bodyParser from "body-parser";

const PORT = 3000;
// Create the express app
const app = express();

// Use body-parser to parse incoming requests
app.use(bodyParser.json());

app.post("/bob", (req, res) => {
  console.log(req.body);
  res.send("OK");
});

app.post("/alice", (req, res) => {
  console.log(req.body);
  res.send("OK");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
