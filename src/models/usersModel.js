const { pool } = require("../helpers/connectionDB");
const bcrypt = require("bcryptjs");
const e = require("express");

const registerUser = async (user) => {
    try {
        let { storeId, email, password, role, first_name, last_name } = user;
        const encriptedPassword = bcrypt.hashSync(password);
        password = encriptedPassword;
        const values = [
            storeId,
            email,
            encriptedPassword,
            role,
            first_name,
            last_name,
        ];
        const consulta =
            "INSERT INTO users (store_id, email, password, role, first_name, last_name) VALUES ($1, $2, $3, $4, $5, $6)";
        const result = await pool.query(consulta, values);
        const rowCount = result.rowCount;

        if (!rowCount) {
            throw {
                code: 404,
                message: "Cant create user",
            };
        }

        return result.rows;
    } catch (error) {
        console.log(error);
    }
};
// check if user already exists, returns true if exists, false if not
const checkIfUserAlreadyExists = async ({ email }) => {
    console.log("email on model", email);
    try {
        const consulta = "SELECT * FROM users WHERE email = $1";
        const values = [email];
        const result = await pool.query(consulta, values);

        if (result.rowCount >= 1) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
    }
};

const checkIfUserIsAdmin = async ({ id }) => {
    try {
        const query = "SELECT * FROM users WHERE id = $1 AND role = 'admin'";
        const values = [id];
        const result = await pool.query(query, values);

        if (result.rowCount >= 1) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
    }
};

const getTeam = async (storeId) => {
    try {
        values = [storeId];
        const query = "SELECT * FROM users WHERE store_id = $1";
        const result = await pool.query(query, values);
        return result.rows;
    } catch (error) {
        console.log(error);
    }
};

const getUserProfile = async (id) => {
    try {
        const values = [id];
        const query = "SELECT * FROM users WHERE id = $1";
        const result = await pool.query(query, values)
        return result.rows;
    } catch (error) {
        console.log(error);
    }
};

const updateUser = async (user) => {
    try {
        let { userId, email, password, first_name, last_name } = user;
        if (password) {
            const encriptedPassword = bcrypt.hashSync(password);
            password = encriptedPassword;
        }
        const values = [email, password, first_name, last_name, userId];
        const query =
            "UPDATE users SET email = COALESCE($1, email), password = COALESCE($2, password), first_name = COALESCE($3, first_name), last_name = COALESCE($4, last_name) WHERE id = $5";
        const result = await pool.query(query, values);

        const rowCount = result.rowCount;

        if (!rowCount) {
            throw {
                code: 404,
                message: "Cant update user",
            };
        }

        return result.rows;
    } catch (error) {
        console.log(error);
    }
};

const deleteUser = async (email, storeId) => {
    try {
        const values = [email, storeId];
        const query = "DELETE FROM users WHERE email = $1 AND store_id = $2";
        const result = await pool.query(query, values);
        const rowCount = result.rowCount;

        if (!rowCount) {
            throw {
                code: 404,
                message: "Cant delete user",
            };
        }

        return result.rows;
    } catch (error) {
        console.log(error);
    }
};


module.exports = { registerUser, checkIfUserAlreadyExists, checkIfUserIsAdmin, getTeam, getUserProfile, updateUser, deleteUser };
