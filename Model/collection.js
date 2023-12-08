const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    uname:{
        type:String,
        trim:true,
        required:true
    },
    mobile:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    psw:{
        type:String,
        required:true,
        trim:true
    },

})

const users=new mongoose.model("users",userSchema)

module.exports=users