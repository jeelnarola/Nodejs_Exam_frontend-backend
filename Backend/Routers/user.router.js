const {Router}=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const usermodel = require("../Models/user.model")
const productmodel = require("../Models/product.schema")

const router=Router()

router.post("/signup",async(req,res)=>{
    let {username,email,password}=req.body

    let data=await usermodel.findOne({email:email})
    if(data){
        res.send({msg:"User alrdy Extis !"})
    }
    else{
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.send({error:err})
            }
            else{
                let obj={username,email,password:hash}
                let data=await usermodel.create(obj)
                let token=jwt.sign({id:data.id},"jeel")
                res.json({token})
            }
        })
    }
})

router.post("/login",async(req,res)=>{
    let {password,email}=req.body

    let data=await usermodel.findOne({email:email})
    console.log(data);
    if(!data){
        res.send({msg:"User Not Extis !"})
    }
    else{
        bcrypt.compare(password,data.password,(err,done)=>{
            if(err){
                console.log(err);
            }
            if(done){
                let token = jwt.sign({id : data._id}, "jeel");
                res.send({token})
            }else{
                res.send({msg:"Password Worng !"})
            }
        })
    }

})

router.post("/add",async(req,res)=>{
    let data=await productmodel.create(req.body)
    res.send(data)
})

router.get("/add",async(req,res)=>{
    let data=await productmodel.find()
    res.send(data)
})

module.exports=router