const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  number: String,
  phone: String,
  subject: String,
  message: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model("User", UserSchema);