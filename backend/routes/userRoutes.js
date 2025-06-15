const { getProfile, getAllUser } = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");

const router = require("express").Router();

// _________________________ USER ROUTES _______________________________
router.get("/all",  getAllUser);
router.get("/profile/:id", verifyToken, getProfile);

module.exports = router;
