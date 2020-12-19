const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BooksSchema = new Schema({
  id: {
    type: String,
  },
  title: {
    type: String,
  },
  authors: {
    type: Array,
  },
  description: {
    type: String,
  },
  link: {
    type: String,
  },
  image: {
    type: String,
  },
});

const Book = mongoose.model("Book", BooksSchema);

module.exports = Book;
