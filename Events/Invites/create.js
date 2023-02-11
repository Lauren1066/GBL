const { EmbedBuilder } = require("discord.js");
const constantsfile = require("../../Storage/constants.js");

module.exports = {
  name: "inviteCreate",
  once: false,
  async execute(invite) {
    if (invite.guild.id == constantsfile.mainServerID) {
      var logsChannel = await invite.guild.channels.fetch(constantsfile.mainLogsChannel);
    } else if (invite.guild.id == constantsfile.ambulanceServerID) {
      var logsChannel = await invite.guild.channels.fetch(constantsfile.ambulanceLogsChannel);
    } else if (invite.guild.id == constantsfile.fireServerID) {
      var logsChannel = await invite.guild.channels.fetch(constantsfile.fireLogsChannel);
    } else if (invite.guild.id == constantsfile.policeServerID) {
      var logsChannel = await invite.guild.channels.fetch(constantsfile.policeLogsChannel);
    }

    const member = await invite.guild.members.fetch(invite.inviterId);
    const embed = new EmbedBuilder()
      .setTitle("Invite Created")
      .addFields({ name: "Code:", value: `https://discord.gg/${invite.code}` }, { name: "Inviter:", value: member.user.tag })
      .setColor("#52BE80  ");
    logsChannel.send({ embeds: [embed] });
  },
};
