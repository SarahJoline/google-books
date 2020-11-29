const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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

const User = mongoose.model("Users", UserSchema);

module.exports = User;
