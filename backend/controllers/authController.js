const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const generateOtp = require("../utils/generateOtp");
const hbs = require("hbs");
const path = require("path");
const fs = require("fs");
const sendMail = require("../utils/sendMail");

const loadTemplate = (templateName, replacement) => {
  const templatePath = path.join(__dirname, "../templates", templateName);
  const source = fs.readFileSync(templatePath, "utf-8");
  const template = hbs.compile(source);
  return template(replacement);
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const responseWithTokenAndCookie = (user, statusCode, res, message) => {
  const token = generateToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() +
        Number(process.env.JWT_COOKIE_EXPIRE_IN) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
  };

  res.cookie("token", token, cookieOptions);
  user.password = undefined;
  user.otp = undefined;
  res.status(statusCode).json({
    status: "success",
    message,
    token,
    data: { user },
  });
};
// _____________________________ REGISTER USER __________________________
const register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, bio, profilePicture } =
      req.body;

    //   _______________________Check User Exits_______________________________
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ msg: "User Already Exits" });
    }

    const otp = generateOtp();
    const otpExpires = Date.now() + 24 * 60 * 60 * 1000;

    const newUser = await User.create({
      username,
      email,
      password,
      confirmPassword,
      bio,
      profilePicture,
      otp,
      otpExpires,
    });

    const htmlTemplate = loadTemplate("otpTemplate.hbs", {
      title: "OTP Verification",
      username: newUser.username,
      otp,
      message: "Your one time password (OTP) for account verification is : ",
    });
    try {
      await sendMail({
        email: newUser.email,
        subject: "OTP for Email Verification",
        html: htmlTemplate,
      });

      responseWithTokenAndCookie(
        newUser,
        200,
        res,
        "User Created Successfully"
      );
    } catch (error) {
      await User.findByIdAndDelete(newUser._id);
      res.status(400).json({ msg: error.message });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
    console.log(error);
  }
};

// ______________________________________ VERIFY USER ________________________________

const verifyOtp = async (req, res) => {
  const { otp } = req.body;
  if (!otp)
    return res.status(400).json({ success: false, message: "OTP not found" });

  const user = req.user;

  if (user.otp !== otp)
    return res.status(400).json({ success: false, message: "Incorrect OTP" });
  if (Date.now() > user.otpExpires)
    return res
      .status(400)
      .json({ success: false, message: "OTP is Expires, Request New One" });
  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save({ validateBeforeSave: false });

  responseWithTokenAndCookie(user, 200, res, "User verified successfully");
};

// ___________________________ RESEND OTP _____________________________
const resendOtp = async (req, res) => {
  const { email } = req.user;
  if (!email)
    return res.status(400).json({ success: false, message: "Email not found" });

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ success: false, message: "user not found" });
  }
  if (user.isVerified) {
    return res
      .status(400)
      .json({ success: false, message: "This account is already verified" });
  }

  const newOtp = generateOtp();
  const otpExpires = Date.now() + 24 * 60 * 60 * 1000;

  user.otp = newOtp;
  user.otpExpires = otpExpires;
  await user.save({ validateBeforeSave: false });

  const htmlTemplate = loadTemplate("otpTemplate.hbs", {
    title: "OTP Verification",
    username: user.username,
    newOtp,
    message: "Your one time password (OTP) for account verification is : ",
  });

  try {
    await sendMail({
      email: user.email,
      subject: "Resend OTP for Email Verification",
      html: htmlTemplate,
    });

    res
      .status(200)
      .json({ success: true, message: "New OTP is sent to your email" });
  } catch (error) {
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(400).json({ msg: error.message });
  }
};

module.exports = { register, verifyOtp, resendOtp };
