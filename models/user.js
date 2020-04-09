var mongoose              = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");


    var UserSchema = new mongoose.Schema
    ({
        username : String,
        password : String
    });
 
    UserSchema.plugin(passportLocalMongoose); //ADDS BUNCH OF METHODS THAT COMES ALONG WITH PASSPORT-LOCAL-MONGOOSE..
    module.exports = mongoose.model("User" , UserSchema);
