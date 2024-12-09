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

        res.status(201).json({ msg: "User created successfully" });

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

module.exports = { register, login };
