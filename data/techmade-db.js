/* Mongoose Connection */
const mongoose = require("mongoose");
assert = require("assert");

// these a heroku env var
const url = process.env.MONGODB_URI || "mongodb://localhost/techmade-db";
mongoose.Promise = global.Promise;

mongoose.connect(
  url,
  // mongoose connection options :)
  { useNewUrlParser: true},
  function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to databasee");

    // db.close(); turn on for testing
  }
);
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection Error:"));
mongoose.set("debug", true);

module.exports = mongoose.connection;
