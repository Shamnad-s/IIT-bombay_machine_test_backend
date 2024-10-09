const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema(
  {
    title: {
      type: String,
     
    },
    author: {
      type: String,
     
    },
    status: {
      type: String,
     
      bookstatuses: ["Available", "Borrowed"],
      default:"Available"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", UserSchema);
