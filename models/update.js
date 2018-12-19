const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UpdateSchema = new Schema ({
    createdAt: { type: Date },
    updatedAt: { type: Date },
    title: { type: String, required: true },
    details: { type: String, required: true },
    image: {type: String},
    feedback: { type: Array},
    feedbackResolved : {type: Array, required: 0}
    // feedback : [{ type: Schema.Types.ObjectId, ref: 'Feedback', required: false }]

});

UpdateSchema.pre("save", function(next) {
    // SET createdAt AND updatedAt
    const now = new Date();
    this.updatedAt = now;
  
    if (!this.createdAt) {
      this.createdAt = now;
    }
  
    next();
  });
  
  module.exports = mongoose.model("Update", UpdateSchema);
  