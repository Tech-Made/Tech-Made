const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Update = require("../models/update");

const ProjectSchema = new Schema({
    createdAt: { type: Date },
    updatedAt: { type: Date },
    title: { type: String, required: true },
    details: { type: String, required: true },
    colors: { type: String },
    inspirations: { type: String},
    comments: { type: String},
    timeline: { type: String},
    budget: {type: String},
    stage: { type: Number, default: 0 },
    requested: {type: Boolean, default: false}
    // updates : { type: Schema.Types.ObjectId, ref: "Update" }
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
  