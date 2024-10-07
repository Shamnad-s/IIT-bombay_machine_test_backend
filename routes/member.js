const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const roles = ["Librarian", "Member"];
const bcrypt = require("bcryptjs");
async function getAllMembers(req, res) {
  try {
    const allMembers = await User.find({ role: "Member" }).select("-password");
    res.json(allMembers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
}

async function addMembers(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res
        .status(400)
        .json({ message: "please provide username and password." });
    }
    let user = await User.findOne({ username });
    if (user) {
      res.status(400).json({ message: "Users already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ username, password: hashedPassword, role: "Member" });
    await user.save();
    res.status(201).json({
      message: "Member added successfully",
      user: user._id,
      username: user.username,
      role: user.role,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
}
async function deleteMembers(req, res) {
  try {
    let user = await User.findById(req.params.id);
    console.log(user);

    if (!user || user.role !== "Member") {
      res.status(404).json({ message: "Users not found" });
    }
    user.isactive = false;

    await user.save();
    res.status(201).json({ message: "User has been deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
}
async function updateAmember(req, res) {
  const { username, password, isactive } = req.body;
  try {
    console.log(req.params.id, "req.params.idreq.params.idreq.params.id");

    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ meassage: "user not found" });
    }
    if (username) {
      user.username = username;
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    if (typeof isactive == "boolean") {
      user.isactive = isactive;
    }
    user = new User(user);

    await user.save();
    res.json({ meassage: "user updated successfully" });
  } catch (error) {
    console.log(error);
  }
}
router.post("/add-new-mebers", addMembers);
router.get("/get-all-mebers", getAllMembers);
router.delete("/delete/:id", deleteMembers);
router.put("/update/:id", updateAmember);
module.exports = router;
