const mongoose=require('mongoose')

const postSchema=new mongoose.Schema({
    id:{
        type:String,
        required:true,
        trim:true,
    },
    caption:{
        type:String,
        required:true,
        trim:true,
    },
    author:{
        type:String,
        required:true,
        trim:true,
    },
    category:{
        type:String,
        trim:true,
        required:true
    },
    desc:{
        type:String,
        required:true,
        trim:true,
    },
    profile:{
        type:String,
        required:true,
        trim:true,
    },
    date:{
        type:String,
        required:true,
        trim:true,
    },
    likes:{
        type:Number,
        trim:true
    },
    userLike:[]
   
})

const postLists=new mongoose.model("postLists",postSchema)

module.exports=postLists