const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv").config({ path: "../.env" });
const cors = require("cors");
const { User, Exercise } = require("./schemas");

// Setting up express
const app = express();
const port = 5000;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setting up mongodb connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => console.log("Connected to MongoDB!"));

// Get routes
app.get("/users", (req, res) => {
  User.find((err, users) => {
    res.json(users);
  });
});

app.get("/:username/exercises", (req, res) => {
  Exercise.find({ username: req.params.username }, (err, exer) => {
    res.json(exer);
  });
});

// Post routes
app.post("/add-user", (req, res) => {
  const username = req.body.name;
  const user = new User({ name: username });
  user.save((err, data) => {
    if (err) res.send("Error on creating user(server.js)");
    else res.send("User added!");
  });
});

app.post("/add-exercise", (req, res) => {
  const { username, description, duration, date } = req.body;
  const exercise = new Exercise({ username, description, duration, date });
  exercise.save((err, data) => {
    if (err) console.log("error on saving exercise");
    else console.log("Exercise added!");
  });
});

app.listen(port, () =>
  console.log(`Your app is running at  http://localhost:${port}`)
);
