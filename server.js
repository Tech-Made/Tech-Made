const express = require("express");
require('dotenv').config()
const app = express();
const path = require('path') // research the path native node module
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 5000
require('./data/canine-club-chicago-db');
const cors = require('cors')

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.engine('hbs', exphbs({
    defaultLayout: "main",
    extname: ".hbs",
    helpers: require("handlebars-helpers")(),
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
  }));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors({credentials: false}));

app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routers
const pagesRouter = require('./controllers/pages');
const emailRouter = require('./controllers/emails');
app.use(pagesRouter);
app.use(emailRouter);

app.listen(port, () =>{
    console.log(`Server is listening on ${port} 💸 💻`);
});
module.exports = { app }
 