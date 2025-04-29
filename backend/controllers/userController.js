const User = require("../models/userModel");

const getAllUser = async (req, res) => {
  try {
    const allUser = await User.find({});

    res.status(200).json({ data: allUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getProfile = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const user = await User.findById(id)
    .select(
      "-password -confirmPassword -otp -otpExpires -resetPasswordOTP -resetPasswordOTPExpires"
    )
    .populate({
      path: "post",
      options: { sort: { createdAt: -1 } },
    })
    .populate({
      path: "savedPost",
      options: { sort: { createdAt: -1 } },
    });

  if (!user) {
    res.status(400).json({ message: "User Not Found" });
  }
  res.status(200).json({ status: "success", data: user });
};

module.exports = { getProfile, getAllUser };
