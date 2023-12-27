const mongoose=require("mongoose")

const userschema=new mongoose.Schema({
    userschema:String,
    email:String,
    password:String
})

const usermodel=mongoose.model("user",userschema)
module.exports=usermodel