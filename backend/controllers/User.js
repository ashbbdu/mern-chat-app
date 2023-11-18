const User = require("../models/User");

module.exports.getAllUsers = async (req, res) => {
  try {
    const { email, name } = req.query;

    console.log(email, name, "keyword");
    if (email || name) {
      const users = await User.find({ $or: [{ name }, { email }] });
      return res.status(200).json({
        success: true,
        message: "Users fetched succuessfully !",
        users,
      });
    } else {
      const users = await User.find();
        return res.status(200).json({
        success: false,
        message: "Users fetched succuessfully !",
        users,
      });
    }
  } catch (error) {
    console.log(error, "error");
    res.status(401).json({
      success: false,
      message: "Unable to fetch users , please try again",
    });
  }
};
