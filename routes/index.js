var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET getstarted page. */
router.get('/getstarted', function(req, res, next) {
  res.render('getstarted');
});

// GET signup form
router.get("/signup" , (req,res) => {
  res.render("signup");
});

/* GET user dashboard - need to checkAuth here. */
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard');
});


module.exports = router;
