var express     = require('express');
var bodyParser  = require('body-parser');
const cors = require('cors');
var cookieParser = require('cookie-parser');
var passport = require('passport');
require('./config/passport'),(passport);

var app = express(); // Please do not remove this line, since CLI uses this line as guidance to import new controllers
const dotenv = require("dotenv");
dotenv.config();  


require("mongodb");
require("mongodb").MongoClient;
require("./config/mongoose");
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser());
app.use(passport.initialize());
var usersController = require('./controllers/usersController');
app.use('/api/users', usersController);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(process.env.PORT || 3001, () => {
  console.log('Server is running');
});