//===============================================================================================================================================================
//           *****RESTFUL ROUTING*****
//===============================================================================================================================================================
//   NAME         PATH                HTTP VERB        
//================================================================================================================================================================
//   Index        /dogs               GET 
//   New          /dogs/new           GET
//   Create                           POST
//   Show         /dogs/:id           GET   
//   Edit         /dogs/:id/edit      GET
//   Update       /dogs/:id           PUT
//   Destroy      /dogs/:id           DELETE

var express          = require("express"),
    bodyParser       = require("body-parser"),
    mongoose         = require("mongoose"),
    methodOverride   = require("method-override"),
    expressSanitizer = require("express-sanitizer"),  //filters js code from the html content;
    passport         = require("passport"),
    LocalStrategy    = require("passport-local"),

    Campground       = require("./models/campSchema"), //mongoose-model
    Comment          = require("./models/comment"), 
    User             = require("./models/user"),

    expressSession   = require("express-session"),
    seedDB           = require("./seed"),
    app              = express(),

    commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");

//================================================    
//            APP CONFIGURATION
//================================================   
    app.set("view engine" , "ejs");
    app.use(express.static(__dirname + "/public"));
    console.log(__dirname + "public");
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    app.use(expressSanitizer());
    app.use(methodOverride("_method"));
    app.use(expressSession({secret : "Rusty is adorable", resave : false, saveUninitialized : false}));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser()); //RESPONSIBLE FOR TAKING DATA FROM TYHE SESSION, READING THE SESSION AND ENCODING IT AND PUTTING IT BACK TO THE SESSION
    passport.deserializeUser(User.deserializeUser()); //RESPONSIBLE FOR TAKING DATA FROM TYHE SESSION, READING THE SESSION AND DENCODING IT AND PUTTTING IT BACK TO THE SESSION
    
   
    
    mongoose.connect("mongodb+srv://user:1234@mychatcatdb-v5czi.mongodb.net/yelp_camp_v9", {useNewUrlParser:true,useUnifiedTopology:true});
    

// seedDB();

app.use(function(req,res,next)
{
    res.locals.currentUser = req.user;
    next();
});

app.use("/campgrounds/:id/comments", commentRoutes);
app.use(campgroundRoutes);
app.use(indexRoutes);

 
app.get("/",function(req,res)
{
    res.redirect("/campgrounds");
});


let port = process.env.PORT;
if(port == null || port == "")
port = 3000;

app.listen(port,function()
{
    console.log("server has started!!");
});