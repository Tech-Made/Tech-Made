const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// one-way hashing algorithm. You cannot retrieve the plain text password without already knowing the salt, rounds and key (password).
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  createdAt: { type: Date },
  updatedAt: { type: Date },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, select: false },
  projects : [{ type: Schema.Types.ObjectId, ref: "Project", required: false }],
  isAdmin: { type: Boolean, default: false }
});

// Must use function here! ES6 => functions do not bind this! - Tut
// Define the callback with a regular function to avoid problems with this - JC
UserSchema.pre("save", function(next) {
  // SET createdAt AND updatedAt
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  // ENCRYPT PASSWORD
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      next();
    });
  });
});
  
// Need to use function to enable this.password to work.
UserSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    done(err, isMatch);
  });
};


module.exports = mongoose.model("User", UserSchema);