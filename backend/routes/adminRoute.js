const express = require("express");
const { signupAdmin, loginAdmin, createCourse, updateCourse, getCourses, deleteCourse, getAllUsers, getUserDetails, deleteUser, getAdminProfile } = require("../controllers/adminController");
const authUser = require("../middlewares/authUserMiddleware");
const router = express.Router();


// POST route for admin signup
router.post("/signup", signupAdmin);
router.post("/login", loginAdmin);
router.post("/courses",authUser("admin"), createCourse);
router.put("/courses/:courseId",authUser("admin"), updateCourse);
router.get("/courses",authUser("admin"), getCourses);
router.delete("/courses/:courseId",authUser("admin"), deleteCourse);
router.get("/users",authUser("admin"), getAllUsers);
router.get("/users/:userId",authUser("admin"), getUserDetails);
router.delete("/users/:userId",authUser("admin"), deleteUser);
router.get("/profile",authUser("admin"), getAdminProfile);


module.exports = router;
