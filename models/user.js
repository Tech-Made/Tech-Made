const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullName: { type: String },
    email: { type: String, required: true },
    hometown: String
}, {
  timestamps: true,
});
  
module.exports = mongoose.model("User", UserSchema);
  