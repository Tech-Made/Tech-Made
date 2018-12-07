const router = require('express').Router();
const User = require("../models/user");
const Project = require("../models/project");

router.post('/dashboard', function(req, res, next) {
    const project = new Project(req.body);
    project.save().then(() => {
        User.findByIdAndUpdate(req.user._id, { $push: { projects: project._id } })
        .then(user => {
            res.redirect('/dashboard');
        });
    });
});
  
module.exports = router;