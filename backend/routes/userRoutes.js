const {
  register,
  verifyOtp,
  resendOtp,
  login,
  forgetPassword,
  resetPassword,
} = require("../controllers/authController");
const { getProfile, getAllUser } = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");

const router = require("express").Router();

// ________________________ AUTH ROUTES __________________________
router.post("/signup", register);
router.post("/login", login);
router.post("/verify", verifyToken, verifyOtp);
router.post("/resend-otp", verifyToken, resendOtp);
router.post("/reset-password", resetPassword);
router.post("/forget-password", forgetPassword);

// _________________________ USER ROUTES _______________________________
router.get("/all", getAllUser);
router.get("/profile/:id", getProfile);

module.exports = router;
