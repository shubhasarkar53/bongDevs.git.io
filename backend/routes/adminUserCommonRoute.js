const express = require("express");
const authUser = require("../middlewares/authUserMiddleware");
const { getCourseDetails, getAllPublishedCourses } = require("../controllers/adminUserCommon");
const router = express.Router();

router.get("/courses/:courseId", authUser("admin", "user"), getCourseDetails);
router.get("/courses", authUser("admin", "user"), getAllPublishedCourses);

module.exports = router;
