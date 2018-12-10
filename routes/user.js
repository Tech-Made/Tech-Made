const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const Project = require("../models/project");
const Update = require("../models/update");


// middleware
const checkAuth = require("../middleware/checkAuth");
const redirectToLogin = require("../middleware/redirectToLogin");

// refactor code like this.
// router.route('/login')
//     .post()
//     .get(/* logic goes here */)!

router.post('/login', (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    User.findOne({username}, "username password").then(user => {
        if(!user) {
            // User not found
            return res.status(401).send({ message: "Wrong Username" });
        }
        // check password
        user.comparePassword(password, (err, isMatch) => {
            if (!isMatch) {
                // Password does not match
                return res.status(401).send({ message: "Wrong Username or password" });
            }
            // Create a token
            const token = jwt.sign({_id: user._id, username: user.username}, process.env.SECRET, {
                expiresIn: "60 days"
            });
            // Set a cookie and redirect to root
            res.cookie("nToken", token, {maxAge: 900000, httpOnly:true});
            User.findById(user._id).then(user => {
                res.redirect('dashboard');
            })
            
        });
    })
    .catch(err => {
        console.log(err);
    });
});


router.get('/login', (req,res) => {
    // Checks if there's a a user and if that user's an admin.
    const currentUser = req.user;
    if (currentUser) {
        User.findById(currentUser._id).then(user => {
            if (user.isAdmin == true) {
                    res.redirect("admin-dashboard");
            } else {
                res.redirect('dashboard');
            }
        })
    } else {
            res.render('login');
    }
});

/* GET user dashboard - need to checkAuth here. */
router.get('/dashboard', function(req, res, next) {
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

// LOGOUT
router.get('/logout', (req, res) => {
    res.clearCookie('nToken');
    res.redirect('/');
});

/* GET start page. */
router.get('/start', function(req, res, next) {
    if (req.user) {
        res.redirect('dashboard');
    } else {
        res.render('start');
    }
});  

// SIGN UP POST
router.post("/start", (req, res) => {
    const username = req.body.username;
    // const email = req.body.email;
    User.findOne({username}, "username").then(user => {
        if(user) {
            return res.status(401).send({ message: "Account with this username already exists" });
        }
    });
    // Create User and JWT
    const user = new User(req.body);
    user.save().then((user) => {
        const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.SECRET, { expiresIn: "60 days" });
        console.log("token:", token);
        // set the cookie when someone signs up and logs in
        res.cookie('nToken', token, { maxAge: 600000, httpOnly: true });
        console.log("new user:", user);
        
        res.redirect("/dashboard");
    })
    .catch(err => {
        console.log(err.message);
        return res.status(400).send({ err: err });
    });
});

module.exports = router;