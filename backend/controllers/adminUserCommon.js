const Course = require("../Models/Course");
const asyncHandler = require("../utils/catchAsyncErr");

exports.getCourseDetails = asyncHandler(async(req,res)=>{
    const id = req.params.courseId;
  
    //check if course is valid
    const isValidCourse = await Course.findById(id);

    if (isValidCourse) {
      const course = await Course.findById(id);

      //resp
      return res.status(200).json({
        success: true,
        message: "Course details below -",
        course,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Course ID is invalid",
      });
    }
})


exports.getAllPublishedCourses = asyncHandler(async(req,res)=>{
  const publishedCourses = await Course.find({ published: true });

  if (!publishedCourses) {
    return res.status(200).json({
      success: true,
      message: "No courses are published yet!",
    });
  }
  //resp
  return res.status(200).json({
    success: true,
    message: "All the published Courses :",
    courses: publishedCourses,
  });
})




