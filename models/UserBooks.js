const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserBooksSchema = new Schema({
  lenderID: { type: Schema.Types.ObjectId, ref: "user" },
  borrowerID: { type: Schema.Types.ObjectId, ref: "user", default: null },
  bookID: { type: Schema.Types.ObjectId, ref: "book" },
});

const UserBook = mongoose.model("UserBook", UserBooksSchema);

module.exports = UserBook;
