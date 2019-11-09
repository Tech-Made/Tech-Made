const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    title: String,
    description:  String,
    techstack: String,
    picture: String,
}, {
  timestamps: true,
});
  
module.exports = mongoose.model("Project", ProjectSchema);
