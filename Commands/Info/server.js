const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const constantsFile = require("../../Storage/constants.js");

module.exports = {
  data: new SlashCommandBuilder().setName("server").setDescription("See information about the server!"),
  async execute(interaction) {
    const guild = await interaction.client.guilds.fetch(constantsFile.mainServerID);

    const owner = await guild.members.fetch(guild.ownerId);

    const embed = new EmbedBuilder()
      .setTitle(guild.name)
      .setThumbnail(guild.iconURL({ format: "png" }))
      .addFields(
        {
          name: "Created At:",
          value: guild.createdAt.toLocaleDateString("en-us", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
        },
        {
          name: "Member Count:",
          value: guild.memberCount.toString(),
        },
        {
          name: "Boost Level:",
          value: guild.premiumTier.toString(),
        },
        {
          name: "Owner:",
          value: owner.user.username,
        }
      );
    interaction.reply({ embeds: [embed] });
  },
};
