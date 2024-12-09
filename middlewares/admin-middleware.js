const User = require("../models/User-model");
const jwt = require("jsonwebtoken");

const isAdmin = async (req, res, next) => {
    try {

        const token = req.headers.authorization;

        if (token == null) {
            return res.status(401).json({ msg: "Invalid token" });
        }

        const getToken = token.split(" ")[1];

        const getUser = jwt.verify(getToken, process.env.JWT_SECRET_KEY);


        if (getUser == null) {
            return res.status(401).json({ msg: "Invalid token" });
        }

        const getUserId = getUser.userId.toString();

        console.log(getUserId);

        const getUserFromDb = await User.findOne({ _id: getUserId });

        if (getUserFromDb == null) {
            return res.status(401).json({ msg: "Invalid token" });
        }

        if (getUserFromDb == null) {
            return res.status(401).json({ msg: "Invalid token" });
        }

        if (getUserFromDb.role != "ADMIN") {
            return res.status(401).json({ msg: "You are not an admin" });
        }
        
        next();

    } catch (error) {
        res.status(501).json("Internal server error");
    }
}

module.exports = { isAdmin };
