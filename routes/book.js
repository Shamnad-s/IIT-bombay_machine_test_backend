const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const roles = ["Librarian", "Member"];
const authentication = require("../middleware/auth");
async function getBooks(req, res) {
  try {
    const books = await Book.find({});
    return res.json(books);
    books;
  } catch (error) {
    console.log(error);
  }
}
async function generateBooks(req, res) {
  try {
    const { title, author } = req.body;
    if (!title || !author) {
      return res.status(400).json({ message: "Enter title and author" });
    }
    try {
      const book = new Book({ title, author });
      await book.save();
      return res.status(201).json(book);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  } catch (error) {
    console.log(error);
  }
}
async function deleteBooks(req, res) {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ meassage: "Book not found" });
    }
    res.json({ meassage: "Book Deleted successfully" });
  } catch (error) {
    console.log(error);
  }
}
async function updateBooks(req, res) {
  const { title, author, status } = req.body;
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ meassage: "Book not found" });
    }
    if (title) {
      book.title = title;
    }
    if (author) {
      book.author = author;
    }
    if (status) {
      book.status = status;
    }

    await book.save();
    res.json({ meassage: "Book Updated successfully" });
  } catch (error) {
    console.log(error);
  }
}
async function borrowOrReturnBooks(req, res) {
  const { status, user_id, title, username } = req.body;

  try {
    let book = await Book.findById(req.params.id);
    let user = await User.findById({ _id: user_id });

    if (!book) {
      return res.status(404).json({ meassage: "Book not found" });
    }
    if (book && status == "Borrowed") {
      book.status = "Borrowed";
      const existing_book = user.borrowedbooks.find((ele) => {
        return ele.book.toString() == book._id.toString();
      });
      if (existing_book) {
        existing_book.boorowedAt = new Date();
        existing_book.returnedAt = null;
      } else {
        user.borrowedbooks.push({
          boorowedAt: new Date(),
          book: book._id,
          title: title,
          username: username,
          borrowedBy: user_id,
        });
      }

      await user.save();
      await book.save();
    } else {
      const borrowed_book = user.borrowedbooks.find((ele) => {
        return ele.book.toString() == book._id.toString();
      });
      if (borrowed_book) {
        // if(borrowed_book.borrowedBy == user_id){
        book.status = "Available";
        borrowed_book.returnedAt = new Date();
        borrowed_book.title = title;
        borrowed_book.username = username;
        borrowed_book.borrowedBy = null;
        await user.save();
        await book.save();
        // }else{
        //   return res.status(400).json({ cannotReturn:true });
        // }
      } else {
        return res.status(400).json({ error: "Book not found." });
      }
    }
    res.json({ meassage: "Book Updated successfully" });
  } catch (error) {
    console.log(error);
  }
}
router.get("/getbooks", getBooks);
router.post("/generatebooks", authentication("Librarian"), generateBooks);
router.delete("/deletebook/:id", authentication("Librarian"), deleteBooks);
router.put("/updatebook/:id", authentication("Librarian"), updateBooks);
router.put(
  "/borrow-or-return/:id",
  authentication("Member"),
  borrowOrReturnBooks
);
module.exports = router;
