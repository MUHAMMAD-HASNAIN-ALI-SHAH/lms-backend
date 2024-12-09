const express = require("express");
const { enrollCourse } = require("../controllers/student-controller");
const router = express.Router();

router.route("/course").get(getCourses);

module.exports = router;