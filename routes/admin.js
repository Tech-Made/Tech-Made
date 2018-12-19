const router = require('express').Router();
const User = require("../models/user");
const Project = require("../models/project");
const Update = require("../models/update");

// ADMIN GET ALL CLIENTS VIEW
router.get('/dashboard/clients', function(req, res, next) {
    console.log("in db client route");
    
    if (req.user.isAdmin) {
        // User.find
        User.find()
        .then(clients => {
            res.render('dashboard-clients', { clients } );
        })
        .catch(err => {
            console.log(err);
        });
    }
})

// ADMIN GET CLIENT USER
router.get('/dashboard/clients/:id', (req,res) => {
    clientId = req.params.id;
    User.findById(req.params.id).then(client => {
        Project.findOne( {clientId: client._id}).populate('updates')
        .then((project) => {
            res.render('client', {client, project})
        })
    }).catch(err => {
        console.log(err);
    })
});

// ADMIN POST UPDATE TO USER
router.post('/dashboard/clients/:clientId', (req,res) => {
    console.log("posting update");
    projectPercentage = req.body.projectPercentage;
    paymentsDue = req.body.paymentsDue;
    // find the specific project by the clientId attribute in Project model
    Project.findOne( {clientId: clientId} )
    .then((project) => {
        // create a new empty update and give it's values, then save it to mongo db
        const update = new Update(req.body);
        update.save()
        console.log("update:", update);
        
        // update the project with the new project %, push the update id to updates array and save project
        project.projectPercentage = projectPercentage;
        project.updates.push(update._id);
        project.paymentsDue.push(paymentsDue);
        project.save()
        console.log("project:", project);
        
        res.redirect('/dashboard/clients/'+req.params.clientId);
    }).catch(err => {
        console.log(err);
    });
});

module.exports = router;