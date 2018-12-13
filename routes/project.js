const router = require('express').Router();
const User = require("../models/user");
const Project = require("../models/project");
const Update = require("../models/update");

router.route('/dashboard')
    .post('/dashboard', function(req, res, next) {
        const project = new Project(req.body);
        project.save().then(() => {
            User.findByIdAndUpdate(req.user._id, { $push: { projects: project._id } })
            .then(user => {
                res.redirect('/dashboard');
            });
        });
    })

    .get('/dashboard', function(req, res, next) {
        if (req.user.isAdmin == false && req.user.projects.length > 0) {
            Project.findById(req.user.projects)
            .then(project => {
                console.log("PROJECT UPDATE HERE:", project.updates);
                if (project.updates.length != 0) {
                    console.log("project update ain't 0");
                    const updateId = project.updates[project.updates.length-1]
                    Update.findById(updateId)
                    .then(update => {
                        // console.log("update:", update);
                        res.render('dashboard', { project, update } )
                    })
                }
                else {
                    res.render('dashboard', { project } )
                }
            })
            .catch(err => {
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

router.get('/dashboard/users/:id', (req,res) => {
    clientId = req.params.id;
    console.log("clientId:", clientId);
    User.findById(clientId)
    .then((client) => {
        console.log("client:", client);
        res.render('client', {client} );
    }).catch(err => {
        console.log(err);
    });
});

// ADMIN POST UPDATE TO USER
router.post('/dashboard/users/:clientId', (req,res) => {
    title = req.body.title;
    projectPercentage = req.body.projectPercentage;
    console.log("projectPercentage:", projectPercentage);
    clientId = req.params.clientId;
    // console.log("clientId:", clientId);    
    Project.findOne( {clientId: clientId} )
    .then((project) => {
        // console.log("project:", project);
        const update = new Update();
        // console.log("update:", update); 
        update.title = title;
        // console.log("update updated:", update);
        update.save();
        // console.log("project:", project);
        // console.log("project updates:", project.updates);
        project.projectPercentage = projectPercentage;
        project.updates.push(update._id);
        // console.log("project updates:", project.updates)
        project.save()
        res.redirect('/dashboard');
    }).catch(err => {
        console.log(err);
    });
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