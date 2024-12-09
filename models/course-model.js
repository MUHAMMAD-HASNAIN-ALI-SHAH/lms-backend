const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    enrollments: {
        type: Number,
        default:0
    },
}, { timestamps: true })

const Course = mongoose.model("Course",courseSchema);

module.exports = Course;