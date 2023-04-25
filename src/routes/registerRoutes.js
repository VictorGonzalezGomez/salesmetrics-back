const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const { addUserAndStore } = require("../controllers/registerController");
const { reportRequest } = require("../middlewares/logger");

// router.use(bodyParser.json());

router.post("/register", reportRequest, addUserAndStore);

module.exports = router;
