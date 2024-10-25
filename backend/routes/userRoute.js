const express = require("express");
const authUser = require("../middlewares/authUserMiddleware");
const { signupUser, loginUser, purchaseCourse,  getPurchasedCourses, getUserProfile } = require("../controllers/userController");
const router = express.Router();


router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/courses/:courseId", authUser("user"),purchaseCourse);
router.get("/courses/purchased", authUser("user"),getPurchasedCourses);
router.get("/profile", authUser("user"),getUserProfile);





module.exports = router;