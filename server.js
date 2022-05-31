//creates the server
const express = require("express");
const app = express();
const port = 3000;

//Creates the register endpoint which takes a username and password and creates a user
//dummy array reps database
const db = [];
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.post("/register", (res, req) => {
  const { username, password } = req.body;

  if (!username) return res.status(400).send("Missing Username");
  if (!password) return res.status(400).send("Missing password");

  const exists = db.find((user) => user.username === username);

  if (exists) return res.status(400).send("User already exists");
  db.push({ username, password });
  res.send("User Created");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
