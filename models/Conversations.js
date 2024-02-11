const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationsSchema = new Schema({
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});

const Conversation = mongoose.model("Conversation", conversationsSchema);

module.exports = Conversation;
