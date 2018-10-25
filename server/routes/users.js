const router = require("express").Router()
const Controller = require("../controllers/userController")
const isLogin  = require("../middleware/isLogin")

router
    .post("/signup", Controller.signup)
    .post("/signin", Controller.signin)
    
module.exports = router