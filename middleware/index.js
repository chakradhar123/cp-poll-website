const Poll = require("../models/polls");
//all the middleware goes here
let middleWareObj = {};

middleWareObj.checkPollOwnership = (req,res,next)=>{
if(req.isAuthenticated()){
    Poll.findOne({_id:req.params.id}).then(foundPoll=>{
        
        
            //does the user own campground
            if(foundPoll.author.id.equals(req.user._id) || req.user.isAdmin){
                next();
            }
            else{
                req.flash("error", "You dont have permission to do that");
                return res.redirect("back");
            }
        
}).catch(err=>{ res.redirect("back")});
}
else{
    req.flash("error", "You need to be logged in to do that!!");
    return res.redirect("back");
}
}


middleWareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that!!");
    req.session.returnTo = req.originalUrl; 

    res.redirect("/login");
}
module.exports = middleWareObj;