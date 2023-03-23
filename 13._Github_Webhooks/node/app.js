import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post("/githubwebhook", (req, res) => {
  console.log("Webhook received");
  const payload = JSON.parse(req.body.payload);
  console.log(payload);
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
