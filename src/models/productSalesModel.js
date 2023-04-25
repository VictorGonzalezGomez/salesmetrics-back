const {pool} = require("../helpers/connectionDB")

const getProductsSales = async (storeId) => {
    try {
        const query = ` SELECT 
        store.name AS store_name,
        product_sales.product_name,
        product_sales.total_sales,
        product_sales.sale_quantity,
        product_sales.price AS product_price,
        product_sales.date
        FROM 
        product_sales
        INNER JOIN users ON product_sales.store_id = users.store_id
        LEFT JOIN store ON users.store_id = store.id
        WHERE 
        store.id = $1
        ORDER BY 
        product_sales.date;`
        const values = [storeId]
        const result = await pool.query(query, values);

        return result.rows;

    } catch (error) {
        console.log(error);
    }
}

module.exports = { getProductsSales };