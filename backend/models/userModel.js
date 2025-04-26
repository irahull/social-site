const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add username"],
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
      index: true,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 8,
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "Please provide confirm password"],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "Password are not same",
      },
    },
    profilePicture: { type: String },
    bio: { type: String },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    isVerified: { type: Boolean, default: false },
    otp: { type: String, default: null },
    otpExpires: { type: Date, default: null },
    resetPasswordOTP: { type: String, default: null },
    resetPasswordOTPExpires: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.comparePassword = async function (password) {
  console.log(password, "PASS");
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
