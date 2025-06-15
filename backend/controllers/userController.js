const User = require("../models/userModel");
const { uploadFile } = require("../utils/cloudinary");
const getDataUri = require("../utils/dataUri");

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

const editProfile = async (req, res) => {
  const userId = req.user.id;
  const profilePicture = req.file;
  const parseData = JSON.parse(req.body.data);
  const { bio, ...data } = parseData;

  let cloudResponse;

  try {
    if (profilePicture) {
      const file = getDataUri(profilePicture);
      cloudResponse = await uploadFile(file);
    }

    const user = await User.findById(userId).select("-password");

    if (!user) return res.status(404).json({ message: "User Not Found" });

    if (bio) user.bio = bio;
    if (profilePicture) user.profilePicture = cloudResponse?.secure_url;
    await user.save({ validateBeforeSave: false });
    return res.status(200).json({
      message: "User updated successfull",
      status: "success",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getProfile, getAllUser, editProfile };
