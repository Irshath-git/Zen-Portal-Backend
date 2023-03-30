const mongoose = require("mongoose");

const conn = mongoose
  .connect(process.env.MONGO_URI)
  .then((db) => {
    console.log("Database Connected");
    return db;
  })
  .catch((error) => {
    console.log(error);
  });

// console.log(process.env.MONGO_URI);

module.exports = conn;
