const { EmbedBuilder } = require("discord.js");
const constantsfile = require("../../Storage/constants.js");

module.exports = {
  name: "messageUpdate",
  once: false,
  async execute(oldMessage, newMessage) {
    const logsChannel = await oldMessage.guild.channels.fetch(constantsfile.logsChannel);
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
