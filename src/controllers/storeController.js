const {
    createStore,
    checkIfStoreAlreadyExists,
    getStore,
    updateStore,
    deleteStore,
} = require("../models/storeModel");

const { checkStoreFields } = require("../helpers/validateNewStore");

const insertStore = async (req, res) => {
    try {
        
        const { name, rut, email, address, industry } = req.body;
        const store = { name, rut, email, address, industry };

        console.log("log de store en controller", store);
        const storeExists = await checkIfStoreAlreadyExists(store);
        if (storeExists) {
            res.status(404).send("Store already exists");
        } else {
            if (checkStoreFields(store)) {
                
                res.status(500).send("Please fill all fields");
            } else {
                const result = await createStore(store);
                res.status(201).send(result);
            }
        }
    } catch (error) {
        console.log(error);
    }
};

const storeData = async (req, res) => {
    try {
        const store = await getStore(req.params.id);
        res.status(200).send(store);
    } catch (error) {
        console.log(error);
    }
};

const updateStoreData = async (req, res) => {
    try {
        const {id} = req.params;
        const { address } = req.body;
        const store = { id, address };
        const result = await updateStore(store);
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
    }
};

const delStore = async (req, res) => {

    try {
        const { id } = req.params;
        const result = await deleteStore(id);
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
    }
};



module.exports = { insertStore, storeData, updateStoreData, delStore };
