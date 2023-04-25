const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).send("Access denied");
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.decodedToken = decodedToken;

        next();
    } catch (error) {
        res.status(400).send("Invalid token");
    }
};

module.exports = authMiddleware;