const { EmbedBuilder } = require("discord.js");
const constantsfile = require("../../Storage/constants.js");

module.exports = {
  name: "messageDelete",
  once: false,
  async execute(message) {
    const logsChannel = await message.guild.channels.fetch(constantsfile.logsChannel);
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
