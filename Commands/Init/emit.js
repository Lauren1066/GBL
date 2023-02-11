const { PermissionFlagsBits, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("emit")
    .setDescription("Emit the welcome event!")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    interaction.client.emit("guildMemberAdd", interaction.member);
  },
};
