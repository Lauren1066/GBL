const { EmbedBuilder } = require("discord.js");
const constantsfile = require("../../Storage/constants.js");

module.exports = {
  name: "inviteCreate",
  once: false,
  async execute(invite) {
    const logsChannel = await invite.guild.channels.fetch(constantsfile.logsChannel);
    const member = await invite.guild.members.fetch(invite.inviterId);
    const embed = new EmbedBuilder()
      .setTitle("Invite Created")
      .addFields({ name: "Code:", value: `https://discord.gg/${invite.code}` }, { name: "Inviter:", value: member.user.tag })
      .setColor("#52BE80  ");
    logsChannel.send({ embeds: [embed] });
  },
};
