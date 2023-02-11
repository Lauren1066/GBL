const { xp } = require("../../Functions/xp.js");
const constantsFile = require("../../Storage/constants.js");
const messageModel = require("../../Models/Messages/messages.js");

module.exports = {
  name: "messageCreate",
  once: false,
  async execute(message) {
    if (message.author.bot) return;

    if (message.content.includes("<@248170429544529920>")) {
      message.reply("Hey fuck off");
    }

    if (message.channel.type === 0 && message.guild.id == constantsFile.mainServerID) {
      xp(message);

      const data = await messageModel.findOne({
        memberID: message.author.id,
      });
      if (data) {
        data.messages++;
        data.save();
      } else if (!data) {
        let newData = new messageModel({
          memberID: message.author.id,
          messages: 1,
        });
        newData.save();
      }
    }
  },
};
