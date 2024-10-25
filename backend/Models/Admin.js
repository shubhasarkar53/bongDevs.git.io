const mongoose  = require("mongoose");

const adminSchema = new mongoose.Schema({
    username: String,
    password: String,
    cratedAt: {
      type: String,
      default: Date.now(),
    },
  });

  
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;