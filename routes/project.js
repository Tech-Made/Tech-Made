var express = require('express');
var router = express.Router();
const User = require("../models/user");
const Project = require("../models/project");

router.post('/dashboard', function(req, res, next) {
    console.log("Req User _id:", req.user._id);
    
    User.findById(req.user._id).then(user => {
        console.log("user found:", user);
        const project = new Project(req.body);
        console.log("project:", project);
        project.stage += 1;
        user.projects.push(project._id);
        user.fullName = "CHANGED"
        console.log("user updated:", user);
    }).then(e => {
        console.log("rendering dashboard");
        
        res.redirect('dashboard')
    });
  });
  
module.exports = router;