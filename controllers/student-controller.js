const Course = require("../models/course-model");
const PendingEnrolled = require("../models/pendingenrolled-model");

const enrollCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        const getCourse = await Course.findById(courseId);

        if (getCourse == null) {
            return res.status(404).json("Course not found");
        }

        const getCourseEnrolled = await Course.findOne({ studentId: req.user._id.toString(), courseId: courseId });

        if (getCourseEnrolled != null) {
            return res.status(409).json("Already enrolled");
        }

        const getPendingEnrolled = await PendingEnrolled.findOne({ courseId: courseId });

        if (getPendingEnrolled != null) {
            return res.status(409).json("Already enrolled");
        }

        await PendingEnrolled.create({ courseId: courseId, studentId: req.user._id.toString() });

        res.status(201).json({ msg: "Enrolled successfully" });

    } catch (error) {
        res.status(500).json("Internal server error");
    }
}

const getEnrolledList = async (req, res) => {
    try {

        const getEnrolled = await PendingEnrolled.find({ studentId: req.user._id.toString() });

        res.status(200).json(getEnrolled);

    } catch (error) {
        res.status(500).json("Internal server error");
    }
}

module.exports = { enrollCourse,getEnrolledList };
