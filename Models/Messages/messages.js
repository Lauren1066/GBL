const mongoose = require("mongoose");

const messages = mongoose.Schema({
  memberID: String,
  messages: {
    default: 0,
    type: Number,
  },
});
module.exports = mongoose.model("messages", messages);
