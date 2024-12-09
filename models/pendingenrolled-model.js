const mongoose = require("mongoose");

const pendingEnrolledSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true,
        unique: true
    },
    courseId: {
        type: String,
        required: true,
        unique: true
    },
    paymentDone: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("pendingEnrolled", pendingEnrolledSchema);
