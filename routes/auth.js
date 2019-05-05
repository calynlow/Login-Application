var authController = require('../controllers/authcontroller.js');
 
module.exports = function(app, passport) {
    app.get('/register', authController.register);
    app.get('/login', authController.login);
    app.get('/profile',isLoggedIn, authController.profile);
    app.get('/logout',authController.logout);

    //Post (REGISTER) - Success go to Profile Page while fail go to Register Page
    app.post('/register', passport.authenticate('local-register', {
            successRedirect: '/profile',
            failureRedirect: '/register'
        }
    ));
    
    //Check User is still logged in the account
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())       
            return next();          
        res.redirect('/login');
    }

    //Post (LOGIN) - Sucess go to Profile Page while fail go to Login Page
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login'
    }));

    //Get User information
    app.use(function(req, res, next){
        res.locals.user = req.user;
        next();
    });
 
}