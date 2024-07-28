const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../Model/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SERVER);

      req.user = await User.findById(decode.user.id).select("-password");

      next();
    } catch (error) {
      res
        .status(400)
        .json({ Status: "INVALID", message: "Not authorized mission failed" });
    }
  }
  if (!token) {
    res
      .status(400)
      .json({ Status: "INVALID", message: "token not send by user" });
  }
});
module.exports = { protect };
