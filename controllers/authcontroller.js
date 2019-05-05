var exports = module.exports = {}
 
//Render register page
exports.register = function(req, res) {
    res.render('register');
}

//Render login page
exports.login = function(req, res) {
    res.render('login');
}

//Render profile page and showed email of current user
exports.profile = function(req, res) {
    res.render('profile', {email: req.user.email});
}

//Render logout redirect
exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
}