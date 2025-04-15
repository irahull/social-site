const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Token not found" });

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const currentUser = await User.findById(decodedToken.id);
    if (!currentUser) {
      return res
        .status(401)
        .json({ message: "this token deos not belong to your account" });
    }
    req.user = currentUser;
    next()
  } catch (error) {
    console.log(error);
  }
};

module.exports = verifyToken;
