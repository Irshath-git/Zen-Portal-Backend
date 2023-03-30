const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./model/userModel");
const Class = require("./model/classModel");
const Task = require("./model/taskModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());
app.use(cors());

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 4000;

//mongodb connection
const conn = require("./db/connection");

//api check
app.get("/hello", (req, res) => {
  res.send("Hello world");
});

//user Register API
app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  newUser
    .save()
    .then(() => res.status(200).json({ message: "User created successfully" }))
    .catch((err) => res.status(500).json({ error: err.message }));
});

//Login API
app.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ userId: user._id }, "secret123");
  res.status(200).json({ token });
});

//logout api
app.post("/api/logout", (req, res) => {
  req.session = null; // clear the session object
  res.json({ message: "Logout successful" });
});

//Get all classes API
app.get("/api/classes", async (req, res) => {
  try {
    const postedClasses = await Class.find({});
    res.json(postedClasses);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

//Get class By its ID
app.get("/api/classes/:id", async (req, res) => {
  const id = req.params.id;

  Class.findOne({ id })
    .then((dataFound) => {
      if (!dataFound) {
        return res.status(404).send("Data not found");
      }
      return res.send(dataFound);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal server error");
    });
});

//To post the classes
app.post("/api/classes", async (req, res) => {
  console.log(req.body);
  try {
    await Class.create({
      id: req.body.id,
      title: req.body.title,
      datetime: req.body.datetime,
      // content: req.body.content,
      intro: req.body.intro,
      description: req.body.description,
      description1: req.body.description1,
      description2: req.body.description2,
      description3: req.body.description1,
      description4: req.body.description2,
      description5: req.body.description1,
      description6: req.body.description2,
      preread: req.body.preread,
      preread1: req.body.preread1,
      preread2: req.body.preread2,
      activities1: req.body.activities1,
      activities2: req.body.activities2,
      activities3: req.body.activities3,
    });
    res.json({ status: "Ok" });
  } catch (error) {
    res.json({ status: "Error", error: "Already added class" });
  }
});

//To post Tasks
app.post("/api/tasks", async (req, res) => {
  console.log(req.body);
  try {
    await Task.create({
      id: req.body.id,
      frontGitCode: req.body.frontGitCode,
      frontdeployURL: req.body.frontdeployURL,
      backGitCode: req.body.backGitCode,
      backdeployURL: req.body.backdeployURL,
    });
    res.json({ status: "OK" });
  } catch (error) {
    res.json({ status: "Error", error: "Already added tasks" });
    console.log(error);
  }
});

//Get all Tasks API
app.get("/api/tasks", async (req, res) => {
  try {
    const postedTasks = await Task.find({});
    res.json(postedTasks);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

//Get tasks By its ID
app.get("/api/tasks/:id", async (req, res) => {
  const id = req.params.id;

  Task.findOne({ id })
    .then((dataFound) => {
      if (!dataFound) {
        return res.status(404).send("Data not found");
      }
      return res.send(dataFound);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal server error");
    });
});

conn
  .then((db) => {
    if (!db) return process.exit(1);

    //listen to the http server
    app.listen(port, () => {
      console.log(`Server is running on port : http://localhost:${port}`);
    });

    app.on("error", (error) => {
      console.log(`Failed to connect with HTTP server : ${error}`);
    });
  })
  .catch((error) => {
    console.log(`Connection Failed...!${error}`);
  });
