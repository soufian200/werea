const mongoose = require("mongoose");

const Book = mongoose.model(
  "Book",
  new mongoose.Schema({
    title: String,
    cover: String,
    pdfPath: String,
    rate: String,
    author: String,
    pages: String,
    year: String,
    language: String,
    category: String,
    type: String,
    size: Number,
    description: String,
    dateCreated: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: false },
  })
);

module.exports = Book;
