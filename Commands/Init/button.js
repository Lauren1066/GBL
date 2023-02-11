const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("button").setDescription("Send a button!").setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId("verify").setLabel("Click me to verify!").setStyle(ButtonStyle.Primary)
    );

    await interaction.reply({ components: [row] });
  },
};
