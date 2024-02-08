const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  conversationID: { type: Schema.Types.ObjectId, ref: "conversation" },
  senderID: { type: Schema.Types.ObjectId, ref: "user" },
  message: {
    type: Schema.Types.String,
  },
  userBookId: { type: Schema.Types.ObjectId, ref: "userBooks" },
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;