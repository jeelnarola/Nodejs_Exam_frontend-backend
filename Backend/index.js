
const express=require("express")
const database = require("./Configs/database")
const router = require("./Routers/user.router")
const cors=require("cors")

const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(router)

app.listen(8090,()=>{
    console.log("server satart");
    database()
})