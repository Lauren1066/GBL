const { PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rules")
    .setDescription("Re-send the rules embed!")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("[GBL] Discord Rules")
      .setDescription(
        `Since this is a Discord community server, you will have to follow Discord's TOS and code of conduct. Failure to follow these simple rules will result in a ban.


1. No drama, bullying, hate speech, racism, etc. Be respectful to everyone.
2. Keep all discussions in the specific text channels.
3. No NSFW/pornographic/explicit content allowed. Also no earrape or epileptic emotes/gifs.
4. Please do not share exploits or hacks for any game.
5. Don't impersonate others.
6. Don't spam or mass tag people.
7. No advertising or self promotion.
8. Do not share anyone's personal information or DDoS/leak IPs.
9. If you ban evade, you'll be banned instantly.
10. Posting executables or AHK scripts are also not allowed as well as selfbots.


Discord TOS: https://discordapp.com/terms

Community Guidelines: https://discordapp.com/guidelines`
      )
      .setColor("#ad1414");
    const channel = await interaction.guild.channels.fetch("988882412777906266");
    channel.send({ embeds: [embed] });
  },
};
