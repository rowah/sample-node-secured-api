//creates the server
const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const app = express();
const port = 3000;
const jwt = require("jsonwebtoken");

//Creates the register endpoint which takes a username and password and creates a user
//dummy array reps database
const db = [];
//creates access and refresh token signing secrets
const accessTokenSecret = "some-very-private-and-long-text";
const refreshTokenSecret = "some-other-private-and-long-text";
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
app.post("/login", (res, req) => {
  const { username, password } = req.body;
  const user = db.find((user) => user.username === username);
  if (!user) return res.status(404).send("User does not exist");
  if (user.password === password) {
    return res.send({
      accessToken: jwt.sign(
        { username, exp: Math.floor(Date.now() / 1000) + 30 },
        accessTokenSecret
      ),
      refreshToken: jwt.sign(
        { username, exp: Math.floor(Date.now() / 1000) + 60 },
        refreshTokenSecret
      ),
    });
  }
  return res.status(401).send("Password is incorrect");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
