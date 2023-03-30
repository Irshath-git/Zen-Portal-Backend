const mongoose = require("mongoose");

const Class = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    datetime: {
      type: String,
      required: true,
    },
    // content: {
    //   type: String,
    //   required: true,
    // },
    intro: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    description1: {
      type: String,
    },
    description2: {
      type: String,
    },
    description3: {
      type: String,
    },
    description4: {
      type: String,
    },
    description5: {
      type: String,
    },
    description6: {
      type: String,
    },
    preread: {
      type: String,
    },
    preread1: {
      type: String,
    },
    preread2: {
      type: String,
    },
    activities1: {
      type: String,
    },
    activities2: {
      type: String,
    },
    activities3: {
      type: String,
    },
  },
  {
    collection: "class-data",
  }
);

const classModel = mongoose.model("class-data", Class);

module.exports = classModel;
