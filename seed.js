var mongoose   = require("mongoose"),
    Campground = require("./models/campSchema"),
    express    = require("express"),
    Comment    = require("./models/comment");

var data = 
[
    {
        name: "Clouds rest",
        image: "http://yesofcorsa.com/wp-content/uploads/2018/08/Camping-High-Quality-Wallpaper.png",
        description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used before final copy is available, but it may also be used to temporarily replace copy in a process called greeking, which allows designers to consider form without the meaning of the text influencing the design . Lorem ipsum is typically a corrupted version of De finibus bonorum et malorum, a first-century BCE text by the Roman statesman and philosopher Cicero, with words altered, added, and removed to make it nonsensical, improper Latin." 
    },
    {
        name: "Erangel",
        image: "http://wallpapercave.com/wp/wp1857481.jpg",
        description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used before final copy is available, but it may also be used to temporarily replace copy in a process called greeking, which allows designers to consider form without the meaning of the text influencing the design . Lorem ipsum is typically a corrupted version of De finibus bonorum et malorum, a first-century BCE text by the Roman statesman and philosopher Cicero, with words altered, added, and removed to make it nonsensical, improper Latin." 
    },
    {
        name: "Wikendi",
        image: "http://images.financialexpress.com/2016/05/TUTC.jpg",
        description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used before final copy is available, but it may also be used to temporarily replace copy in a process called greeking, which allows designers to consider form without the meaning of the text influencing the design . Lorem ipsum is typically a corrupted version of De finibus bonorum et malorum, a first-century BCE text by the Roman statesman and philosopher Cicero, with words altered, added, and removed to make it nonsensical, improper Latin."
    }
];

function seedDB()
{
    Campground.remove({},function(err)
    {
        if(err)
        console.log(err);

    //     else
    //     {
    //         console.log("removed campgrounds!");
    //        data.forEach(function(seed)
    //        {
    //             Campground.create(seed, function(err, campground){
    //             if(err)
    //             console.log(err);

    //             else
    //             {
    //                 console.log("data inserted");
    //                 //CREATE COMMENT
    //                 Comment.create(
    //                     {
    //                         text: "This place is great!!",
    //                         author: "homer"
    //                     },function(err, comment)
    //                     {
    //                         if(err)
    //                         console.log(err);

    //                         else
    //                         {
    //                             campground.comments.push(comment);
    //                             campground.save();
    //                             console.log("created new comment");
    //                         }

    //                     });
    //             }    
    //         });
    //        })
    //     }
       
    }); 
}   

module.exports = seedDB;