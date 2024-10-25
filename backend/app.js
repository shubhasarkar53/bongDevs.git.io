// Necessary Imports
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const cors = require("cors");

//Route Imports
const adminRoutes = require("./routes/adminRoute");
const userRoutes = require("./routes/userRoute");
const adminUserCommonRoutes = require("./routes/adminUserCommonRoute");

//Most important variables
const app = express();
const port = process.env.PORT;

//Corse Integration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true, // Allow cookies and headers if you're using them
  })
);

// Global Middlewares
app.use(express.json());
app.use(cookieParser());

// Use the admin routes
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin-user", adminUserCommonRoutes);


//Global Error Handling middlware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error stack to the console

  // Send JSON response with error details
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});


// connect db
mongoose
  .connect(process.env.DB_URL, {})
  .then(() => {
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
    console.log("Database sucessfully connected");
  })
  .catch((err) => {
    console.log(err);
  });


