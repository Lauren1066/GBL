const { EmbedBuilder } = require("discord.js");
const constants = require("../../Storage/constants.js");
const constantsfile = require("../../Storage/constants.js");

module.exports = {
  name: "guildMemberUpdate",
  once: false,
  async execute(oldMember, newMember) {
    if (newMember.guild.id == constantsfile.mainServerID) {
      var logsChannel = await oldMember.guild.channels.fetch(constantsfile.mainLogsChannel);
    } else if (newMember.guild.id == constantsfile.ambulanceServerID) {
      var logsChannel = await oldMember.guild.channels.fetch(constantsfile.ambulanceLogsChannel);
    } else if (newMember.guild.id == constantsfile.fireServerID) {
      var logsChannel = await oldMember.guild.channels.fetch(constantsfile.fireLogsChannel);
    } else if (newMember.guild.id == constantsfile.policeServerID) {
      var logsChannel = await oldMember.guild.channels.fetch(constantsfile.policeLogsChannel);
    }

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
