const {Router}=require("express")

const {pay, signup, login, add, addget} = require("../controllers/user.controller")

const router=Router()

router.post("/signup",signup)

router.post("/login",login)

router.post("/add",add)

router.get("/add",addget)

router.post("/pay",pay)

module.exports=router