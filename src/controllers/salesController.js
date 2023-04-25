const { addSales, getSales } = require("../models/salesModel");

const insertSales = async (req, res) => {
    try {
        req.body.forEach(sale => sale.store_id = req.decodedToken.store.id);
        const sales = req.body;
        const result = await addSales(sales);
        res.status(201).send(result);
    } catch (error) {
        console.log(error);
    }
};

const getSalesReport = async (req, res) => {
    try {
        const store = req.decodedToken.store;
        const result = await getSales(store);
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
    }
};


module.exports = { insertSales, getSalesReport };