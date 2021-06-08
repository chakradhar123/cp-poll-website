const mongoose=require("mongoose");

const optionSchema=mongoose.Schema({
    text:String,
    votes:{type:Number,default:0}
})
module.exports=mongoose.model("Option",optionSchema);