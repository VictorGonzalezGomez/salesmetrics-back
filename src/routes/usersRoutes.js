
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router()
const {reportRequest} = require("../middlewares/logger")



const {insertUser, teamData, profileData,updateUserData, delUser } = require("../controllers/usersController");
const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");


router.use(bodyParser.json());
router.post("/user",reportRequest,authMiddleware, isAdmin, insertUser)
router.get("/user", reportRequest, authMiddleware, teamData)
router.delete("/user", reportRequest,authMiddleware, isAdmin, delUser)

router.get("/profile", reportRequest,authMiddleware, profileData)
router.put("/profile", reportRequest,authMiddleware, updateUserData)

module.exports = router