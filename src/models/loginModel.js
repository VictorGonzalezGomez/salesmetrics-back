const {pool} = require("../helpers/connectionDB")
const verifyCredentials = async (email) => {
    try {
        const values = [email];
        const consulta = "SELECT * FROM users WHERE email = $1";
        const result = await pool.query(consulta, values);

        return result.rows;

    } catch (error) {
        console.log(error);
    }
};

module.exports = { verifyCredentials };