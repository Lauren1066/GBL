const { EmbedBuilder } = require("discord.js");
const constantsfile = require("../../Storage/constants.js");
const { client } = require("../../index.js");

module.exports = {
  name: "userUpdate",
  once: false,
  async execute(oldUser, newUser) {
    const mainLogsChannel = await oldUser.guild.channels.fetch(constantsfile.mainLogsChannel);
    const ambulanceLogsChannel = await oldUser.guild.channels.fetch(constantsfile.ambulanceLogsChannel);
    const fireLogsChannel = await oldUser.guild.channels.fetch(constantsfile.fireLogsChannel);
    const policeLogsChannel = await oldUser.guild.channels.fetch(constantsfile.policeLogsChannel);

    if (oldUser.username != newUser.username) {
      const embed = new EmbedBuilder()
        .setTitle("Username Edited")
        .addFields({ name: "Original Name:", value: oldUser.username }, { name: "New Name:", value: newUser.username })
        .setColor("#2980B9  ");
      mainLogsChannel.send({ embeds: [embed] });
      ambulanceLogsChannel.send({ embeds: [embed] });
      fireLogsChannel.send({ embeds: [embed] });
      policeLogsChannel.send({ embeds: [embed] });
    }
  },
};
