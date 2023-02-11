const { EmbedBuilder } = require("discord.js");
const constantsfile = require("../../Storage/constants.js");

module.exports = {
  name: "guildMemberUpdate",
  once: false,
  async execute(oldMember, newMember) {
    const logsChannel = await oldMember.guild.channels.fetch(constantsfile.logsChannel);
    console.log(oldMember);
    console.log(newMember);

    if (oldMember.nickname != newMember.nickname) {
      if (oldMember.nickname == undefined) {
        const embed = new EmbedBuilder()
          .setTitle("Nickname Edited")
          .addFields({ name: "Original Nickname:", value: oldMember.user.username }, { name: "New Nickname:", value: newMember.nickname })
          .setColor("#85C1E9");
        logsChannel.send({ embeds: [embed] });
      } else if (newMember.nickname == undefined) {
        const embed = new EmbedBuilder()
          .setTitle("Nickname Edited")
          .addFields({ name: "Original Nickname:", value: oldMember.nickname }, { name: "New Nickname:", value: newMember.user.username })
          .setColor("#85C1E9");
        logsChannel.send({ embeds: [embed] });
      } else {
        const embed = new EmbedBuilder()
          .setTitle("Nickname Edited")
          .addFields({ name: "Original Nickname:", value: oldMember.nickname }, { name: "New Nickname:", value: newMember.nickname })
          .setColor("#85C1E9");
        logsChannel.send({ embeds: [embed] });
      }
    }
  },
};
