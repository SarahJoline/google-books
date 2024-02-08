const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  participants: {
    type: Array,
  },
});

const Conversation = mongoose.model("Conversation", ConversationSchema);

module.exports = Conversation;
