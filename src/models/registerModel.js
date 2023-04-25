const { pool } = require("../helpers/connectionDB")
const bcrypt = require("bcryptjs");


const registerUserAndStore = async (user, store) => {
    try {
        let { email, password, role, first_name, last_name } = user;
        let { store_name, rut, industry, address, store_email } = store;
        const encriptedPassword = bcrypt.hashSync(password);
        password = encriptedPassword;
        const userValues = [
            email,
            encriptedPassword,
            role,
            first_name,
            last_name,
        ];
        const storeValues = [
            store_name,
            rut,
            industry,
            address,
            store_email
        ];
        const userQuery =
            "INSERT INTO users (email, password, role, first_name, last_name, store_id) VALUES ($1, $2, $3, $4, $5, $6)";
        const storeQuery =
            "INSERT INTO store (name, rut, industry, address, email_adress) VALUES ($1, $2, $3, $4, $5) RETURNING id";
        const storeResult = await pool.query(storeQuery, storeValues);
        const storeId = storeResult.rows[0].id;
        const userValuesWithStoreId = [
            email,
            encriptedPassword,
            role,
            first_name,
            last_name,
            storeId,
        ];
        const userResult = await pool.query(userQuery, userValuesWithStoreId)
        const userRowCount = userResult.rowCount;
        const storeRowCount = storeResult.rowCount;
    
        if (!userRowCount || !storeRowCount) {
            throw {
                code: 404,
                message: "Cant create user",
            };
        }
        return userResult.rows;
    }
    catch (error) {
        console.log(error);
    }

};

// check if user already exists, returns true if exists, false if not
const checkIfUserAlreadyExists = async ({ email }) => {
    try {
        const query = "SELECT * FROM users WHERE email = $1";
        const values = [email];
        const result = await pool.query(query, values);

        if (result.rowCount >= 1) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
    }
}

const checkIfStoreAlreadyExists = async ({ rut }) => {
    try {
        const query = "SELECT * FROM store WHERE rut = $1";
        const values = [rut];
        const result = await pool.query(query, values);

        if (result.rowCount >= 1) {
            return true;
        }
        else {
            return false;
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { registerUserAndStore, checkIfUserAlreadyExists, checkIfStoreAlreadyExists };