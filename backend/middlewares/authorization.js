const jwt = require("jsonwebtoken");
const UserModel = require("../models/user-model");

const authorize = async (req, res, next) => {
  try {
    // retrieving the authorization header
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({ Error: "Please register / login first" });
    }

    // extracting the token
    const token = authHeader.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ Error: "Please register / login first" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await UserModel.findById({ _id: decoded.id }, { password: 0 });

    req.user = user;
    next();
  } catch (error) {
    console.error("Error occured in middleware", error);
    return res.status(400).json({ Error: "Some Error Occured!" });
  }
};

module.exports = authorize;
