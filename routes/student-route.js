const express = require("express");
const { enrollCourse, getEnrolledList } = require("../controllers/student-controller");
const { isAuth } = require("../middlewares/auth-middleware");
const router = express.Router();

router.route("/getEnrolled/:courseId").get(isAuth, enrollCourse);
router.route("/getEnrolled").get(isAuth, getEnrolledList);

module.exports = router;
