const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const accessToken = (user) => {
  return jwt.sign(
    {
      user: {
        email: user.email,
        id: user._id,
      },
    },
    process.env.ACCESS_TOKEN_SERVER,
    { expiresIn: "15d" }
  );
};
const registerUser = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;
  const userExists = await User.findOne({ userName });
  if (userExists) {
    return res
      .status(400)
      .json({ Status: "INVALID", message: "User already exists" });
  }
  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      const user = new User({
        userName,
        password: hashedPassword,
      });
      user
        .save()
        .then((result) => {
          res
            .status(200)
            .json({ Status: "SUCCESS", message: "saved", data: result });
        })
        .catch((err) => {
          res.status(400).json({
            Status: "INVALID",
            message: "error in saveing the folder",
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .json({ Status: "INVALID", message: "Error in bcrypt Hash" });
    });
});
const authUser = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;
  //   console.log(user.password);
  if (!userName || !password) {
    res.status(400).json({ Status: "INVALID", message: "error in body" });
  }

  User.findOne({ userName })
    .then((user) => {
      bcrypt
        .compare(password, user.password)
        .then((result) => {
          if (result) {
            const token = accessToken(user);
            if (token) {
              res.status(200).json({
                Status: "SUCCESS",
                message: "success",
                data: {
                  _id: user._id,
                  name: user.userName,
                  token: token,
                },
              });
            } else {
              res
                .status(400)
                .json({ Status: "INVALID", message: "token dont get" });
            }
          } else {
            res
              .status(400)
              .json({ Status: "INVALID", message: "password i swrong" });
          }
        })
        .catch((err) => {
          res.status(400).json({
            Status: "INVALID",
            message: "error in comparing the password",
          });
        });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ Status: "INVALID", message: "you did't register" });
    });
});
module.exports = { registerUser, authUser };
