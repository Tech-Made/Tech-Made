require('dotenv').config();
var createError = require('http-errors');
const jwt = require('jsonwebtoken');
const express = require('express');
// express-validator is a wrapper around validator.js that validates and sanitizes string inputs. In production, your users will try to type in all kinds of nonsense into your forms --- even things your site wasn't intended to deal with! express-validator plugs into the Express.js ecosystem and helps keep you and your code safe.
const expressValidator = require('express-validator');
// Essentially, body-parser is a necessary middleware to communicate with your POST requests.
const bodyParser = require('body-parser')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
const exphbs = require('express-handlebars');

app.engine('hbs', exphbs({
  defaultLayout: "main",
  extname: ".hbs",
  helpers: require("handlebars-helpers")()
}));
app.set('view engine', 'hbs');

// database connection
require('./data/techmade-db');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware is a function with access to the request object (req), the response object (res), and the next middleware in the application’s request-response cycle, commonly denoted by a variable named next.
// Middleware can:
  // Execute any code.
  // Make changes to the request and the response objects.
  // End the request-response cycle.
  // Call the next middleware in the stack.

// const errorHandling = require('./middleware/errorHandling');
const checkAuth = require('./middleware/checkAuth');
const redirectToLogin = require('./middleware/redirectToLogin');

// Create routers for every route in app
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');
const projectRouter = require('./routes/project');

// Tell app to use each of these Routers and Middleware
// app.use(errorHandling);
app.use(checkAuth);
app.use('/dashboard', redirectToLogin);
app.use(userRouter);
app.use(projectRouter);
app.use(adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// for heroku
const port = process.env.PORT || 3000;
app.listen(port);


module.exports = app;