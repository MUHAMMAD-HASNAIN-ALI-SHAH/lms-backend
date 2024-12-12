const Course = require("../models/course-model");
const pendingenrolledModel = require("../models/pendingenrolled-model");
const User = require("../models/User-model");

const verifyEnrollment = async (req, res) => {
    try {

        const { id } = req.params;

        const pendingEnrolled = await pendingenrolledModel.findById(id);

        if (pendingEnrolled == null) {
            return res.status(404).json("Pending enrolled not found");
        }

        pendingEnrolled.paymentDone = true;

        await pendingEnrolled.save();
        
        return res.status(200).json("Successfully verified");

    } catch (error) {
        res.status(500).json("Internal server error");
    }
}

const getAllEnrollments = async (req, res) => {
    try {

        const allEnrollemnts = await pendingenrolledModel.find();

        return res.status(200).json(allEnrollemnts);

    } catch (error) {
        res.status(500).json("Internal server error");
    }
}

module.exports = { verifyEnrollment, getAllEnrollments };
