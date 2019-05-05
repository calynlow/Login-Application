var express = require('express');
var app = express();
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var models = require("./models");
var env = require('dotenv').config();
var exphbs = require('express-handlebars')

//Loading Page
app.get('/', function(req, res) {
    res.send('Welcome to Login and Register Application');
});
 
//Starting Server
app.listen(4000, function(err) {
    if (!err)
        console.log("Website is running.");
    else 
        console.log(err);
});

//Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Passport
app.use(session({ secret: 'rentech',resave: true, saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());

//Sync Database
models.sequelize.sync().then(function() {
    console.log('Database is working fine.');
 }).catch(function(err) {
     console.log(err, "Something went wrong with the Database!");
});

//For Handlebars
app.set('views', './views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Loading Passport
require('./config/passport/passport.js')(passport, models.user);

//Routes
var authRoute = require('./routes/auth.js')(app,passport);
