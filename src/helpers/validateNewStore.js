const checkStoreFields = (store) => {
    const { name, rut, email, address, industry } = store;
    // all fields are required
    console.log("log de store en validator", name, rut, email, address, industry);
    if (
        name === "" ||
        rut === "" ||
        email === "" ||
        address === "" ||
        industry === ""
    ) {
        return true;
    } else {
        return false;
    }

};

module.exports = { checkStoreFields };
