const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const blogRoute = require('./app/routes/blog.route')
const dbConfig = require('./app/config/database.config')
const session = require('express-session');
const passport = require('passport');
var flash = require('connect-flash');

require("./app/config/passport.config")

app.use(bodyParser.json())
    // config Passport
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('views'));
app.set('view engine', 'ejs');
app.set('views', './views');
var engine = require('ejs-locals');
app.engine('ejs', engine);


// database
mongoose.connect(process.env.MONGO_URL || dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
// config passport
app.use(session({
    secret: 'secured_key',
    resave: false,
    saveUninitialized: true
}))

app.use('/', blogRoute)
app.listen(process.env.PORT || 3000, () => {
    console.log("The server is listening on port 3000");
})