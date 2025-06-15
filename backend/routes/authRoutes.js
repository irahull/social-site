const {
  register,
  verifyOtp,
  resendOtp,
  login,
  forgetPassword,
  resetPassword,
} = require("../controllers/authController");
const verifyToken = require("../middleware/verifyToken");

const router = require("express").Router();

// ________________________ AUTH ROUTES __________________________
router.post("/signup", register);
router.post("/login", login);
router.post("/verify", verifyToken, verifyOtp);
router.post("/resend-otp", verifyToken, resendOtp);
router.post("/reset-password", resetPassword);
router.post("/forget-password", forgetPassword);

module.exports = router;