//Function to create JWT token

const jwt = require("jsonwebtoken");

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

  module.exports = generateJwt;
  