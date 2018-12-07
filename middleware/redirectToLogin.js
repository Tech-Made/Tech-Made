const User = require('../models/user');
const jwt = require('jsonwebtoken');
const checkAuth = require('./checkAuth');

module.exports = (req, res, next) => {
    console.log("checking redirect");
    
    checkAuth(req, res, function () {
        if (res.locals.authenticatedUser) {
            next();
        }
        else {
            res.redirect('/');
        }
    });
};