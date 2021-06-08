const mongoose=require("mongoose");

const pollSchema=mongoose.Schema({
    question:String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    },
    options:[{type:mongoose.Schema.Types.ObjectId,
              ref:"Option"
            }
        ],
    comments:[
            {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
            
        }
        ],
    votedUsers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    isPrivate:Boolean

})
module.exports=mongoose.model("Poll",pollSchema);