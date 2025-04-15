const { register, verifyOtp, resendOtp } = require("../controllers/authController");
const verifyToken = require("../middleware/verifyToken");

const router = require("express").Router();

router.post("/register", register);
router.post("/verify", verifyToken, verifyOtp);
router.post("/resend-otp", verifyToken, resendOtp);

module.exports = router;
