const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    // required: true,
  },
  date: {
    type: String,
    required: false,
  },
  technology: {
    type: String,
    required: false,
  },
  experience: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: false,
  },
  courseList: {
    type: String,
    required: false,
  },
  photo: {
    type: String,
    required: false,
  },
});

// jwt

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        username: this.username,
        mobile: this.mobile,
        technology: this.technology,
        experience: this.experience,
        type: this.type,
        branch: this.branch,
        courseList: this.courseList,
        photo: this.photo,
      },
      "yourSecretKey123", // Secret key
      {
        expiresIn: "1d", // Token expiry time
      }
    );
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Error generating token");
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;