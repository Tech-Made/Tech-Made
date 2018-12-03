const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Update = require("../models/update");

const ProjectSchema = new Schema({
    createdAt: { type: Date },
    updatedAt: { type: Date },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    inspirations: { type: String},
    budget: {type: String},
    updates : { type: Schema.Types.ObjectId, ref: "Update", required: true }
});

ProjectSchema.pre("save", function(next) {
    // SET createdAt AND updatedAt
    const now = new Date();
    this.updatedAt = now;
  
    if (!this.createdAt) {
      this.createdAt = now;
    }
  
    next();
  });
  
  module.exports = mongoose.model("Project", ProjectSchema);
  