const express = require("express");
const { isAdmin } = require("../middlewares/admin-middleware");
const { verifyEnrollment, getAllEnrollments } = require("../controllers/admin-controller");
const router = express.Router();

router.route("/verifyEnrollment/:id").get(isAdmin, verifyEnrollment);
router.route("/getAllEnrollments").get(isAdmin, getAllEnrollments);

module.exports = router;
