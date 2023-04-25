const express = require("express");
const router = express.Router()
const bodyParser = require("body-parser");
const {reportRequest} = require("../middlewares/logger")

const {userLogin}= require("../controllers/loginController")

router.post("/login",reportRequest, userLogin)

module.exports = router