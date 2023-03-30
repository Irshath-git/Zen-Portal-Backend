const mongoose = require("mongoose");

const Task = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    frontGitCode: {
      type: String,
      required: true,
    },
    frontdeployURL: {
      type: String,
      required: true,
    },
    backGitCode: {
      type: String,
      required: true,
    },
    backdeployURL: {
      type: String,
      required: true,
    },
  },
  {
    collection: "Task-data",
  }
);

const taskModel = mongoose.model("Task-data", Task);

module.exports = taskModel;
