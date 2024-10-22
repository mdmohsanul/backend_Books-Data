const mongoose = require("mongoose");

const BooksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  publishedYear: {
    type: String,
  },
  genre: [{ type: String }],
  language: {
    type: String,
  },
  country: {
    type: String,
  },
  rating: {
    type: String,
  },
  summary: {
    type: String,
  },
  coverImageUrl: {
    type: String,
  },
});

const Books = mongoose.model("Books", BooksSchema);
module.exports = Books;
