const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    // updatedAt: { type: Date },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    author : { type: Schema.Types.ObjectId, ref: "User", required: true }
});

PostSchema.pre("save", function(next) {
    // SET createdAt AND updatedAt
    const now = new Date();
    this.updatedAt = now;
  
    if (!this.createdAt) {
      this.createdAt = now;
    }
  
    next();
  });
  
  module.exports = mongoose.model("Post", PostSchema);
  