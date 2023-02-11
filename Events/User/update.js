const { EmbedBuilder } = require("discord.js");
const constantsfile = require("../../Storage/constants.js");
const { client } = require("../../index.js");

module.exports = {
  name: "userUpdate",
  once: false,
  async execute(oldUser, newUser) {
    const guild = await client.guilds.fetch("988867117195599902");
    const logsChannel = await guild.channels.fetch(constantsfile.logsChannel);

    if (oldUser.username != newUser.username) {
      const embed = new EmbedBuilder()
        .setTitle("Username Edited")
        .addFields({ name: "Original Name:", value: oldUser.username }, { name: "New Name:", value: newUser.username })
        .setColor("#2980B9  ");
      logsChannel.send({ embeds: [embed] });
    }
  },
};
