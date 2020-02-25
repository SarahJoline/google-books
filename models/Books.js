const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {
    type: String,
    trim: true
  },
  author: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  link: {
    type: String,
    trim: true
  }
});

const Books = mongoose.model("Books", BookSchema);

module.exports = Books;
