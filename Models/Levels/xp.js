const mongoose = require("mongoose");

const exp = mongoose.Schema({
  memberID: String,
  xp: Number,
  guildID: String,
  level: Number,
  lastXP: Date,
});
module.exports = mongoose.model("exp", exp);
