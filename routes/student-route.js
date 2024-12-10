const express = require("express");
const { enrollCourse } = require("../controllers/student-controller");
const router = express.Router();

router.route("/getEnrolled/:courseId").get(enrollCourse);

module.exports = router;
