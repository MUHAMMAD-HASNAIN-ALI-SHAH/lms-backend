const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User-model");

const register = async (req, res) => {
    try {

        const { email, password } = req.body;

        const checkUserAvailability = await User.findOne({ email: email });

        if (checkUserAvailability != null) {
            return res.status(409).json("User already registered");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({ email: email, password: hashedPassword, role: "USER" });

        res.status(201).json({ msg: "Successfully registered" });

    } catch (error) {
        res.status(500).json("Internal server error");
    }
}

const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const getUser = await User.findOne({ email: email });

        if (getUser == null) {
            return res.status(409).json("Invalid username and password");
        }

        const checkPassword = await bcrypt.compare(password,getUser.password);

        if (!checkPassword) {
            res.status(401).json({ msg: "Invalid username and password" });
        }

        const getToken = jwt.sign(
            {
                userId: getUser._id.toString(),
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "30d",
            }
        );

        res.status(200).json({ token: getToken,msg:"Successfully login" });

    } catch (error) {
        res.status(500).json("Internal server error");
    }
}

const getUserDetailsFromToken = async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ msg: "No token provided" });
        }
        const tokenSplit = token.split(" ")[1];
        if (!tokenSplit) {
            return res.status(401).json({ msg: "No token provided" });
        }
        
        const getUser = jwt.verify(tokenSplit, process.env.JWT_SECRET_KEY);

        const getUserFromDb = await User.findById(getUser.userId);
        
        if (!getUserFromDb) {
            return res.status(401).json({ msg: "Invalid token" });
        }

        const getUserDetails = {
            userId: getUserFromDb._id,
            email: getUserFromDb.email,
            role: getUserFromDb.role,
        };
        
        res.status(200).json({ user: getUserDetails });
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" });
    }
};

module.exports = { register, login, getUserDetailsFromToken };
