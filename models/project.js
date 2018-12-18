const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Update = require("../models/update");
const User = require("../models/update");

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
    projectPercentage: {type: Number, default: 5},
    clientId: { type: Schema.Types.ObjectId, ref: "User" },
    requested: {type: Boolean, default: false},
    updates : [{ type: Schema.Types.ObjectId, ref: 'Update', required: false }],
    paymentsDue: { type: Array},
    paymentsCompleted: { type: Array}
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
  