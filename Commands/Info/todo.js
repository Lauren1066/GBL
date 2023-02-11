const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const constantsFile = require("../../Storage/constants.js");

module.exports = {
  data: new SlashCommandBuilder().setName("todo").setDescription("See information about the server!"),
  async execute(interaction) {
    const guild = await interaction.client.guilds.fetch(constantsFile.mainServerID);

    const owner = await guild.members.fetch(guild.ownerId);

    const embed = new EmbedBuilder().setTitle(guild.name).setThumbnail(guild.iconURL({ format: "png" })).setDescription(`
**ALL SERVERS:**
Logging of invites (Who invited + the link)
Message logs (Edited + Deleted)
Member logs (Joins + leaves + edited & deleted messages)
Role updates (Give Roles + Remove Roles + Create Role + Deleted Role)
      `);
    interaction.reply({ embeds: [embed] });
  },
};
