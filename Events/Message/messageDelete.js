const { EmbedBuilder } = require("discord.js");
const constantsfile = require("../../Storage/constants.js");

module.exports = {
  name: "messageDelete",
  once: false,
  async execute(message) {
    if (message.guild.id == constantsfile.mainServerID) {
      var logsChannel = await message.guild.channels.fetch(constantsfile.mainLogsChannel);
    } else if (message.guild.id == constantsfile.ambulanceServerID) {
      var logsChannel = await message.guild.channels.fetch(constantsfile.ambulanceLogsChannel);
    } else if (message.guild.id == constantsfile.fireServerID) {
      var logsChannel = await message.guild.channels.fetch(constantsfile.fireLogsChannel);
    } else if (message.guild.id == constantsfile.policeServerID) {
      var logsChannel = await message.guild.channels.fetch(constantsfile.policeLogsChannel);
    }

    const embed = new EmbedBuilder()
      .setTitle("Message Deleted")
      .addFields(
        { name: "Channel:", value: `<#${message.channel.id}>` },
        { name: "Message:", value: message.content },
        { name: "User:", value: message.author.tag }
      )
      .setColor("#880808");
    logsChannel.send({ embeds: [embed] });
  },
};
