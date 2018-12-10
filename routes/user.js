const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const Project = require("../models/project");

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
    if (req.user.isAdmin == false && req.user.projects) {
        Project.findById(req.user.projects)
        .then(project => {
            res.render('dashboard', { project } )
        })
        .catch(err => {
            console.log(err);
        })
    }
    else {
        User.find()
        .then(client => {
            console.log("client:", client);
            res.render('dashboard', { client } );
        })
        .catch(err => {
            console.log(err);
        })
    }
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