const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,

      roles: ["Librarian", "Member"],
    },
    borrowedbooks: [
      {
        book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
        boorowedAt: { type: Date, default: Date.now },
        returnedAt: { type: Date },
        title: { type: String },
        username: { type: String },
        borrowedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Member" },
      },
    ],
    isactive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
