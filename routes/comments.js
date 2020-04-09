var express          = require("express"),
    router           = express.Router({mergeParams: true}),
    Campground       = require("../models/campSchema"),
    Comment          = require("../models/comment");

//=============================
//     COMMENTS ROUTES
//=============================
router.get("/new", isLoggedIn, function(req,res)
{
    //FIND CAMPGROUND ASSOCIATED WITH THE ID..
    Campground.findById(req.params.id, function(err, campground)
    {
        if(err)
        console.log(err);

        else
        res.render("comments/new", {campground : campground});
    });
    
});

router.post("/",isLoggedIn, function(req, res)
{
    //GET COMMENTS..
    var foundComment = req.body.comment;
    //FIND CAPMGROUND ASSOCIATED WITH THE ID
    Campground.findById(req.params.id, function(err,campground)
    {
        if(err)
        console.log(err);

        else{
            //ASSOCIATE THE COMMENTS WITH CAMPGROUND
           
            Comment.create(foundComment, function(err,newComment)
            {
                if(err)
                console.log(err);

                else
                {
                    console.log(foundComment);
                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    newComment.save();
                    campground.comments.push(newComment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id)
                }
            });
           
        }
    });
});

function isLoggedIn(req, res, next)
{
    if(req.isAuthenticated())
    return next();

    res.redirect("/login");
}

module.exports = router;