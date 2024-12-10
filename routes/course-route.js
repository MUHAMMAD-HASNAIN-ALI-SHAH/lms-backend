const express = require("express");
const router = express.Router();
const { addCourse, updateCourse, getCourses, deleteCourse, getOneCourse } = require("../controllers/course-controller");
const { isAdmin } = require("../middlewares/admin-middleware");

router.route("/course").post(isAdmin, addCourse);
router.route("/course/:courseId").put(isAdmin,updateCourse);
router.route("/course").get(getCourses);
router.route("/course/:courseId").delete(isAdmin,deleteCourse);
router.route("/course/:courseId").get(getOneCourse);

module.exports = router;