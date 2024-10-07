const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const roles = ["Librarian", "Member"];
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
    console.log(req.params.id, "req.params.idreq.params.idreq.params.id");

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
    console.log(req.params.id, "kkkkkkkkkkkkkk");

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
    console.log(book, "bookbookbook");

    await book.save();
    res.json({ meassage: "Book Updated successfully" });
  } catch (error) {
    console.log(error);
  }
}
router.get("/getbooks", getBooks);
router.post("/generatebooks", generateBooks);
router.delete("/deletebook/:id", deleteBooks);
router.put("/updatebook/:id", updateBooks);
module.exports = router;
