const express = require("express");
const router = express.Router();
const { addCourse, updateCourse, getCourses, deleteCourse, getOneCourse } = require("../controllers/course-controller");
const { isAdmin } = require("../middlewares/admin-middleware");

router.route("/").post(isAdmin, addCourse);
router.route("/:courseId").put(isAdmin,updateCourse);
router.route("/").get(getCourses);
router.route("/:courseId").delete(isAdmin,deleteCourse);
router.route("/:courseId").get(getOneCourse);

module.exports = router;