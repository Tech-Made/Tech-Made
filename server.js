const express = require("express");
require('dotenv').config()
const app = express();
const path = require('path') // research the path native node module
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const port = process.env.PORT || 5000
require('./data/techmade-db');
const cors = require('cors')

app.use(cors({credentials: false}));

app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const logic = require('./controllers/index');
app.use(logic);

app.listen(port, () =>{
    console.log(`Server is listening on ${port}`);
});

module.exports = { app }
 
