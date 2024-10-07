const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      bookstatuses: ["Available", "Borrowed"],
      default:"Available"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", UserSchema);
