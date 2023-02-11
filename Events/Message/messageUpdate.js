const { EmbedBuilder } = require("discord.js");
const constantsfile = require("../../Storage/constants.js");

module.exports = {
  name: "messageUpdate",
  once: false,
  async execute(oldMessage, newMessage) {
    if (oldMessage.guild.id == constantsfile.mainServerID) {
      var logsChannel = await oldMessage.guild.channels.fetch(constantsfile.mainLogsChannel);
    } else if (oldMessage.guild.id == constantsfile.ambulanceServerID) {
      var logsChannel = await oldMessage.guild.channels.fetch(constantsfile.ambulanceLogsChannel);
    } else if (oldMessage.guild.id == constantsfile.fireServerID) {
      var logsChannel = await oldMessage.guild.channels.fetch(constantsfile.fireLogsChannel);
    } else if (oldMessage.guild.id == constantsfile.policeServerID) {
      var logsChannel = await oldMessage.guild.channels.fetch(constantsfile.policeLogsChannel);
    }

    const embed = new EmbedBuilder()
      .setTitle("Message Edited")
      .addFields(
        { name: "Channel:", value: `<#${oldMessage.channel.id}>` },
        { name: "Original Message:", value: oldMessage.content },
        { name: "New Message:", value: newMessage.content },
        { name: "User:", value: oldMessage.author.tag }
      )
      .setColor("#EC7063");
    logsChannel.send({ embeds: [embed] });
  },
};
