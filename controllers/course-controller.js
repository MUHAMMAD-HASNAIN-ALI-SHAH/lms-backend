const Course = require("../models/course-model");

const addCourse = async (req, res) => {
    try {

        const { name, image, price, duration } = req.body;

        console.log(name, image, price, duration);

        await Course.create({ name, image, price, duration });

        res.status(201).json({ msg: "Course created" });


    } catch (error) {
        res.status(500).json("Internal server error");
    }
}

const updateCourse = async (req, res) => {
    try {

        const { _id, name, image, price, duration } = req.body;

        if (_id == null) {
            return res.status(400).json("Invalid course");
        }

        const getCourse = await Course.findOne({ _id });

        if (getCourse == null) {
            return res.status(404).json("Course not found");
        }

        await Course.findOneAndUpdate({ _id }, { name, image, price, duration });

        res.status(201).json({ msg: "Course updated" });

    } catch (error) {
        res.status(500).json("Internal server error");
    }
}

const getCourses = async (req, res) => {
    try {

        const getCourses = await Course.find();

        res.status(200).json(getCourses);

    } catch (error) {
        res.status(500).json("Internal server error");
    }
}

const deleteCourse = async (req, res) => {
    try {

        const { courseId } = req.params;

        if (courseId == null) {
            return res.status(400).json("Invalid course");
        }

        const getCourse = await Course.findById(courseId);

        if (getCourse == null) {
            return res.status(404).json("Course not found");
        }

        await Course.findByIdAndDelete(courseId);

        res.status(201).json({ msg: "Course deleted" });

    } catch (error) {
        res.status(500).json("Internal server error");
    }
}

const getOneCourse = async (req, res) => {
    try {

        const { courseId } = req.params;

        if (courseId == null) {
            return res.status(400).json("Invalid course");
        }

        const getCourse = await Course.findById(courseId);

        if (getCourse == null) {
            return res.status(404).json("Course not found");
        }

        res.status(200).json(getCourse);

    } catch (error) {
        res.status(500).json("Internal server error");
    }
}

module.exports = { addCourse, updateCourse, getCourses, deleteCourse, getOneCourse };
