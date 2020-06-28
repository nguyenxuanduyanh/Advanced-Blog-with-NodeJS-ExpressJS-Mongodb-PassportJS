const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const blogRoute = require('./app/routes/blog.route')
const dbConfig = require('./app/config/database.config')
const flash = require('connect-flash')
const passport = require('passport')
const session = require('express-session');
app.use(bodyParser.json())
    // create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('views'));
app.set('view engine', 'ejs');
app.set('views', './views');
var engine = require('ejs-locals');
app.engine('ejs', engine);
app.use(session({ secret: 'ilearnnodejs' }));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/config/passport.config')(passport);
require('./app/routes/blog.route')(app, passport);


// database
mongoose.connect(process.env.MONGO_URL || dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


app.use('/', blogRoute)
app.listen(process.env.PORT || 3000, () => {
    console.log("The server is listening on port 3000");
})