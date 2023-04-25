const {
    registerUserAndStore,
    checkIfUserAlreadyExists,
    checkIfStoreAlreadyExists 
} = require("../models/registerModel");

const { checkUserFields } = require("../helpers/validateNewUser");

const addUserAndStore = async (req, res) => {
    try {
        const role = 'admin'
        const { email, password, first_name, last_name, store_name, rut, industry, address, store_email } = req.body;
        const user = { email, password, role, first_name, last_name };
        const store = { store_name, rut, industry, address, store_email };
        const userExists = await checkIfUserAlreadyExists(user);
        const storeExists = await checkIfStoreAlreadyExists(store);
        if (userExists) {
            res.status(404).send("User already exists");
        } else if (storeExists) {
            res.status(404).send("Store already exists");
        } else {
            if (checkUserFields(user)) {
                console.log(checkUserFields(user));
                res.status(500).send("Please fill all fields");
            } else {
                const result = await registerUserAndStore(user, store);
                res.status(200).send(result);
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
}
};

module.exports = { addUserAndStore };

