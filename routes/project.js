var express = require('express');
var router = express.Router();
const User = require("../models/user");
const Project = require("../models/project");

router.post('/request', function(req, res, next) {
    const currentUser = req.user;
    if (currentUser) {
        User.findById(currentUser._uid).then(user => {
            const project = new Project(req.body);
            console.log("project:", project);
            project.stage += 1;
            project.save().then((project) => {
                console.log("currentUser:",currentUser);
                
                res.render('dashboard', {currentUser} );
            })
        });
    } else {
        res.redirect('/login')
    }
  });
  
module.exports = router;