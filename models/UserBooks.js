const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserBooksSchema = new Schema({
  lenderID: { type: Schema.Types.ObjectId, ref: "User" },
  borrowerID: { type: Schema.Types.ObjectId, ref: "User", default: null },
  bookID: { type: Schema.Types.ObjectId, ref: "Book" },
});

const UserBook = mongoose.model("UserBook", UserBooksSchema);

module.exports = UserBook;
