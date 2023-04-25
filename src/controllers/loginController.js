const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {verifyCredentials} = require("../models/loginModel")
const {getStore} = require("../models/storeModel")

const JWT_SECRET = process.env.JWT_SECRET

const userLogin = async (req, res) => {
    const {email, password} = req.body
    // email.toLowerCase()
    // password.toLowerCase()
    console.log(email, password);
    try {
        const user = await verifyCredentials(email)
        const store = await getStore(user[0].store_id)
        //check if user is not a empty array
        if (user[0]){
            const {password: encryptedPassword} = user[0]
            const isPasswordCorrect = bcrypt.compareSync(password, encryptedPassword)

            if (isPasswordCorrect) {
                
                const tokenPayload = {
                    user: user[0],
                    store: store[0]
                };
                const token = jwt.sign(tokenPayload, JWT_SECRET)
                res.status(200).send(token)
            } else {
                res.status(500).send("Invalid user or password")
            }
            
        } else {
            res.status(500).send("Invalid user or password")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Something went wrong")
    }
}

module.exports = {userLogin}