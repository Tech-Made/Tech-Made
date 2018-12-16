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
    // OLD CODE DUMB
                // for (let i = 0; i < project.updates.length; i++) {
            //     console.log("updateId", project.updates[i]);            
            //     Update.findById(project.updates[i]).then((update) => {
            //         console.log("Update Object Found:", update);
            //     }).catch(err => {
            //         console.log(err);
            //     });
                    // append into an empty dictionary - key: update._id value: (attribute: data, attribute: data, etc)
                    // updatesDict.push(update._id = [update.title, update.details, update,image]);
                    // console.log("UPDATES DICTIONARY:",  updatesDict);
                // })
    // res.render('client', {client, updatesDict} );

// ADMIN POST UPDATE TO USER
router.post('/dashboard/clients/:clientId', (req,res) => {
    console.log("posting");
    
    // grab inputs from update form

    title = req.body.title;
    projectPercentage = req.body.projectPercentage;
    image = req.body.image;
    details = req.body.details;
    clientId = req.params.clientId;
    console.log("got values");
    
    // find the specific project by the clientId attribute in Project model
    Project.findOne( {clientId: clientId} )
    .then((project) => {
        // take a look a the project we found
        // console.log("project:", project);
        
        // create a new empty update and give it's values, then save it to mongo db
        const update = new Update();
        //TODO: Refactor code to insert req.body in the update.
        update.title = title;
        update.details = details;
        update.image = image;
        update.save();
        console.log("saved update:", update);
        
        // update the project with the new project %, push the update id to updates array and save project
        project.projectPercentage = projectPercentage;
        project.updates.push(update._id);
        project.save()
        console.log("updated project:", project);
        res.redirect('/dashboard');
    }).catch(err => {
        console.log(err);
    });
});

module.exports = router;