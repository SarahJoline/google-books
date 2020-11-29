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
  // to borrow = 1, to lend =0
  intent: {
    type: String,
  },
});

const Books = mongoose.model("Books", BooksSchema);

module.exports = Books;
