//middleware to authenticate incoming user

const jwt = require("jsonwebtoken");
//Secret key for token creation
const secret = process.env.JWT_SECRET;

function authUser(...userRoles) {
    return function (req, res, next) {
      //take the token from auth header
      const token = req.cookies.authorization;
    
      if (!token) {
        return res.status(400).json({
          succes: false,
          message: "Auth not found.",
        });
      }
  
      //extact token from it
      // const token = authHeader.split(" ")[1];
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
  

  module.exports = authUser;