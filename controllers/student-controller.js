const Course = require("../models/course-model");

const enrollCourse = async (req, res) => {
    try {

        const { courseId } = req.params;

        if (courseId == null) {
            return res.status(400).json("Invalid course");
        }

        const getCourse = await Course.findById(courseId);

        if (getCourse == null) {
            return res.status(404).json("Course not found");
        }

        await Course.findByIdAndUpdate(courseId, { $inc: { enrollments: 1 } });

        res.status(201).json({ msg: "Course enrolled" });

    } catch (error) {
        res.status(500).json("Internal server error");
    }    
}

module.exports = { enrollCourse };
