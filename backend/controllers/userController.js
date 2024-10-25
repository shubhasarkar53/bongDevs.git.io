const User = require("../Models/User"); // Import your Admin model
const Course = require("../Models/Course");
const asyncHandler = require("../utils/catchAsyncErr");
const generateJwt = require("../utils/sendToken");



//Secret key for token creation
const secret = process.env.JWT_SECRET;

// User signup
exports.signupUser = asyncHandler(async(req,res)=>{
    const user = req.body;
  
    //find if already exist

    const isExist = await User.findOne({ username: user.username });

    if (isExist) {
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }

    //store into db
    const newUser = new User(user);
    newUser.save();

    //create Jwt token

    const token = generateJwt(user.username, { role: "user" }, secret);

    //send resp

    return res.status(201).json({
      success: true,
      message: "Sign up successfull.",
      token,
    });
})


//User Login
exports.loginUser = asyncHandler(async(req,res)=>{
    const { username, password } = req.headers;
  
    const isUser = await User.findOne({ username, password });

    if (!isUser) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    // generate jwt token

    const token = generateJwt(username, { role: "user" }, secret);

    //resp

    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
    });
})


//Purchase a course
exports.purchaseCourse = asyncHandler(async(req,res)=>{
    const user = await User.findOne({ username: req.user.username });
    const course = await Course.findById(req.params.courseId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found!",
      });
    }

    //check the purchased array
    //now fill the array with that course object that is basically buying a course by the user.
    user.purchasedCourses.push(course);
    await user.save();

    //resp
    res.status(200).json({
      success: true,
      message: "Course purchased successfully.",
    });
})


//Get all purchase courses

exports.getPurchasedCourses = asyncHandler(async(req,res)=>{
    const user = await User.findOne({ username: req.user.username }).populate(
        "purchasedCourses"
      );
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found!",
        });
      }
  
      if (user.purchasedCourses.length === 0) {
        return res.status(200).json({
          success: true, // Fix this success flag
          message: "No courses purchased till now!",
        });
      }
  
      // Respond with populated course details
      res.status(200).json({
        success: true,
        message: "Purchased Courses:",
        courses: user.purchasedCourses,
      });
})


//Get user profile

exports.getUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findOne({ username: req.user.username });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "You are not authorized.",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
})
  





