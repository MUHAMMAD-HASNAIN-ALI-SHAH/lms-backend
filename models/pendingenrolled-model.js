const mongoose = require("mongoose");

const pendingEnrolledSchema = new mongoose.Schema({
    studentId: {
        type: String,
        ref: "user",
        required: true
    },
    courseId: {
        type: String,
        ref: "course",
        required: true
    },
    paymentDone: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("pendingEnrolled", pendingEnrolledSchema);
