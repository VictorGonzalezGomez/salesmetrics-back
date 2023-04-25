const {getProductsSales} = require("../models/productSalesModel");

const productSales = async (req, res) => {
    try {
        const {storeId} = req.body;
        const result = await getProductsSales(storeId);
        res.status(200).send(result);
    } catch (e) {
        const errorResponse = {
            error: 'Oops. Algo salió mal. Internal Server Error',
            message: e.message,
            code: e.code,
        }
        
        return res.status(500).json(errorResponse)
    }
};

module.exports = {productSales};