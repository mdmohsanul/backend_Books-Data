const mongoose = require("mongoose");

const BooksSchema = new mongoose.Schema({
  title: String,
  author: String,
  publishedYear: Number,
  genre: [{ type: String }],
  language: String,
  country: String,
  rating: Number,
  summary: String,
  coverImageUrl: String,
});

const Books = mongoose.model("Books", BooksSchema);
module.exports = Books;
