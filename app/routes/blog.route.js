const blogController = require('../controllers/blog.controller');

module.exports = function(app, passport) {


    app.get('/auth/signin', blogController.signin)
    app.post('/auth/signin', passport.authenticate('local-login', {
        successRedirect: '/home',
        failureRedirect: '/auth/signin',
        failureFlash: true
    }));

    app.get('/home', blogController.home);
    app.get('/about', blogController.about);
    app.get('/address', blogController.address);

    app.get('/createpost', isLoggedIn, blogController.create)
    app.post('/createpost', blogController.postcreate);

    app.get('/:id', blogController.viewblog);

    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated()) {
            console.log(req.isAuthenticated())
            return next();
        } else {
            // if they aren't redirect them to the home page
            console.log(req.isAuthenticated())
            res.redirect('/auth/signin');
        }
    }
}