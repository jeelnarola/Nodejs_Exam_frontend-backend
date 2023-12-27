const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
    img:String,
    title:String,
    price:Number,
    des:String,
})

const productmodel=mongoose.model("product",productSchema)
module.exports=productmodel