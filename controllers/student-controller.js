const Course = require("../models/course-model");
const PendingEnrolled = require("../models/pendingenrolled-model");

const enrollCourse = async (req, res) => {
    try {

        const { courseId } = req.params;

        const getCourse = await Course.findById(courseId);

        if (getCourse == null) {
            return res.status(404).json({ msg: "Course not found" });
        }

        const userId = req.user._id.toString();

        const checkUserAlreadyEnrolled = await PendingEnrolled.findOne({ studentId: userId, courseId: getCourse._id.toString() });

        if (checkUserAlreadyEnrolled != null) {
            return res.status(400).json({ msg: "User already enrolled in this course" });
        }

        await PendingEnrolled.create({ studentId: userId, courseId: getCourse._id.toString() });

        res.status(200).json({ msg: "Course enrolled" });

    } catch (error) {
        res.status(500).json("Internal server error");
    }
}

module.exports = { enrollCourse };
