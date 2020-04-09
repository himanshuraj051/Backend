var express   = require("express"),
    router    = express.Router(),
    passport  = require("passport"),
    User      = require("../models/user");

//======================
//    AUTH ROUTES
//======================
//show register form
router.get("/register", function(req, res)
{
    res.render("authentication/register");
});

//registration
router.post("/register", function(req, res)
{
    var newUser = new User({username : req.body.username});
    User.register(newUser, req.body.password, function(err, user)
    {
        if(err)
        return res.render("authentication/register");
        
        passport.authenticate("local")(req, res, function()
        {
            res.redirect("/campgrounds");
        });
    });
});

//show login form
router.get("/login", function(req,res)
{
    res.render("authentication/login");
});

//authenticating login
router.post("/login", passport.authenticate("local" ,
{
    successRedirect : "/campgrounds",
    failureRedirect : "/login"
}), function(req,res)
{
    
});

router.get("/logout", function(req, res)
{
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next)
{
    if(req.isAuthenticated())
    return next();

    res.redirect("/login");
}

module.exports = router;