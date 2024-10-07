const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const roles = ["Librarian", "Member"];
const bcrypt = require("bcryptjs");
async function signupUser(req, res) {
  const { username, password, role } = req.body;
  console.log(req.body);

  if (!username || !password || !role) {
    let resp = {
      message: "please provide username passworn and name",
    };
    return res.status(400).json(resp);
  }
  if (!roles.includes(role)) {
    let resp = {
      message: "Role must be either librarien or member",
    };
    return res.status(400).json(resp);
  }
  try {
    let user = await User.findOne({ username });
    console.log(user, "kkkkkkkkk");

    if (user) {
      let resp = {
        message: "Usernmae already exists",
      };
      return res.status(400).json(resp);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ username, password: hashedPassword, role });
    await user.save();
    const payload = { _id: user._id, role: user.role };
    const token = jwt.sign(payload, "secre_key", { expiresIn: "1h" });
    res.status(201).json({ token, username });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "server error" });
  }
}
async function loginUser(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    let resp = {
      message: "please provide username passworn and name",
    };
    return res.status(400).json(resp);
  }

  try {
    let user = await User.findOne({ username });

    if (!user || !user.isactive) {
      let resp = {
        message: "Invalid credentials",
      };
      return res.status(400).json(resp);
    }
    const isSamePassword = await bcrypt.compare(password, user.password);
    if (!isSamePassword) {
      let resp = {
        message: "Invalid credentials",
      };
      return res.status(400).json(resp);
    }
    const payload = { _id: user._id, role: user.role };
    const token = jwt.sign(payload, "secre_key", { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "server error" });
  }
}
router.post("/signup", signupUser);
router.post("/login", loginUser);
module.exports = router;
