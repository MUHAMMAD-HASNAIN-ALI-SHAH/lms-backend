const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        console.log("Connected to db")
    } catch (error) {
        console.log("Connection unsuccessful")
    }
}

module.exports = connectDb;