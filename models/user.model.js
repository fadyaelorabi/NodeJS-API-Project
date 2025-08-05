const mongoose = require("mongoose");
const validator = require("validator");
const userRoles = require("../enums/userRoles");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Invalid email"],
  },
  password: { type: String, required: true },
  token: { type: String },
  role: {
    type: String,
    enum: [userRoles.USER, userRoles.ADMIN, userRoles.MANAGER],
    default: userRoles.USER,
  },
  createdAt: { type: Date, default: Date.now },
  avatar: {
    type: String,
    default: 'uploads/profile.png'
  }
});
module.exports = mongoose.model("User", userSchema);
