const router = require('express').Router();
const User = require("../models/user");
const Project = require("../models/project");
const Update = require("../models/update");


// POST A NEW WEBSITE REQUEST FROM NEW CLIENT DASHBOARD 
router.post('/dashboard', function(req, res, next) {
    const project = new Project(req.body);
    project.save().then(() => {
        User.findByIdAndUpdate(req.user._id, { $push: { projects: project._id } })
        .then(user => {
            res.redirect('/dashboard');
        });
    });
})

// GET DASHBOARD FOR ADMIN OR CLIENT
router.get('/dashboard', function(req, res, next) {
    console.log("REQ.USER:", req.user);
    if (req.user.isAdmin == false && req.user.projects.length > 0) {
        Project.findById(req.user.projects).populate('updates')
        .then(project => {
            if (project.updates.length > 0) {
                console.log("project:", project);
                const latestUpdate = project.updates[project.updates.length-1];
                res.render('dashboard', { project, latestUpdate } );                
            } else {
                const underReviewStill = true;
                res.render('dashboard', { project, underReviewStill} )
            }
        }).catch(err => {
            console.log(err);
        })
    }
    else {
        // User.find
        User.find()
        .then(client => {
            res.render('dashboard', { client } );
        })
        .catch(err => {
            console.log(err);
        });
    };
});

// CLIENT SEND FEEDBACK TO ADMINS UPDATE
router.post('/dashboard/:updateId/feedback', (req,res) => {
    updateId = req.params.updateId;
    Update.findById(updateId)
    .then(update => {
        update.feedback.push(req.body);
        update.save()
        res.redirect('/dashboard');
    }).catch(err => {
        console.log(err);
        
    })
});

/* GET home page. */
router.get('/', function(req, res, next) {
    const currentUser = req.user;
    res.render('index', {currentUser});
});
  
module.exports = router;