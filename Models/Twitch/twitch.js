const mongoose = require("mongoose");

const twitches = mongoose.Schema({
  username: String,
  guildID: String,
  channelID: String,
  live: false,
});
module.exports = mongoose.model("twitches", twitches);
