const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const authentication = (roles = []) => {
  if (typeof roles === "string") {
    roles = [roles];
  }
  return async function (req, res, next) {
    try {
      const token =
        req.header("Authorization") &&
        req.header("Authorization").split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "access denied" });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded._id);
      if (!user) {
        return res.status(400).json({ message: "Invalid token" });
      }
      if (!user.isactive) {
        return res.status(403).json({ message: "User is inactive" });
      }
      req.user = user;
      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ message: "User is forbidden" });
      }
      next();
    } catch (error) {
      res.status(400).json({ message: error });
    }
  };
};


module.exports = authentication;
