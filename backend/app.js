require("dotenv").config();
const express = require("express");

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const asyncHandler = require("./utils/catchAsyncErr");
const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true, // Allow cookies and headers if you're using them
  })
);

app.use(express.json());

//creating schemas
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  cratedAt: {
    type: String,
    default: Date.now(),
  },
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
  cratedAt: {
    type: String,
    default: Date.now(),
  },
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

// Define mongoose models
const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);

//Secret key for token creation

const secret = process.env.JWT_SECRET;

//Function to create JWT token

function generateJwt(username, personRole, SECRET) {
  const token = jwt.sign(
    {
      username: username,
      role: personRole.role,
    },
    SECRET,
    { expiresIn: "1h" }
  );

  return token;
}

//middleware to authenticate incoming user

function authUser(...userRoles) {
  return function (req, res, next) {
    //take the token from auth header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(400).json({
        succes: false,
        message: "Auth not found.",
      });
    }

    //extact token from it
    const token = authHeader.split(" ")[1];
    // verify it using verify jwt function
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        return res.status(400).json({
          succes: false,
          err: err.message,
        });
      }

      //if user exist then check for role
      if (!userRoles.includes(decoded.role)) {
        return res.status(401).json({
          succes: false,
          message: "You are not authorized to access this resource.",
        });
      }
      // if person is eligible to see the resourse call next()
      req.user = decoded;
      next();
    });
  };
}

// connect db
mongoose
  .connect(process.env.DB_URL, {})
  .then(() => console.log("Database sucessfully connected"));

//admin signup 🍏

app.post(
  "/admin/signup",
  asyncHandler(async (req, res) => {
    const admin = req.body;

    //check if already exist

    const isExist = await Admin.findOne({ username: admin.username });

    if (isExist) {
      return res.status(400).json({
        success: false,
        message: "You are already an admin!",
      });
    }

    //store into db
    const newAdmin = new Admin(admin);
    newAdmin.save();

    // generate JWT token

    const token = generateJwt(admin.username, { role: "admin" }, secret);

    if (token) {
      return res.status(201).json({
        success: true,
        message: "Signup Successful",
        token,
      });
    }
  })
);

//admin login 🍏

app.post(
  "/admin/login",
  asyncHandler(async (req, res) => {
    const { username, password } = req.headers;

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

    //response

    if (token) {
      return res.status(200).json({
        succes: true,
        message: "Login successful",
        token,
      });
    }
  })
);

//create a new course 🍏

app.post(
  "/admin/courses",
  authUser("admin"),
  asyncHandler(async (req, res) => {
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
);

//edit an existing course 🍏

app.put(
  "/admin/courses/:courseId",
  authUser("admin"),
  asyncHandler(async (req, res) => {
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
);

//view all courses 🍏
app.get(
  "/admin/courses",
  authUser("admin"),
  asyncHandler(async (req, res) => {
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
);

//view course details 🍏

app.get(
  "/courses/:courseId",
  authUser("admin", "user"),
  asyncHandler(async (req, res) => {
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
);

//delete a  course 🍏
app.delete(
  "/admin/courses/:courseId",
  authUser("admin"),
  asyncHandler(async (req, res) => {
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
);
// get all the users
app.get(
  "/admin/users",
  authUser("admin"),
  asyncHandler(async (req, res) => {
    //get everthing from Course
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
);

// get user's specific details
app.get(
  "/admin/users/:userId",
  authUser("admin"),
  asyncHandler(async (req, res) => {
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
);

//delete a user
app.delete(
  "/admin/users/:userId",
  authUser("admin"),
  asyncHandler(async (req, res) => {
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
);

//user signup   🍏
app.post(
  "/users/signup",
  asyncHandler(async (req, res) => {
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
);

//user login 🍏
app.post(
  "/users/login",
  asyncHandler(async (req, res) => {
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
);

//buy a course 🍏
app.post(
  "/users/courses/:courseId",
  authUser("user"),
  asyncHandler(async (req, res) => {
    //find the user that is requesting

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
);

//see all the bought courses 🍏

app.get(
  "/users/courses/purchased",
  authUser("user"),
  asyncHandler(async (req, res) => {
    // Find the user that is requesting
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
);

//see all published courses 🍏
app.get(
  "/users/courses",
  authUser("user", "admin"),
  asyncHandler(async (req, res) => {
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
);

//admin profile 🍏
app.get(
  "/admin/profile",
  authUser("admin"),
  asyncHandler(async (req, res) => {
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
);

//user profile 🍏
app.get(
  "/users/profile",
  authUser("user"),
  asyncHandler(async (req, res) => {
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
);


//global middlware to accept the errors
app.use((err, req, res, next) => {
  console.error(err.stack);  // Log error stack to the console

  // Send JSON response with error details
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
