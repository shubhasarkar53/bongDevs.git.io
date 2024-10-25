
const Admin = require("../Models/Admin");
const Course = require("../Models/Course");
const User = require("../Models/User");
const asyncHandler = require("../utils/catchAsyncErr");
const generateJwt = require("../utils/sendToken");
const setToken = require("../utils/setToken");
 // Import your JWT generation utility


//Secret key for token creation
const secret = process.env.JWT_SECRET;


// Admin signup function
exports.signupAdmin = asyncHandler(async (req, res) => {
  const admin = req.body;

  // Check if admin already exists
  const isExist = await Admin.findOne({ username: admin.username });

  if (isExist) {
    return res.status(400).json({
      success: false,
      message: "You are already an admin!",
    });
  }

  // Store the new admin in the database
  const newAdmin = new Admin(admin);
  await newAdmin.save();

  // Generate JWT token
  const token = generateJwt(admin.username, { role: "admin" }, secret);

  if(!token){
    return res.status(401).json({
      succes:false,
      message:"Invalid token"
    })
  }

  setToken(res,token);

  if (token) {
    return res.status(201).json({
      success: true,
      message: "Signup Successful",
      token,
    });
  }
});



//Admin login function 
exports.loginAdmin = asyncHandler(async (req,res) =>{
     const { username, password } = req.body; 
    //check if valid admin
    const isValidAdmin = await Admin.findOne({ username, password });

    if (!isValidAdmin) {
      return res.status(401).json({
        succes: false,
        message: "Password or Username is incorrect!",
      });
    }

    //generate jwt token
    const token = generateJwt(username, { role: "admin" }, secret);



    if(!token){
      return res.status(401).json({
        succes:false,
        message:"Invalid token"
      })
    }
  
    setToken(res,token);
    
    //response

    if (token) {
      return res.status(200).json({
        succes: true,
        message: "Login successful",
        token,
      });
    }
})


//Create a course

exports.createCourse = asyncHandler(async(req,res)=>{
    const course = req.body;

    //save course into db
    const newCourse = new Course(course);
    newCourse.save();

    //resp
    return res.status(201).json({
      success: true,
      message: "Course Created Successfully.",
      courseId: newCourse._id,
    });
})


//Edit a course
exports.updateCourse = asyncHandler(async(req,res)=>{
  const id = req.params.courseId;
   //check if course is valid
   const isValidCourse = await Course.findById(id);

   if (isValidCourse) {
     //take updated info from body
     const updatedDetails = req.body;

     const course = await Course.findByIdAndUpdate(id, updatedDetails, {
       new: true,
     });

     if (course) {
       //resp
       return res.status(200).json({
         success: true,
         message: "Course updated Successfully.",
         courseId: course._id,
       });
     }
   } else {
     return res.status(404).json({
       success: false,
       message: "Course ID is invalid",
     });
   }
})


// Get all courses
exports.getCourses = asyncHandler(async(req,res)=>{
  
  const allCourses = await Course.find();

    if (allCourses) {
      return res.status(200).json({
        success: true,
        message: "All The Courses",
        allCourses,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Course are not available currently.",
      });
    }


})


//Delete a course
exports.deleteCourse = asyncHandler(async(req,res)=>{
  const id = req.params.courseId;

  //check if course is valid
  const isValidCourse = await Course.findById(id);

  if (isValidCourse) {
    await Course.findByIdAndDelete(id);

    //resp
    return res.status(200).json({
      success: true,
      message: "Course deleted Successfully.",
    });
  } else {
    return res.status(404).json({
      success: false,
      message: "Course ID is invalid",
    });
  }

})


//Get all the signed up users
exports.getAllUsers = asyncHandler(async(req,res)=>{
  const allUsers = await User.find();

  if (allUsers) {
    return res.status(200).json({
      success: true,
      message: "All The Users -",
      allUsers,
    });
  } else {
    return res.status(404).json({
      success: false,
      message: "Users are not available currently.",
    });
  }

})


// Get user's specific details
exports.getUserDetails = asyncHandler(async(req,res)=>{

  const id = req.params.userId;

    //check if user is valid
    const isValidUser = await User.findById(id);

    if (isValidUser) {
      const user = await User.findById(id);

      //resp
      return res.status(200).json({
        success: true,
        message: "User details below -",
        user,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User ID is invalid",
      });
    }
})


//Delete a user
exports.deleteUser = asyncHandler(async(req,res)=>{

  const id = req.params.userId;

    //check if course is valid
    const isValidUser = await User.findById(id);

    if (isValidUser) {
      await User.findByIdAndDelete(id);

      //resp
      return res.status(200).json({
        success: true,
        message: "User deleted Successfully.",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User ID is invalid",
      });
    }
})


//Get admin profile
exports.getAdminProfile = asyncHandler(async(req,res)=>{
  const admin = await Admin.findOne({ username: req.user.username });
    
        if (!admin) {
          return res.status(404).json({
            success: false,
            message: "You are not authorized.",
          });
        }
    
        res.status(200).json({
          success: true,
          admin,
        });
  })
  











