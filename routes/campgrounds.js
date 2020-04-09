var express          = require("express");
var router           = express.Router(); 
var Campground       = require("../models/campSchema"); //mongoose-model
var Comment          = require("../models/comment"); 
var methodOverride   = require("method-override");



router.get("/campgrounds",function(req,res)
{
    //show all campgrounds
    Campground.find({},function(err,campgrounds)
    {
        if(err)
        console.log(err);
        
        else
        res.render("campgrounds/campgrounds", {cg: campgrounds});
    })
   
});

router.post("/campgrounds",isLoggedIn, function(req,res)
{

    //add new campground to db 
    var per = req.body.name,
        img = req.body.image,
        des = req.body.description,
        auth ={id: req.user._id, username: req.user.username}
        newCampground = {name:per, image:img, description:des, author:auth};

    Campground.create(newCampground, function(err,newlycreated){
        if(err)
        console.log(err);

        else
        res.redirect("/campgrounds");
    });
});

router.get("/campgrounds/new",isLoggedIn, function(req,res)
{
    //show form to create new campground
    res.render("campgrounds/new");
});

router.get("/campgrounds/:id",function(req,res)
{
    //show specific campground
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground)
    {
        if(err)
        console.log(err);

        else
        // console.log(foundCampground);
        res.render("campgrounds/show", {campground : foundCampground});
    });
});

//edit form
router.get("/campgrounds/:id/edit",checkCampgroundOwnership, function(req, res)
{
    Campground.findById(req.params.id, function(err, campground)
    {
        if(err) 
        console.log(err);

        else 
        res.render("campgrounds/edit", {campground: campground});
            
       
    });
    
});

router.put("/campgrounds/:id",checkCampgroundOwnership , function(req, res)
{
    
          
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err,updatedCampground)
        {
    if(err)
    console.log(err);

        else
        res.redirect("/campgrounds/"+req.params.id);
    });


});

router.delete("/campgrounds/:id", function(req,res)
{
   Campground.findByIdAndRemove(req.params.id, function(err)
   {
       if(err)
       console.log(err);

       else
       res.redirect("/campgrounds"); 
   }); 
});

function checkCampgroundOwnership(req, res, next)
{
    if(req.isAuthenticated())
    {
        Campground.findById(req.params.id, (err, foundCampground) =>
        {
            if(err)
            res.redirect("back");

            else
            {
                if(foundCampground.author.id.equals(req.user._id))
                next();
                
                else
                res.redirect("back");
            }
        })
    }
    else
    res.redirect("back");
}

function isLoggedIn(req, res, next)
{
    if(req.isAuthenticated())
    return next();

    res.redirect("/login");
}

module.exports = router;