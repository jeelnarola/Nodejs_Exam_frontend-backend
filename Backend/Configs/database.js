const { connect } = require("http2")
const mongoose=require("mongoose")

const database=async()=>{
    await mongoose.connect("mongodb+srv://jeel:narola@cluster0.dgwjmgh.mongodb.net/NodeJs?retryWrites=true&w=majority")
    console.log("database connetc")
}

module.exports=database