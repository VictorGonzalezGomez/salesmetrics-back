const express = require("express");
const router = express.Router()
const {reportRequest} = require("../middlewares/logger")

const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin")

const { insertSales, getSalesReport } = require("../controllers/salesController");



// router.post("/sales", authMiddleware, insertSales)
// router.get("/sales",reportRequest, authMiddleware, getSalesReport)

router.post("/sales",reportRequest, authMiddleware, isAdmin, insertSales)
router.get("/sales",reportRequest, authMiddleware, getSalesReport)


module.exports = router