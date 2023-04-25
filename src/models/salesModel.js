const { pool } = require("../helpers/connectionDB");

// add sales receives an array of sales
// needs to insert each sale into the database
const addSales = async (sales) => {
    let result = null;
    
    console.log("log en addSales", sales);
    try {
        
        for (let sale of sales) {
            // destructure the sale
            let { date, store_id, product_id, product_description, total_sold, unit_price, units_sold } = sale;
            // create the values array
            const values = [product_id, product_description, store_id, unit_price, total_sold, units_sold, date];
            // create the query
            const consulta =
                "INSERT INTO product_sales VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7)";
            // execute the query
            result = await pool.query(consulta, values);
            // get the row count
            const rowCount = result.rowCount;
            // if the row count is 0, throw an error
            if (!rowCount) {
                throw {
                    code: 422,
                    message: "Cant create sale",
                };
            }
        }
        // return the result
        console.log("log result", result.rows);
        return result.rows;
    } catch (error) {
        console.log(error);
    }

    

};

const getSales = async ( store ) => {
    try {
        const { id } = store;
        const values = [id];
        const consulta = "SELECT * FROM product_sales WHERE store_id = $1";
        const result = await pool.query(consulta, values);
        return result.rows;
    } catch (error) {
        console.log(error);
    }
};

module.exports = { addSales, getSales };