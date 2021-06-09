const mongoose=require("mongoose"),
      passportLocalMongoose=require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
        username: {type:String,minlength:8},
        password: {type:String,minlength:8},
        firstName:String,
        lastName:String,
        email:{type: String, unique: true, required: true},
        resetPasswordToken: String,
    resetPasswordExpires: Date,
        isAdmin:{type:Boolean, default:false}
    });
UserSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",UserSchema);