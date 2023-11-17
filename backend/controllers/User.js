const User = require("../models/User");

module.exports.getAllUsers = async (req , res) => {
    try {
        const users = await User.find();

        return res.status(200).json({
            success : false,
            message : "Users fetched succuessfully !",
            users
        })

    } catch (error) {
        console.log(error, "error");
        res.status(401).json({
          success: false,
          message: "Unable to fetch users , please try again",
        });
    }
}