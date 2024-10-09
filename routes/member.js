const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const roles = ["Librarian", "Member"];
const bcrypt = require("bcryptjs");
const authentication = require("../middleware/auth");
async function getAllMembers(req, res) {
  try {
    const allMembers = await User.find({ role: "Member" }).select("-password");
    res.json(allMembers);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
}

async function addMembers(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "please provide username and password." });
    }
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "Users already exist" });
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
    return;
  }
}
async function deleteMembers(req, res) {
  try {
    let user = await User.findById(req.params.id);

    if (!user || user.role !== "Member") {
      return res.status(404).json({ message: "Users not found" });
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
    return
  }
}
async function viewHistory(req, res) {
  try {
    let user = await User.findById(req.body.user_id).populate("borrowedbooks");

    if (!user) {
      return res.status(404).json({ meassage: "user not found" });
    }

    res.json({ user: user });
  } catch (error) {
    console.log(error);
    return
  }
}

async function deleteAccount(req, res) {
  try {
    const user_id = req.body.user_id;

    let user = await User.findById(user_id);

    if (!user) {
      return res.status(404).json({ meassage: "user not found" });
    }
    user.isactive = false;
    await user.save();
    res.json({ message: "user deleted successfully" });
  } catch (error) {
    console.log(error);
    return
  }
}

async function fetchHistory(req, res) {
  try {
    let history = [];
    const allHistory = await User.find({}).populate("borrowedbooks");
    if (!allHistory) {
      return res.status(404).json({ meassage: "history not found" });
    }
    for (let i = 0; i < allHistory.length; i++) {
      const element = allHistory[i].borrowedbooks;
      if (element && element.length) {
        history.push(element);
      }
    }
    res.json(history.flat());
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
}
router.post("/add-new-mebers", authentication("Librarian"), addMembers);
router.get("/get-all-mebers", getAllMembers);
router.delete("/delete/:id", authentication("Librarian"), deleteMembers);
router.put("/update/:id", authentication("Librarian"), updateAmember);
router.post("/history", authentication("Member"), viewHistory);
router.post("/delete/account", authentication("Member"), deleteAccount);
router.get("/hsitory", fetchHistory);
module.exports = router;
