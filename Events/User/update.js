const { EmbedBuilder } = require("discord.js");
const constantsfile = require("../../Storage/constants.js");
const { client } = require("../../index.js");

module.exports = {
  name: "userUpdate",
  once: false,
  async execute(oldUser, newUser) {
    if (oldUser.guild.id == constantsfile.mainServerID) {
      var logsChannel = await oldUser.guild.channels.fetch(constantsfile.mainLogsChannel);
    } else if (oldUser.guild.id == constantsfile.ambulanceServerID) {
      var logsChannel = await oldUser.guild.channels.fetch(constantsfile.ambulanceLogsChannel);
    } else if (oldUser.guild.id == constantsfile.fireServerID) {
      var logsChannel = await oldUser.guild.channels.fetch(constantsfile.fireLogsChannel);
    } else if (oldUser.guild.id == constantsfile.policeServerID) {
      var logsChannel = await oldUser.guild.channels.fetch(constantsfile.policeLogsChannel);
    }

    if (oldUser.username != newUser.username) {
      const embed = new EmbedBuilder()
        .setTitle("Username Edited")
        .addFields({ name: "Original Name:", value: oldUser.username }, { name: "New Name:", value: newUser.username })
        .setColor("#2980B9  ");
      logsChannel.send({ embeds: [embed] });
    }
  },
};
