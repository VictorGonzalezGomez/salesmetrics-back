const express = require("express");
const router = express.Router()
const {reportRequest} = require("../middlewares/logger")

const {productSales} = require("../controllers/productSalesController")


router.get("/productsales", reportRequest,productSales)

module.exports = router