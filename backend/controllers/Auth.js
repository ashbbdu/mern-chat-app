const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config()
module.exports.registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password ,file } = req.body;
    // console.log("pic from ui" , file)   
    // console.log(name, "name");
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details !",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
     return res.status(400).json({
        success: false,
        message: "User already exist !",
      });
    }

    const hashedPassword = await bcrypt.hash(password , 10)

      // Upload the Thumbnail to Cloudinary
    //   const profileImg = await uploadImageToCloudinary(
    //     file,
    //     process.env.FOLDER_NAME
    //   )

    const user = await User.create({
      name,
      email,
      password : hashedPassword,
    //   pic : profileImg.secure_url,
          // confirmPassword,
    });

    user.password = undefined;
    // user.pic = profileImg.secure_url

   return res.status(200).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.log(error, "rror");
    res.status(401).json({
      success: false,
      message: "Unable to create user , please try again",
    });
  }
});


 module.exports.login = async (req , res) => {
        try {
            const {email , password} = req.body;
            if (!email || !password) {
                return res.status(400).json({
                  success: false,
                  message: "Please fill all the details !",
                });
              }

            const user = await User.findOne({email});
            if(!user) {
                return res.status(400).json({
                    success: false,
                    message: "User does not exist",
                  });
            }

            const payload = {
                id: user._id,
                email: user.email,
                name: user.name,
              };
          
              if (await bcrypt.compare(password, user.password)) {
                let token = jwt.sign(payload, process.env.JWT_SECRET, {
                  expiresIn: "24h",
                });
                user.token = token;
                user.password = undefined;
          
                
                const options = {
                  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                  httpOnly: true,
                };
                res.cookie("token", token, options).status(200).json({
                  success: true,
                  token,
                  user,
                  message: "User Logged in successfully",
                });
              } else {
                return res.status(400).json({
                  success: false,
                  message: "Incorrenct Password",
                });
              }


        } catch (error) {
            console.log(error, "error");
            res.status(401).json({
              success: false,
              message: "Unable to login , please try again",
            });
          }
    }
