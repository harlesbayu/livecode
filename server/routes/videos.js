const router = require("express").Router()
const Controller = require("../controllers/youtubeController")
const isLogin  = require("../middleware/isLogin")

router
    .get("/mylikevideos", isLogin, Controller.mylikevideos)
    .post("/like", isLogin, Controller.like)
    
module.exports = router