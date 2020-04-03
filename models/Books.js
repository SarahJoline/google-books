const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  id: {
    type: String
  },
  title: {
    type: String
  },
  authors: {
    type: Array
  },
  description: {
    type: String
  },
  link: {
    type: String
  },
  image: {
    type: String
  }
});

const Books = mongoose.model("Books", BookSchema);

module.exports = Books;
