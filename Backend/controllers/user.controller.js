const Razorpay = require("razorpay")
const Rezorpay=require("razorpay")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const productmodel = require("../Models/product.schema")
const usermodel = require("../Models/user.model")

const signup=async(req,res)=>{
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
                console.log(token);
                res.json({token,username})
            }
        })
    }
}

const login=async(req,res)=>{
    let {password,email}=req.body

    let data=await usermodel.findOne({email:email})
    let username=data.username
    console.log(username);
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
                res.send({token,username})
            }else{
                res.send({msg:"Password Worng !"})
            }
        })
    }
}

const razorpay=new Rezorpay({
    key_id:"rzp_test_QKpP9x2uZ7C2u1",
    key_secret:"n61maUI0BKGYgUOsEUsOhaA8",
})
const pay=async(req,res)=>{
    let option={
        amount:req.body.amount*100,
    }

    razorpay.orders.create(option,(err,order)=>{
        console.log(order);
        if(err){
            res.send(err)
        }else{
            res.send(order)
        }
    })

}

const add=async(req,res)=>{
    let data=await productmodel.create(req.body)
    res.send(data)
}

const addget=async(req,res)=>{
    let data=await productmodel.find()
    res.send(data)
}

module.exports={pay,signup,login,add,addget}